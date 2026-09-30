const test = require("node:test");
const assert = require("node:assert/strict");
const session = require("../lib/audit-session");

test("start refuses a duplicate audit in the same area and cycle", async () => {
  const calls = [];
  const client = { async query(sql) {
    calls.push(sql);
    if (sql.startsWith("insert into mobile_devices")) return { rows: [{ id: "device-2", user_id: "editor-2" }] };
    if (sql.startsWith("select a.*,c.id as checklist_id")) return { rows: [{ id: "area-1", checklist_id: "checklist-1" }] };
    if (sql.startsWith("insert into audit_cycles")) return { rows: [{ id: "cycle-1" }] };
    if (sql.startsWith("select a.*,u.full_name as auditor_name")) return { rows: [{
      id: "audit-1", area_id: "area-1", cycle_id: "cycle-1", status: "in_progress",
      auditor_user_id: "editor-1", active_device_id: "device-1", auditor_name: "Editor 1"
    }] };
    return { rows: [] };
  }, release() {} };
  await assert.rejects(session.start({ connect: async () => client }, {
    unitId: "unit-1", areaId: "area-1", user: { id: "editor-2" }, deviceUid: "device-uid-2", localAuditId: "local-2"
  }), (error) => {
    assert.equal(error.status, 409);
    assert.equal(error.code, "AUDIT_EXISTS");
    assert.match(error.message, /Editor 1/);
    return true;
  });
  assert.ok(calls.some((sql) => sql.includes("pg_advisory_xact_lock")));
  assert.ok(calls.includes("rollback"));
  assert.ok(!calls.some((sql) => sql.startsWith("insert into audits")));
});

test("transfer preserves completed server answers and switches the active device", async () => {
  const calls = [];
  const previous = { id: "audit-1", area_id: "area-1", cycle_id: "cycle-1", month_start: session.monthStart(), status: "in_progress",
    auditor_user_id: "editor-1", active_device_id: "device-1", device_id: "device-1" };
  const client = { async query(sql) {
    calls.push(sql);
    if (sql.startsWith("insert into mobile_devices")) return { rows: [{ id: "device-2", user_id: "editor-2" }] };
    if (sql.startsWith("select a.*,c.month_start from audits")) return { rows: [previous] };
    if (sql.startsWith("select * from audits where id=$1 for update")) return { rows: [previous] };
    if (sql.startsWith("select count(*)::int as count")) return { rows: [{ count: 3 }] };
    if (sql.startsWith("update audits set auditor_user_id")) return { rows: [{ ...previous, auditor_user_id: "editor-2", active_device_id: "device-2" }] };
    if (sql.startsWith("select full_name from app_users")) return { rows: [{ full_name: "Editor 2" }] };
    return { rows: [] };
  }, release() {} };
  const result = await session.transfer({ connect: async () => client }, {
    auditId: "audit-1", unitId: "unit-1", user: { id: "editor-2" }, deviceUid: "device-uid-2",
    allowedAreaIds: [], allAreas: true
  });
  assert.equal(result.transferred, true);
  assert.equal(result.retainedAnswerCount, 3);
  assert.equal(result.audit.auditor_user_id, "editor-2");
  assert.equal(result.audit.active_device_id, "device-2");
  assert.ok(calls.some((sql) => sql.includes("insert into audit_transfer_answer_locks")));
  assert.ok(calls.some((sql) => sql.includes("insert into audit_transfer_revoked_devices")));
  assert.ok(calls.some((sql) => sql.startsWith("update audits set auditor_user_id")));
  assert.ok(calls.includes("commit"));
});

test("same auditor can continue on another device without changing ownership", async () => {
  const calls = [];
  const previous = { id: "audit-1", area_id: "area-1", cycle_id: "cycle-1", month_start: session.monthStart(), status: "in_progress",
    auditor_user_id: "editor-1", active_device_id: "device-1", device_id: "device-1" };
  const client = { async query(sql) {
    calls.push(sql);
    if (sql.startsWith("insert into mobile_devices")) return { rows: [{ id: "device-2", user_id: "editor-1" }] };
    if (sql.startsWith("select a.*,c.month_start from audits")) return { rows: [previous] };
    if (sql.startsWith("select * from audits where id=$1 for update")) return { rows: [previous] };
    if (sql.startsWith("select count(*)::int as count")) return { rows: [{ count: 2 }] };
    if (sql.startsWith("update audits set auditor_user_id")) return { rows: [{ ...previous, active_device_id: "device-2" }] };
    if (sql.startsWith("select full_name from app_users")) return { rows: [{ full_name: "Editor 1" }] };
    return { rows: [] };
  }, release() {} };
  const result = await session.transfer({ connect: async () => client }, {
    auditId: "audit-1", unitId: "unit-1", user: { id: "editor-1" }, deviceUid: "device-uid-2",
    allowedAreaIds: [], allAreas: true
  });
  assert.equal(result.transferred, false);
  assert.equal(result.continuedOnAnotherDevice, true);
  assert.equal(result.audit.auditor_user_id, "editor-1");
  assert.equal(result.audit.active_device_id, "device-2");
  assert.ok(calls.some((sql) => sql.includes("insert into audit_transfer_revoked_devices")));
  assert.ok(calls.includes("commit"));
});

test("same auditor keeps review answers editable when changing devices", async () => {
  const calls = [];
  const previous = { id: "audit-1", area_id: "area-1", cycle_id: "cycle-1", month_start: session.monthStart(), status: "draft",
    auditor_user_id: "editor-1", active_device_id: "device-1", device_id: "device-1" };
  const client = { async query(sql) {
    calls.push(sql);
    if (sql.startsWith("insert into mobile_devices")) return { rows: [{ id: "device-2", user_id: "editor-1" }] };
    if (sql.startsWith("select a.*,c.month_start from audits")) return { rows: [previous] };
    if (sql.startsWith("select * from audits where id=$1 for update")) return { rows: [previous] };
    if (sql.startsWith("select count(*)::int as count")) return { rows: [{ count: 0 }] };
    if (sql.startsWith("update audits set auditor_user_id")) return { rows: [{ ...previous, active_device_id: "device-2" }] };
    if (sql.startsWith("select full_name from app_users")) return { rows: [{ full_name: "Editor 1" }] };
    return { rows: [] };
  }, release() {} };
  const result = await session.transfer({ connect: async () => client }, {
    auditId: "audit-1", unitId: "unit-1", user: { id: "editor-1" }, deviceUid: "device-uid-2",
    allowedAreaIds: [], allAreas: true
  });
  assert.equal(result.audit.status, "draft");
  assert.ok(!calls.some((sql) => sql.includes("insert into audit_transfer_answer_locks")));
  assert.ok(calls.some((sql) => sql.includes("insert into audit_transfer_revoked_devices")));
});
