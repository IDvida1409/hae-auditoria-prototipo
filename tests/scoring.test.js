const test = require("node:test");
const assert = require("node:assert/strict");
const { weightedScore } = require("../lib/scoring");

test("audit score follows the approved risk-weighted workbook rule", () => {
  assert.equal(weightedScore([
    { answer: "C", weight: 2 },
    { answer: "NC", weight: 32 }
  ]), 0.59);
  assert.equal(weightedScore([
    { answer: "C", weight: 2 },
    { answer: "NC", weight: 2 }
  ]), 5);
});

test("not evaluated answers do not change the weighted denominator", () => {
  assert.equal(weightedScore([
    { answer: "C", weight: 8 },
    { answer: "X", weight: 64 }
  ]), 10);
  assert.equal(weightedScore([{ answer: "X", weight: 64 }]), null);
});
