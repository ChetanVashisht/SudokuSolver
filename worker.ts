import { parentPort } from "worker_threads";
import { solver, Sudoku } from "./solver.js";

parentPort!.on("message", (sudoku: Sudoku) => {
  const solution = solver(sudoku) as Sudoku;
  parentPort!.postMessage(solution);
});
