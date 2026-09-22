-- The approved source workbook scores each applicable answer by its risk weight.
-- C earns the question weight, NC earns zero and X is excluded from the denominator.
update audit_answers aa
set score_value = case
  when aa.answer = 'C' then q.weight
  when aa.answer = 'NC' then 0
  else null
end,
updated_at = now()
from checklist_questions q
where q.id = aa.question_id;

update audits a
set final_score = score.value,
    updated_at = now()
from (
  select aa.audit_id,
         round(
           10.0 * sum(case when aa.answer='C' then q.weight else 0 end)
           / nullif(sum(case when aa.answer in ('C','NC') then q.weight else 0 end), 0),
           2
         ) as value
  from audit_answers aa
  join checklist_questions q on q.id=aa.question_id
  group by aa.audit_id
) score
where a.id=score.audit_id
  and a.status='finished';
