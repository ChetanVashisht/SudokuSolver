import { Sudoku } from "./solver";

const myHeaders = new Headers();
const ninjaKey = process.env.API_NINJA_KEY;
myHeaders.append("X-Api-Key", ninjaKey!);

const requestOptions = { method: "GET", headers: myHeaders };

export type Difficulty = 'EASY' | "MEDIUM" | "HARD";
export const NoSudoku = new Error("No Sudoku from the api");
const fallbackSudoku = "517600034289004000346205090602000010038006047000000000090000078703400560000000000" as Sudoku;

const toSudoku = function (arr: Array<Array<number|null>>) {
  return arr
    .flatMap(row => row)
    .map(cell => cell === null? 0: cell)
    .map(cell => cell.toString())
    .join("") as Sudoku;
}

export async function getNewSudoku(difficulty: Difficulty): Promise<Sudoku> {
  const resp = await fetch(`https://api.api-ninjas.com/v1/sudokugenerate?difficulty=${difficulty.toLowerCase()}`, requestOptions)
    .then((response) => response.json() as any)
    .catch(_ => NoSudoku);

  return resp === NoSudoku? fallbackSudoku: toSudoku(resp!.puzzle);
}
