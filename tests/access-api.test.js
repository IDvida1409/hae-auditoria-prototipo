const test = require("node:test");
const assert = require("node:assert/strict");
const { hashPassword, verifyPassword, validPassword, temporaryCode } = require("../lib/access-api");
test("passwords are salted, hashed and verified without accepting missing credentials", async () => {
  const first = await hashPassword("A strong test password");
  const second = await hashPassword("A strong test password");
  assert.notEqual(first, second);
  assert.equal(await verifyPassword("A strong test password", first), true);
  assert.equal(await verifyPassword("wrong password", first), false);
  assert.equal(await verifyPassword("anything", null), false);
  assert.equal(await verifyPassword(undefined, first), false);
  assert.equal(await verifyPassword("anything", "scrypt:999999999:8:1:salt:key"), false);
});
test("password boundaries accept eight characters and reject shorter or unbounded values", () => {
  assert.throws(() => validPassword("short"));
  assert.throws(() => validPassword("a".repeat(129)));
  assert.throws(() => validPassword(null));
  validPassword("12345678");
});
test("temporary first-access codes are unambiguous and not repeated", () => {
  const first = temporaryCode();
  const second = temporaryCode();
  assert.match(first, /^[A-HJ-NP-Z2-9]{10}$/);
  assert.notEqual(first, second);
});
