-- Preserve the scoring input used by an answer even after a checklist is revised.
alter table audit_answers
  add column if not exists weight_snapshot numeric(8, 4);

update audit_answers aa
set weight_snapshot = q.weight,
    updated_at = now()
from checklist_questions q
where q.id = aa.question_id
  and aa.weight_snapshot is null;
