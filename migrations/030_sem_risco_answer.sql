-- Allow the health-risk question to be answered explicitly as "Sem risco".
-- This is a positive result: it counts like Conforme, while X remains outside
-- the score because the item was not evaluated.

alter table audit_answers
  drop constraint if exists audit_answers_answer_check;

alter table audit_answers
  add constraint audit_answers_answer_check
  check (answer in ('C', 'NC', 'X', 'SR'));

update checklist_questions
set requirement_text = 'Ausência de risco à saúde do consumidor',
    answer_options = '["NC", "SR", "X"]'::jsonb,
    updated_at = now()
where active = true
  and requirement_text like 'Ausência de risco à saúde do consumidor%';

update audit_answers aa
set score_value = q.weight,
    updated_at = now()
from checklist_questions q
where q.id = aa.question_id
  and aa.answer = 'SR';
