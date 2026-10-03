const test = require("node:test");
const assert = require("node:assert/strict");
const { hashPassword, verifyPassword, validPassword, temporaryCode, authenticated, isMasterUser, canManageMaster } = require("../lib/access-api");
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
test("authenticated accepts the protected cookie or bearer token and rejects prototype identity headers", async () => {
  const user = { id: "user-1", role: "admin", active: true };
  const pool = { query: async (_sql, values) => ({ rows: values?.length ? [user] : [] }) };
  const token = "a".repeat(64);
  assert.equal((await authenticated(pool, { headers: { cookie: `idvida_access=${token}` } })).id, user.id);
  assert.equal((await authenticated(pool, { headers: { authorization: `Bearer ${token}` } })).id, user.id);
  assert.equal(await authenticated(pool, { headers: { "x-user-id": user.id } }), null);
});

test("master access is explicit and hidden targets cannot be managed by ordinary admins", () => {
  const master = { id: "master", role: "admin", is_master: true };
  const admin = { id: "admin", role: "admin", is_master: false };
  const targetMaster = { id: "other-master", is_master: true };
  const regularUser = { id: "user", is_master: false };
  assert.equal(isMasterUser(master), true);
  assert.equal(isMasterUser(admin), false);
  assert.equal(canManageMaster(master, targetMaster), true);
  assert.equal(canManageMaster(admin, targetMaster), false);
  assert.equal(canManageMaster(admin, regularUser), true);
});

test("legacy passwordless login route is disabled", () => {
  const serverSource = require("node:fs").readFileSync(require("node:path").join(__dirname, "..", "server.js"), "utf8");
  assert.match(serverSource, /Esta rota de login foi desativada/);
  assert.doesNotMatch(serverSource, /select id, unit_id, full_name, email, role, platform_scope, active[\s\S]{0,500}lower\(email\)/);
});
