import { Screen } from "@unblessed/node";
import { render, getScreen } from "./render.js";
import { replace, Sudoku } from "./solver.js";

import { Worker } from "worker_threads";
import { updateState, State, getIndex } from "./input.js";
import { getNewSudoku } from "./api.js";

const cleanup = (worker: Worker) => {
  worker.removeAllListeners();
  worker.terminate();
};

function solveTheSudoku(problem: Sudoku): Promise<{ solution: Sudoku }> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");
    worker.postMessage(problem);
    worker.on("message", ({ solution, done, frontier }: { solution: Sudoku; done: Boolean, frontier: object }) => {
      if (done) {
        cleanup(worker);
        return resolve({ solution });
      } else {
        return render(problem, solution as Sudoku, frontier);
      } 
    });
    worker.on("error", err => reject(err));
    worker.on("exit", (code: number) => {
      if (code !== 0) reject({ error: new Error(`Worker stopped with exit code ${code}`), worker });
    });
  });
}

function exitApp(screen: Screen) {
  screen!.destroy();
  process.exit(0);
}

function handleOtherInputs(e: any) {
  state = updateState(state, e);
  const index = getIndex(state);
  if (index > -1 && "input" in state) {
    solution = replace(solution, index, state.input) as Sudoku;
    render(problem2, solution);
  }
}

// const problem2: Sudoku = "517600034289004000346205090602000010038006047000000000090000078703400560000000000" as Sudoku;
let problem2: Sudoku = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;

let state: State = {};
let solution: Sudoku = problem2;
const screen: Screen = getScreen();
render(problem2, solution);

screen.on("keypress", async (e: any) => {
  switch (e) {
    case "o":
      solveTheSudoku(problem2)
        .then(({ solution }) => {
          render(problem2, solution as Sudoku);
        })
        .catch(({ err }: { err: Error}) => {
          console.error("Failed to solve:", err);
        });
      break;
    case "q":
      exitApp(screen);
      break;
    case "n":
      problem2 = await getNewSudoku("HARD");
      render(problem2, problem2);
      break;
    default:
      handleOtherInputs(e);
  }
});
