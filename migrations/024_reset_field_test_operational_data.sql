-- Prepare the production tenant for the nutrition field test.
-- Keep users, access rules, areas, checklists, report records and stored PDFs.
-- Remove only data produced by an audit run or its action-plan workflow.

update units
set operational_reset_at=clock_timestamp(), updated_at=now();

truncate table
  action_plan_documents,
  action_plans,
  audit_cycles,
  notifications,
  sync_queue,
  activity_logs,
  report_generation_jobs,
  file_upload_intents,
  file_access_events
restart identity cascade;

delete from file_links
where entity_type in ('audit', 'audit_answer', 'action_plan', 'action_plan_document', 'action_plan_document_item', 'action_plan_feedback');

delete from app_state;
