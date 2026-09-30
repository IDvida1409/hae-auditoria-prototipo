const test = require("node:test");
const assert = require("node:assert/strict");
const hierarchy = require("../assets/area-hierarchy");

test("cada subárea pertence a uma única área", () => {
  const ids = hierarchy.allSubareaIds();
  assert.equal(new Set(ids).size, ids.length);
});

test("áreas isoladas não são classificadas como subáreas", () => {
  for (const id of ["documentacao", "area-residuos"]) {
    assert.deepEqual(hierarchy.classifyArea(id), { kind: "standalone", group: null });
  }
});

test("DML autônomo foi retirado sem remover os DMLs da Limpeza ASG", () => {
  assert.deepEqual(hierarchy.classifyArea("dml-produto-quimico"), { kind: "unknown", group: null });
  assert.equal(hierarchy.classifyArea("dml-1-andar").group.id, "limpeza-asg");
  assert.equal(hierarchy.classifyArea("dml-2-andar").group.id, "limpeza-asg");
});

test("Catering pertence somente a Conforto Médico", () => {
  const classification = hierarchy.classifyArea("cozinha-catering");
  assert.equal(classification.kind, "subarea");
  assert.equal(classification.group.id, "conforto-medico");
});

test("identificadores desconhecidos não caem em uma área padrão", () => {
  assert.deepEqual(hierarchy.classifyArea("area-inexistente"), { kind: "unknown", group: null });
});
