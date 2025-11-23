type FixedString<N extends number> = { 0: string; length: N } & string;
type FixedArray<N extends number, T> = { 0: T; length: N } & T[];

export type Sudoku = FixedString<81>;
export type Row = FixedArray<9, string>;
export type Column = FixedArray<9, string>;
export type Box = FixedArray<9, string>;

const invalidError = new Error("invalid index");

function validateBounds(index: number) {
  if (index > 80 || index < 0) {
    throw invalidError;
  }
}

export const replace = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const rowNo = (sudoku: Sudoku, index: number): number => {
  validateBounds(index);
  return Math.floor(index / 9);
};

export const colNo = (sudoku: Sudoku, index: number): number => {
  validateBounds(index);
  return index % 9;
};

export const row = (sudoku: Sudoku, index: number): Row => {
  const rn = rowNo(sudoku, index);
  return Array.from(sudoku.slice(rn * 9, rn * 9 + 9)) as Row;
};

export const col = (sudoku: Sudoku, index: number): Column => {
  const cn = colNo(sudoku, index);
  const starter = [...Array(9).keys()];
  const column = starter.map(s => s * 9 + cn);
  return column.map(c => sudoku.at(c)) as Column;
};

export const block = (sudoku: Sudoku, index: number): Column => {
  const getStarter = (no: number) => {
    const s = Math.floor(no / 3) * 3;
    return [s, s + 1, s + 2];
  };
  const rn = rowNo(sudoku, index);
  const starterRow = getStarter(rn);

  const cn = colNo(sudoku, index);
  const starterCol = getStarter(cn);

  const cells = starterRow.flatMap(sr => starterCol.map(sc => sr * 9 + sc));
  return cells.map(c => sudoku.at(c)) as Box;
};

export const generateGuessableOptions = (sudoku: Sudoku, index: number): Array<string> => {
  const cell = sudoku.at(index);
  if (cell != "0") {
    throw invalidError;
  }

  const starter = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const inSudoku = new Set([...row(sudoku, index), ...col(sudoku, index), ...block(sudoku, index)]);

  return [...starter].filter(val => !inSudoku.has(val));
};

export const generateSolutions = (sudoku: Sudoku, index: number) => {
  const options: string[] = generateGuessableOptions(sudoku, index);
  return options.map(option => replace(sudoku, index, option));
};

export const isValidSudoku = (sudoku: Sudoku, index: number) => {
  return generateGuessableOptions(sudoku, index).length > 0;
};

export const nextIteration = (solutions: Sudoku[], index: number) => {
  return solutions
    .filter(solution => isValidSudoku(solution, index))
    .flatMap(solution => generateSolutions(solution, index)) as Sudoku[];
};

export const iterator = (problem: Sudoku, solutions: Sudoku[], index: number): Sudoku[] => {
  if (index === problem.length) {
    return solutions;
  } else if (problem.at(index) != "0") {
    return iterator(problem, solutions, index + 1);
  } else {
    const newSolutions = nextIteration(solutions, index);
    // console.log(`Iteration ${index}, solution length: ${newSolutions.length}`);
    return iterator(problem, newSolutions, index + 1);
  }
};

export const solver = (problem: Sudoku) => {
  const solutions = iterator(problem, [problem], 0);
  return solutions.at(0);
};
