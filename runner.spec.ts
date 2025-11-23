import { expect, test, describe } from "@jest/globals";
import type { Sudoku } from "./solver";
import { block, col, colNo, generateGuessableOptions, generateSolutions, isValidSudoku, row, rowNo } from "./solver";

const problem = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;
/**
 * 8, 0, 0, 0, 0, 0, 0, 0, 0,
 * 0, 0, 3, 6, 0, 0, 0, 0, 0,
 * 0, 7, 0, 0, 9, 0, 2, 0, 0,
 * 0, 5, 0, 0, 0, 7, 0, 0, 0,
 * 0, 0, 0, 0, 4, 5, 7, 0, 0,
 * 0, 0, 0, 1, 0, 0, 0, 3, 0,
 * 0, 0, 1, 0, 0, 0, 0, 6, 8,
 * 0, 0, 8, 5, 0, 0, 0, 1, 0,
 * 0, 9, 0, 0, 0, 0, 4, 0, 0
 */

describe("testing getRowNo", () => {
  test("it throws for invalid indices", () => {
    expect(() => rowNo(problem, -1)).toThrow("invalid index");
    expect(() => rowNo(problem, 100)).toThrow("invalid index");
  });

  test("it works for valid sudokus", () => {
    expect(rowNo(problem, 0)).toEqual(0);
    expect(rowNo(problem, 8)).toEqual(0);
    expect(rowNo(problem, 9)).toEqual(1);
    expect(rowNo(problem, 17)).toEqual(1);
    expect(rowNo(problem, 73)).toEqual(8);
    expect(rowNo(problem, 80)).toEqual(8);
  });
});

describe("testing colNo", () => {
  test("it throws for invalid indices", () => {
    expect(() => colNo(problem, -1)).toThrow("invalid index");
    expect(() => colNo(problem, 100)).toThrow("invalid index");
  });

  test("it works for valid indices", () => {
    expect(colNo(problem, 11)).toBe(2);
    expect(colNo(problem, 80)).toBe(8);
  });
});

describe("testing row functionalities", () => {
  test("it throws for invalid indices", () => {
    expect(() => row(problem, -1)).toThrow("invalid index");
    expect(() => row(problem, 100)).toThrow("invalid index");
  });

  test("it works for valid sudokus", () => {
    expect(row(problem, 0)).toEqual(["8", "0", "0", "0", "0", "0", "0", "0", "0"]);
    expect(row(problem, 8)).toEqual(["8", "0", "0", "0", "0", "0", "0", "0", "0"]);
    expect(row(problem, 9)).toEqual(["0", "0", "3", "6", "0", "0", "0", "0", "0"]);
    expect(row(problem, 17)).toEqual(["0", "0", "3", "6", "0", "0", "0", "0", "0"]);
    expect(row(problem, 73)).toEqual(["0", "9", "0", "0", "0", "0", "4", "0", "0"]);
    expect(row(problem, 80)).toEqual(["0", "9", "0", "0", "0", "0", "4", "0", "0"]);
  });
});

describe("testing column functionalities", () => {
  test("it throws for invalid indices", () => {
    expect(() => col(problem, -1)).toThrow("invalid index");
    expect(() => col(problem, 100)).toThrow("invalid index");
    expect(() => col(problem, 81)).toThrow("invalid index");
  });

  test("it works for the right sudokus", () => {
    expect(col(problem, 10)).toEqual(["0", "0", "7", "5", "0", "0", "0", "0", "9"]);
    expect(col(problem, 80)).toEqual(["0", "0", "0", "0", "0", "0", "8", "0", "0"]);
  });
});

describe("tesing block functionalities", () => {
  test("cries for invalid entries", () => {
    expect(() => block(problem, -1)).toThrow("invalid index");
    expect(() => block(problem, 100)).toThrow("invalid index");
    expect(() => block(problem, 81)).toThrow("invalid index");
  });

  test("works for valid indices", () => {
    expect(block(problem, 10)).toEqual(["8", "0", "0", "0", "0", "3", "0", "7", "0"]);
    expect(block(problem, 67)).toEqual(["0", "0", "0", "5", "0", "0", "0", "0", "0"]);
  });
});

describe("guessable options", () => {
  expect(() => generateGuessableOptions(problem, 0)).toThrow("invalid index");
  expect(generateGuessableOptions(problem, 1)).toEqual(["1", "2", "4", "6"]);
});

describe("generate solutions", () => {
  const problem = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;
  expect(generateSolutions(problem, 10)).toEqual([
    "800000000013600000070090200050007000000045700000100030001000068008500010090000400",
    "800000000023600000070090200050007000000045700000100030001000068008500010090000400",
    "800000000043600000070090200050007000000045700000100030001000068008500010090000400",
  ]);
});

describe("isValidSudoku", () => {
  // const sudoku = problem.
  // expect(isValidSudoku())
});
