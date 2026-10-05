alter table action_plan_feedback
  add column if not exists cause_group text,
  add column if not exists cause_code text;

do $$
begin
  alter table action_plan_feedback drop constraint if exists action_plan_feedback_cause_group_check;
  alter table action_plan_feedback add constraint action_plan_feedback_cause_group_check check (
    cause_group is null or cause_group in ('process_internal', 'external_dependency', 'shared_responsibility')
  );

  alter table action_plan_feedback drop constraint if exists action_plan_feedback_cause_code_check;
  alter table action_plan_feedback add constraint action_plan_feedback_cause_code_check check (
    cause_code is null or cause_code in (
      'area_did_not_execute',
      'internal_process_delay',
      'quality_not_sent',
      'quality_sent_late',
      'other_area_call',
      'other_area_pending',
      'supplier_failure',
      'call_not_opened',
      'request_delay',
      'shared_execution_failure',
      'other'
    )
  );
end $$;

create index if not exists action_plan_feedback_cause_idx
  on action_plan_feedback (cause_group, cause_code, created_at desc);
