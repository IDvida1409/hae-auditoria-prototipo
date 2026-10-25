-- Clean the operational test data before the next field test.
-- Keep users, permissions, areas, subareas, checklists, questions, settings
-- and uploaded documentation. Remove audits, answers, plans, reports, report
-- edits, pending jobs, audit photos and generated report files.

create temporary table reset_operational_files (id uuid primary key) on commit drop;

insert into reset_operational_files (id)
select id
from stored_files
where file_type in ('audit_photo', 'action_plan_photo', 'report_pdf')
on conflict do nothing;

insert into reset_operational_files (id)
select file_id
from file_links
where entity_type in (
  'audit',
  'audit_answer',
  'action_plan',
  'action_plan_feedback',
  'action_plan_document',
  'action_plan_document_item',
  'report'
)
on conflict do nothing;

insert into reset_operational_files (id)
select pdf_file_id
from reports
where pdf_file_id is not null
on conflict do nothing;

insert into reset_operational_files (id)
select pdf_file_id
from action_plan_documents
where pdf_file_id is not null
on conflict do nothing;

insert into reset_operational_files (id)
select file_id
from report_artifacts
on conflict do nothing;

insert into reset_operational_files (id)
select stored_file_id
from file_upload_intents
where stored_file_id is not null
  and coalesce(entity_type, '') <> 'certificate'
on conflict do nothing;

insert into reset_operational_files (id)
select evidence_file_id
from action_plan_feedback
where evidence_file_id is not null
on conflict do nothing;

insert into reset_operational_files (id)
select response_file_id
from action_plan_feedback
where response_file_id is not null
on conflict do nothing;

insert into reset_operational_files (id)
select unnest(coalesce(locked_original_evidence_file_ids, '{}'::uuid[]))
from action_plans
on conflict do nothing;

insert into reset_operational_files (id)
select unnest(coalesce(response_file_ids, '{}'::uuid[]))
from action_plan_feedback
on conflict do nothing;

insert into reset_operational_files (id)
select unnest(coalesce(evidence_file_ids, '{}'::uuid[]))
from action_plan_document_items
on conflict do nothing;

delete from file_access_events
where file_id in (select id from reset_operational_files)
   or entity_type in (
     'audit',
     'audit_answer',
     'action_plan',
     'action_plan_feedback',
     'action_plan_document',
     'action_plan_document_item',
     'report'
   );

delete from file_upload_intents
where stored_file_id in (select id from reset_operational_files)
   or coalesce(entity_type, '') <> 'certificate';

delete from file_links
where file_id in (select id from reset_operational_files)
   or entity_type in (
     'audit',
     'audit_answer',
     'action_plan',
     'action_plan_feedback',
     'action_plan_document',
     'action_plan_document_item',
     'report'
   );

truncate table
  report_artifacts,
  report_recipients,
  reports,
  report_generation_jobs,
  report_editable_content,
  action_plan_acknowledgements,
  action_plan_document_items,
  action_plan_review_events,
  action_plan_timeline_events,
  action_plan_impact_evaluations,
  action_plan_feedback,
  action_plan_tokens,
  action_plan_documents,
  action_plans,
  audit_transfer_answer_locks,
  audit_transfer_revoked_devices,
  audit_answers,
  audits,
  audit_cycles,
  file_operation_links,
  notifications,
  sync_queue,
  activity_logs,
  mobile_devices
restart identity cascade;

delete from stored_files
where id in (select id from reset_operational_files);

delete from app_state;

update units
set operational_reset_at = clock_timestamp(),
    updated_at = now();
