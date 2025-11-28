import { Screen } from "@unblessed/node";
import { render, getScreen } from "./render.js";
import { replace, solver, Sudoku } from "./solver.js";

import { Worker } from "worker_threads";
import { updateState, State, getIndex } from "./input.js";

const cleanup = (worker: Worker) => {
  worker.removeAllListeners();
  worker.terminate();
};

function solveTheSudoku(problem: Sudoku): Promise<{ solution: Sudoku; worker: Worker }> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");
    worker.postMessage(problem);
    worker.on("message", ({ solution, done }: { solution: Sudoku; done: Boolean }) => {
      return done ? resolve({ solution, worker }) : render(problem, solution as Sudoku);
    });
    worker.on("error", reject);
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
const problem2: Sudoku = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;

let state: State = {};
let solution: Sudoku = problem2;
const screen: Screen = getScreen();
render(problem2, solution);

screen.on("keypress", (e: any) => {
  switch (e) {
    case "o":
      solveTheSudoku(problem2)
        .then(({ solution, worker }) => {
          render(problem2, solution as Sudoku);
          cleanup(worker);
        })
        .catch(({ err, worker }: { err: Error; worker: Worker }) => {
          console.error("Failed to solve:", err);
          cleanup(worker);
        });
      break;
    case "q":
      exitApp(screen);
      break;
    default:
      handleOtherInputs(e);
  }
});
