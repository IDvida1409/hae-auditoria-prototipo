create unique index if not exists action_plans_origin_answer_unique_idx
  on action_plans (origin_answer_id)
  where origin_answer_id is not null;

alter table action_plan_feedback
  add column if not exists action_plan_document_item_id uuid references action_plan_document_items(id) on delete cascade,
  add column if not exists requested_due_at timestamptz,
  add column if not exists deadline_status text,
  add column if not exists deadline_reviewed_by_user_id uuid references app_users(id) on delete set null,
  add column if not exists deadline_reviewed_at timestamptz,
  add column if not exists deadline_review_note text;

do $$
begin
  alter table action_plan_feedback drop constraint if exists action_plan_feedback_deadline_status_check;
  alter table action_plan_feedback add constraint action_plan_feedback_deadline_status_check check (
    deadline_status is null or deadline_status in ('requested', 'approved', 'rejected')
  );
end $$;

alter table action_plan_review_events
  add column if not exists action_plan_document_item_id uuid references action_plan_document_items(id) on delete set null;

create index if not exists action_plan_feedback_item_idx
  on action_plan_feedback (action_plan_document_item_id, created_at desc)
  where action_plan_document_item_id is not null;

