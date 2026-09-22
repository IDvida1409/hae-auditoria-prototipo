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

test("all six workbook weights follow the same approved formula", () => {
  const weights = [2, 4, 8, 16, 32, 64];
  const rows = weights.map((weight, index) => ({ weight, answer: index % 3 === 0 ? "C" : index % 3 === 1 ? "NC" : "X" }));
  const expected = Number((10 * (2 + 16) / (2 + 4 + 16 + 32)).toFixed(2));
  assert.equal(weightedScore(rows), expected);
});

test("one high-risk NC outweighs several low-risk conformities exactly as in Excel", () => {
  assert.equal(weightedScore([
    { weight: 2, answer: "C" },
    { weight: 4, answer: "C" },
    { weight: 8, answer: "C" },
    { weight: 64, answer: "NC" }
  ]), 1.79);
});
