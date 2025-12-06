import { describe, test } from "node:test";
import assert from "node:assert";
import type { Sudoku } from "./solver.js";
import { block, col, colNo, generateGuessableOptions, generateSolutions, replace, row, rowNo } from "./solver.js";

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
    assert.throws(() => rowNo(problem, -1), /invalid index/);
    assert.throws(() => rowNo(problem, 100), /invalid index/);
  });

  test("it works for valid sudokus", () => {
    assert.strictEqual(rowNo(problem, 0), 0);
    assert.strictEqual(rowNo(problem, 8), 0);
    assert.strictEqual(rowNo(problem, 9), 1);
    assert.strictEqual(rowNo(problem, 17), 1);
    assert.strictEqual(rowNo(problem, 73), 8);
    assert.strictEqual(rowNo(problem, 80), 8);
  });
});

describe("testing colNo", () => {
  test("it throws for invalid indices", () => {
    assert.throws(() => colNo(problem, -1), /invalid index/);
    assert.throws(() => colNo(problem, 100), /invalid index/);
  });

  test("it works for valid indices", () => {
    assert.strictEqual(colNo(problem, 11), 2);
    assert.strictEqual(colNo(problem, 80), 8);
  });
});

describe("testing row functionalities", () => {
  test("it throws for invalid indices", () => {
    assert.throws(() => row(problem, -1), /invalid index/);
    assert.throws(() => row(problem, 100), /invalid index/);
  });

  test("it works for valid sudokus", () => {
    assert.deepStrictEqual(row(problem, 0), ["8", "0", "0", "0", "0", "0", "0", "0", "0"]);
    assert.deepStrictEqual(row(problem, 8), ["8", "0", "0", "0", "0", "0", "0", "0", "0"]);
    assert.deepStrictEqual(row(problem, 9), ["0", "0", "3", "6", "0", "0", "0", "0", "0"]);
    assert.deepStrictEqual(row(problem, 17), ["0", "0", "3", "6", "0", "0", "0", "0", "0"]);
    assert.deepStrictEqual(row(problem, 73), ["0", "9", "0", "0", "0", "0", "4", "0", "0"]);
    assert.deepStrictEqual(row(problem, 80), ["0", "9", "0", "0", "0", "0", "4", "0", "0"]);
  });
});

describe("testing column functionalities", () => {
  test("it throws for invalid indices", () => {
    assert.throws(() => col(problem, -1), /invalid index/);
    assert.throws(() => col(problem, 100), /invalid index/);
    assert.throws(() => col(problem, 81), /invalid index/);
  });

  test("it works for the right sudokus", () => {
    assert.deepStrictEqual(col(problem, 10), ["0", "0", "7", "5", "0", "0", "0", "0", "9"]);
    assert.deepStrictEqual(col(problem, 80), ["0", "0", "0", "0", "0", "0", "8", "0", "0"]);
  });
});

describe("tesing block functionalities", () => {
  test("cries for invalid entries", () => {
    assert.throws(() => block(problem, -1), /invalid index/);
    assert.throws(() => block(problem, 100), /invalid index/);
    assert.throws(() => block(problem, 81), /invalid index/);
  });

  test("works for valid indices", () => {
    assert.deepStrictEqual(block(problem, 10), ["8", "0", "0", "0", "0", "3", "0", "7", "0"]);
    assert.deepStrictEqual(block(problem, 67), ["0", "0", "0", "5", "0", "0", "0", "0", "0"]);
  });
});

describe("guessable options", () => {
  test("throws for invalid indices", () => {
    assert.throws(() => generateGuessableOptions(problem, 0), /invalid index/);
  });

  test("generates correct options", () => {
    assert.deepStrictEqual(generateGuessableOptions(problem, 1), ["1", "2", "4", "6"]);
  });
});

describe("generate solutions", () => {
  test("generates correct solutions", () => {
    const problem = "800000000003600000070090200050007000000045700000100030001000068008500010090000400" as Sudoku;
    assert.deepStrictEqual(generateSolutions(problem, 10), [
      "800000000013600000070090200050007000000045700000100030001000068008500010090000400",
      "800000000023600000070090200050007000000045700000100030001000068008500010090000400",
      "800000000043600000070090200050007000000045700000100030001000068008500010090000400",
    ]);
  });
});

describe("test replace", () => {
  test("simple cases", () => {
    assert.strictEqual(replace("onetwothree", 0, "3"), "3netwothree");
    assert.strictEqual(replace("onetwothree", 0, "2"), "2netwothree");
    assert.strictEqual(replace("onetwothree", 3, "3"), "one3wothree");
    assert.strictEqual(replace("onetwothree", 10, "3"), "onetwothre3");
    assert.strictEqual(replace("onetwothree", 10, "3"), "onetwothre3");
  });
});
