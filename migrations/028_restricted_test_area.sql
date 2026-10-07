-- Área reservada para testes do usuário master.
-- Usuários comuns nunca recebem essas áreas em suas consultas de operação.
alter table audit_areas
  add column if not exists restricted_to_master boolean not null default false;

create index if not exists audit_areas_visibility_idx
  on audit_areas (unit_id, restricted_to_master, active, display_order);

insert into audit_areas (unit_id, name, slug, area_type, display_order, restricted_to_master)
select u.id, v.name, v.slug, 'hospital_area', v.display_order, true
from units u
cross join (values
  ('Teste 1', 'teste-1', 900),
  ('Teste 2', 'teste-2', 901)
) as v(name, slug, display_order)
where u.code = 'einstein-morumbi'
on conflict (unit_id, slug) do update set
  name = excluded.name,
  area_type = excluded.area_type,
  display_order = excluded.display_order,
  restricted_to_master = true,
  active = true,
  updated_at = now();

-- Cada subárea recebe uma cópia do checklist atual de referência para poder
-- gerar auditorias, notas e relatórios sem compartilhar a configuração da operação.
do $$
declare
  v_unit_id uuid;
  source_checklist record;
  target_area record;
  new_checklist_id uuid;
  source_block record;
  new_block_id uuid;
begin
  select id into v_unit_id from units where code = 'einstein-morumbi' order by created_at limit 1;
  if v_unit_id is null then return; end if;

  select c.* into source_checklist
    from checklists c
    join audit_areas a on a.id = c.area_id
   where c.unit_id = v_unit_id
     and c.is_active = true
     and a.slug = 'cozinha-catering'
   order by c.created_at desc
   limit 1;

  if source_checklist.id is null then return; end if;

  for target_area in
    select id, slug from audit_areas
     where audit_areas.unit_id = v_unit_id and slug in ('teste-1', 'teste-2') and active = true
  loop
    select id into new_checklist_id
      from checklists
     where checklists.unit_id = v_unit_id and area_id = target_area.id and is_active = true
     order by created_at desc limit 1;

    if new_checklist_id is null then
      insert into checklists (unit_id, area_id, name, version_label, legal_base, active_from, is_active, source_key, imported_at)
      values (v_unit_id, target_area.id, 'Checklist de testes - ' || target_area.slug, 'Versão inicial', source_checklist.legal_base, current_date, true, 'restricted-test-copy-' || target_area.slug, now())
      returning id into new_checklist_id;

      for source_block in
        select * from checklist_blocks where checklist_id = source_checklist.id and active = true order by display_order
      loop
        insert into checklist_blocks (checklist_id, title, display_order, weight, active)
        values (new_checklist_id, source_block.title, source_block.display_order, source_block.weight, true)
        returning id into new_block_id;

        insert into checklist_questions
          (block_id, question_number, requirement_text, legal_reference, risk_level, answer_options, required_evidence_on_nc, weight, active)
        select new_block_id, question_number, requirement_text, legal_reference, risk_level, answer_options, required_evidence_on_nc, weight, true
          from checklist_questions
         where block_id = source_block.id and active = true;
      end loop;
    end if;
  end loop;
end $$;
