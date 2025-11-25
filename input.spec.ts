import { describe, test } from "node:test";
import assert from "node:assert";
import { getIndex, updateState } from "./input.js";

describe("handle inputs", () => {
  test("alphabets reset the state", () => {
    assert.deepStrictEqual(updateState({}, "r"), {});
    assert.deepStrictEqual(updateState({}, "0"), {});
    assert.deepStrictEqual(updateState({ input: "5" }, "r"), {});
    assert.deepStrictEqual(updateState({ input: "5" }, "0"), {});
    assert.deepStrictEqual(updateState({ input: "5", big: 5 }, "r"), {});
    assert.deepStrictEqual(updateState({ input: "5", big: 5 }, "0"), {});
  });

  test("Accept Input", () => {
    assert.deepStrictEqual(updateState({}, "1"), { input: "1" });
  });

  test("Accept Big", () => {
    assert.deepStrictEqual(updateState({ input: "1" }, "2"), { input: "1", big: 2 });
  });

  test("Accept Small", () => {
    assert.deepStrictEqual(updateState({ input: "1", big: 2 }, "9"), { input: "1", big: 2, small: 9 });
  });

  test("reset after small", () => {
    assert.deepStrictEqual(updateState({ input: "1", big: 2, small: "9" }, "4"), { input: "4" });
  });
});

describe("handle index conversion", () => {
  test("handle all non terminal states", () => {
    assert.deepStrictEqual(getIndex({}), -1);
    assert.deepStrictEqual(getIndex({ input: "1" }), -1);
    assert.deepStrictEqual(getIndex({ input: "1", big: 3 }), -1);
  });

  test("handle the tough cases", () => {
    assert.deepStrictEqual(getIndex({ input: "1", big: 1, small: 3 }), 2);
    assert.deepStrictEqual(getIndex({ input: "1", big: 2, small: 1 }), 3);
    assert.deepStrictEqual(getIndex({ input: "1", big: 3, small: 4 }), 15);
  });
});
