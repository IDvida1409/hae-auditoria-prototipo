-- Keep the assignment catalog aligned with the area hierarchy shown in the panel.
-- These rows intentionally do not create audit results or checklists; they only
-- make the configured subareas available for responsible-user assignment.
insert into audit_areas (unit_id, name, slug, area_type, display_order)
select u.id, v.name, v.slug, 'hospital_area', v.display_order
from units u
cross join (values
  ('Recebimento', 'recebimento', 130),
  ('Armazenamento', 'armazenamento', 131),
  ('Pré-preparo de Vegetais', 'pre-preparo-vegetais', 132),
  ('Pré-preparo de Carnes', 'pre-preparo-carnes', 133),
  ('Separação', 'separacao', 134),
  ('Cozinha Central de Apoio', 'cozinha-central-apoio', 135),
  ('Distribuição SARP', 'distribuicao-sarp', 136),
  ('Higiene de Louças SARP', 'higiene-loucas-sarp', 137),
  ('Espaço Gourmet', 'espaco-gourmet', 138),
  ('Centro Cirúrgico 6D', 'centro-cirurgico-6d', 139),
  ('Centro Cirúrgico G1', 'centro-cirurgico-g1', 140),
  ('Einstein+', 'einstein-plus', 141),
  ('Copa Presidência', 'copa-presidencia', 142),
  ('MDA Cafeteria', 'mda-cafeteria', 143),
  ('MDA Endoscopia', 'mda-endoscopia', 144),
  ('Higiene de Caixas', 'higiene-caixas', 145),
  ('DML 1º Andar', 'dml-1-andar', 146),
  ('DML 2º Andar', 'dml-2-andar', 147)
) as v(name, slug, display_order) on true
where u.code = 'einstein-morumbi'
on conflict (unit_id, slug) do update set
  name = excluded.name,
  display_order = excluded.display_order,
  active = true,
  updated_at = now();
