import { describe, test } from "node:test";
import assert from "node:assert";
import { getKeys } from "./input.js";

describe("handle inputs", () => {
  test("works for basic cases", () => {
    assert.strictEqual(getKeys("3"), "3");
  });
});
