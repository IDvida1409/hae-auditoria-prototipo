-- Clear only operational data created for the master-only test areas.
-- Keep users, permissions, areas, subareas, checklists, questions and settings.

create temporary table reset_test_areas on commit drop as
select id, unit_id, slug
from audit_areas
where slug in ('teste-1', 'teste-2')
  and restricted_to_master = true;

create temporary table reset_test_audits (id uuid primary key) on commit drop;
insert into reset_test_audits (id)
select id
from audits
where area_id in (select id from reset_test_areas);

create temporary table reset_test_answers (id uuid primary key) on commit drop;
insert into reset_test_answers (id)
select id
from audit_answers
where audit_id in (select id from reset_test_audits);

create temporary table reset_test_reports (id uuid primary key, pdf_file_id uuid) on commit drop;
insert into reset_test_reports (id, pdf_file_id)
select distinct r.id, r.pdf_file_id
from reports r
where r.area_id in (select id from reset_test_areas)
   or r.audit_id in (select id from reset_test_audits)
   or r.scope_key in (select slug from reset_test_areas);

create temporary table reset_test_plans (id uuid primary key) on commit drop;
insert into reset_test_plans (id)
select distinct ap.id
from action_plans ap
where ap.area_id in (select id from reset_test_areas)
   or ap.origin_audit_id in (select id from reset_test_audits)
   or ap.origin_answer_id in (select id from reset_test_answers)
   or ap.impact_audit_id in (select id from reset_test_audits);

create temporary table reset_test_documents (id uuid primary key) on commit drop;
insert into reset_test_documents (id)
select distinct apd.id
from action_plan_documents apd
where apd.area_id in (select id from reset_test_areas)
   or apd.origin_audit_id in (select id from reset_test_audits)
   or apd.origin_report_id in (select id from reset_test_reports)
   or apd.id in (select action_plan_document_id from action_plans where id in (select id from reset_test_plans));

create temporary table reset_test_feedback (id uuid primary key, evidence_file_id uuid, response_file_id uuid) on commit drop;
insert into reset_test_feedback (id, evidence_file_id, response_file_id)
select id, evidence_file_id, response_file_id
from action_plan_feedback
where action_plan_id in (select id from reset_test_plans);

create temporary table reset_test_files (id uuid primary key) on commit drop;

insert into reset_test_files (id)
select pdf_file_id from reset_test_reports where pdf_file_id is not null
on conflict do nothing;

insert into reset_test_files (id)
select file_id
from report_artifacts
where report_id in (select id from reset_test_reports)
on conflict do nothing;

insert into reset_test_files (id)
select evidence_file_id from reset_test_feedback where evidence_file_id is not null
on conflict do nothing;

insert into reset_test_files (id)
select response_file_id from reset_test_feedback where response_file_id is not null
on conflict do nothing;

insert into reset_test_files (id)
select fl.file_id
from file_links fl
where (fl.entity_type = 'audit' and fl.entity_id in (select id from reset_test_audits))
   or (fl.entity_type = 'audit_answer' and fl.entity_id in (select id from reset_test_answers))
   or (fl.entity_type = 'action_plan' and fl.entity_id in (select id from reset_test_plans))
   or (fl.entity_type = 'action_plan_document' and fl.entity_id in (select id from reset_test_documents))
   or (fl.entity_type = 'action_plan_feedback' and fl.entity_id in (select id from reset_test_feedback))
   or (fl.entity_type = 'report' and fl.entity_id in (select id from reset_test_reports))
on conflict do nothing;

insert into reset_test_files (id)
select unnest(coalesce(ap.locked_original_evidence_file_ids, '{}'::uuid[]))
from action_plans ap
where ap.id in (select id from reset_test_plans)
on conflict do nothing;

insert into reset_test_files (id)
select unnest(coalesce(apf.response_file_ids, '{}'::uuid[]))
from action_plan_feedback apf
where apf.id in (select id from reset_test_feedback)
on conflict do nothing;

insert into reset_test_files (id)
select unnest(coalesce(item.evidence_file_ids, '{}'::uuid[]))
from action_plan_document_items item
where item.action_plan_document_id in (select id from reset_test_documents)
   or item.action_plan_id in (select id from reset_test_plans)
on conflict do nothing;

insert into reset_test_files (id)
select stored_file_id
from file_upload_intents
where stored_file_id is not null
  and ((entity_type = 'audit' and entity_id in (select id from reset_test_audits))
    or (entity_type = 'audit_answer' and entity_id in (select id from reset_test_answers))
    or (entity_type = 'action_plan' and entity_id in (select id from reset_test_plans))
    or (entity_type = 'action_plan_document' and entity_id in (select id from reset_test_documents))
    or (entity_type = 'action_plan_feedback' and entity_id in (select id from reset_test_feedback))
    or (entity_type = 'report' and entity_id in (select id from reset_test_reports)))
on conflict do nothing;

insert into reset_test_files (id)
select c.file_id
from certificates c
where c.area_id in (select id from reset_test_areas)
  and c.file_id is not null
on conflict do nothing;

delete from notifications
where entity_id in (
  select id from reset_test_audits
  union select id from reset_test_answers
  union select id from reset_test_plans
  union select id from reset_test_documents
  union select id from reset_test_feedback
  union select id from reset_test_reports
);

delete from activity_logs
where entity_id in (
  select id from reset_test_audits
  union select id from reset_test_answers
  union select id from reset_test_plans
  union select id from reset_test_documents
  union select id from reset_test_feedback
  union select id from reset_test_reports
);

delete from sync_queue
where entity_id in (
  select id from reset_test_audits
  union select id from reset_test_answers
  union select id from reset_test_plans
  union select id from reset_test_documents
  union select id from reset_test_feedback
  union select id from reset_test_reports
);

delete from file_access_events
where file_id in (select id from reset_test_files)
   or entity_id in (
     select id from reset_test_audits
     union select id from reset_test_answers
     union select id from reset_test_plans
     union select id from reset_test_documents
     union select id from reset_test_feedback
     union select id from reset_test_reports
   );

delete from file_upload_intents
where stored_file_id in (select id from reset_test_files)
   or entity_id in (
     select id from reset_test_audits
     union select id from reset_test_answers
     union select id from reset_test_plans
     union select id from reset_test_documents
     union select id from reset_test_feedback
     union select id from reset_test_reports
   );

delete from file_links
where file_id in (select id from reset_test_files)
   or entity_id in (
     select id from reset_test_audits
     union select id from reset_test_answers
     union select id from reset_test_plans
     union select id from reset_test_documents
     union select id from reset_test_feedback
     union select id from reset_test_reports
   );

delete from report_artifacts
where report_id in (select id from reset_test_reports);

delete from report_generation_jobs
where area_id in (select id from reset_test_areas)
   or report_id in (select id from reset_test_reports);

delete from action_plan_feedback
where id in (select id from reset_test_feedback);

delete from action_plan_documents
where id in (select id from reset_test_documents);

delete from action_plans
where id in (select id from reset_test_plans);

delete from reports
where id in (select id from reset_test_reports);

delete from certificates
where area_id in (select id from reset_test_areas);

delete from audits
where id in (select id from reset_test_audits);

delete from report_editable_content
where scope_key in (select slug from reset_test_areas);

delete from stored_files
where id in (select id from reset_test_files);
