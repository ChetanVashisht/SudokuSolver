import { Screen } from "@unblessed/node";
import { render, getScreen } from "./render.js";
import { solver, Sudoku } from "./solver.js";
import { EventEmitter } from "events";

import { Worker } from "worker_threads";

function runWorker(problem: Sudoku) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");
    worker.postMessage(problem);
    worker.on("message", ({ solution, done }) => {
      return done ? resolve(solution) : render(problem, solution as Sudoku);
    });
    worker.on("error", reject);
    worker.on("exit", (code: number) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

// const problem2: Sudoku = "517600034289004000346205090602000010038006047000000000090000078703400560000000000" as Sudoku;
const problem2: Sudoku = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;

// runWorker(problem2).catch(_ => process.exit(0));
render(problem2, problem2);

const screen: Screen = getScreen();
screen.on("keypress", (e: any) => {
  console.log(e);
  const sudoku = problem2.replaceAll("0", "1") as Sudoku;
  render(problem2, sudoku);
});
