# Calorie Tracker App – Agile Planning Document

## 1. Purpose
This document presents the Agile delivery plan for the calorie‑tracking application. It converts documented stakeholder needs, functional requirements, and use cases into user stories, a prioritised product backlog, and a two‑week sprint plan targeting a minimum viable product (MVP).

## 2. Agile Tooling and Traceability Plan
To maintain auditability from requirement → use case → story → task → test evidence, the following GitHub practices are used:

- **GitHub Issues:** one issue per user story using the story ID as the title prefix (e.g., `US-001 Search food items`).
- **GitHub Projects:** track flow through `Backlog`, `Ready`, `In Progress`, `Review`, and `Done`.
- **GitHub Milestones:** group delivery into time‑boxed milestones (e.g., `Sprint 1 – MVP`).
- **Labels:** apply consistent tags for type and traceability (e.g., `feature`, `bug`, MoSCoW labels, plus `FR-xx`, `UC-xx`, `sprint-1`).
- **Issue body template:** include requirement/use‑case references, acceptance criteria, and test links so that each story is independently verifiable.

## 3. Traceability Matrix

| Story ID | Related Functional Requirement(s) | Related Use Case(s) | Primary Stakeholder Value |
|---|---|---|---|
| US-001 | FR-07 | UC-02 | Fast food search for meal entry |
| US-002 | FR-01, FR-02 | UC-01 | Accurate meal logging and calorie calculation |
| US-003 | FR-12 | UC-01 | Clear validation before save |
| US-004 | FR-03, FR-04 | UC-03 | Daily calorie visibility and progress tracking |
| US-005 | FR-08 | UC-06 | Persistent nutrition goals |
| US-006 | FR-05 | UC-04 | Historical review over chosen ranges |
| US-007 | FR-06 | UC-05 | Correct mistakes without losing data integrity |
| US-008 | FR-09 | UC-07 | Summaries and exports for review |
| US-009 | FR-10, FR-11 | UC-08 | Deployable, maintainable runtime configuration |
| US-010 | NFR-SEC1, NFR-SEC2, NFR-SEC3 | UC-08 | Secure handling of sensitive data |
| US-011 | FR-09, stakeholder analysis notes | UC-07 | Privacy-preserving aggregate insights for research and NGO use |
| US-012 | Scope note from `SYSTEM_REQUIREMENTS.md` | None in current scope | Future barcode scanning enhancement |

## 4. User Stories

All user stories follow the format “As a [role], I want [action] so that [benefit]” and are written to satisfy INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable). Acceptance criteria are phrased as observable system behaviours to support verification.

| Story ID | User Story | Acceptance Criteria | Priority |
|---|---|---|---|
| US-001 | As a fitness enthusiast, I want to search for food items by name or filter so that I can find the correct item quickly. | Search results appear within 2 seconds; results show food name, serving details, and calories; selecting a result returns the item to the meal form. | High |
| US-002 | As a fitness enthusiast, I want to create a meal log from a chosen food item and portion so that my calorie intake is recorded accurately. | Meal records save meal type, food item, portion, timestamp, and calories; the entry appears in history; daily totals update immediately. | High |
| US-003 | As a fitness enthusiast, I want clear validation messages for incomplete or invalid meal data so that I can correct problems before saving. | Missing required fields block submission; invalid portion values show inline messages; previously entered data is retained after validation fails. | High |
| US-004 | As a fitness enthusiast, I want to view today’s calorie total and remaining calories so that I can stay within my target. | The dashboard shows consumed calories and remaining calories; values update after a meal is saved; when no goal exists, the app prompts me to set one. | High |
| US-005 | As a fitness enthusiast, I want to save or update a daily nutrition goal so that the app can measure my progress against it. | A goal persists after refresh or sign-in; the new goal updates remaining-calorie calculations; invalid values are rejected with a message. | Medium |
| US-006 | As a nutritionist or fitness coach, I want to view meal history by day, week, or custom range so that I can review patterns and trends. | The selected date range returns the correct logs; totals are grouped clearly; an empty state appears when no records are available. | Medium |
| US-007 | As a fitness enthusiast, I want to edit or delete a meal entry so that I can correct mistakes and keep my record accurate. | Edited entries save successfully; deleted entries disappear after confirmation; daily totals recalculate immediately after the change. | Medium |
| US-008 | As a nutritionist, fitness coach, or fitness researcher, I want to generate summaries and export data so that I can review and share nutrition patterns. | A summary shows totals, averages, and meal counts; export files download successfully; the selected date range is respected. | Medium |
| US-009 | As a software developer, I want the app to run through documented environment variables and PostgreSQL so that it can be deployed reliably. | Configuration is read from environment variables; the app starts successfully in a clean environment; records persist after a restart. | High |
| US-010 | As a system owner, I want user data protected with encrypted transport and safe input handling so that privacy and integrity are preserved. | Deployed traffic uses HTTPS; secrets are not committed to source control; unsafe input is blocked or sanitized before storage. | High |
| US-011 | As a fitness researcher or nutrition NGO, I want anonymized aggregate insights so that I can study population trends without exposing personal data. | Reports remove personal identifiers; only aggregate values are returned; access is limited to approved review flows. | Low |
| US-012 | As a fitness enthusiast, I want barcode scanning for packaged foods so that I can log meals faster. | This enhancement is deferred; it depends on a future scanning service and is not required for the current release. | Low |

## 5. Product Backlog

| Rank | Story ID | User Story | MoSCoW Priority | Effort Estimate | Dependencies | Why It Is Ranked This Way |
|---|---|---|---|---|---|---|
| 1 | US-001 | Search for food items | Must-have | 3 | None | Search is the fastest path to accurate meal logging and directly supports the primary user experience. |
| 2 | US-003 | Validate meal data | Must-have | 2 | None | Validation protects data quality and prevents avoidable errors before persistence. |
| 3 | US-002 | Create meal log | Must-have | 5 | US-001, US-003 | Logging is the core business capability and depends on search and validation. |
| 4 | US-004 | View daily totals and remaining calories | Must-have | 3 | US-002 | Daily feedback is central to habit tracking and user value. |
| 5 | US-009 | Deploy with environment variables and PostgreSQL | Must-have | 3 | US-002 | A usable MVP must run in a documented environment and persist data reliably. |
| 6 | US-010 | Protect data with encryption and safe input handling | Must-have | 3 | US-009 | Security is required for trustworthy deployment and safe public use. |
| 7 | US-005 | Save nutrition goals | Should-have | 2 | US-004 | Goals improve usefulness, but the core tracking flow can run without them. |
| 8 | US-006 | View meal history | Should-have | 3 | US-002 | History review is valuable for reflection and coaching but is not required for the first usable demo. |
| 9 | US-007 | Edit or delete meal entries | Should-have | 3 | US-006 | Correction workflows improve data quality after the history view exists. |
| 10 | US-008 | Generate summaries and exports | Should-have | 5 | US-006 | Reports are important for professionals but can follow the core logging experience. |
| 11 | US-011 | Anonymized aggregate insights | Could-have | 3 | US-008 | This is useful for research and NGO stakeholders, but only after the main reporting path is stable. |
| 12 | US-012 | Barcode scanning for packaged foods | Won’t-have | 5 | Future scanning service | The current scope does not include barcode scanning, so this remains a future enhancement. |

### Prioritization Rationale
The first six items are prioritised as **Must‑have** because they form the smallest complete and safe MVP: search, validate, log, provide daily progress feedback, run reliably in a deployable environment, and protect user data. These items address the highest‑impact stakeholder concerns (speed, accuracy, reliability, and privacy/security). The **Should‑have** items improve review, correction, and professional workflows, but are not required to demonstrate a complete primary user journey. The **Could‑have** and **Won’t‑have** items are explicitly deferred to prevent scope dilution and to preserve delivery credibility.

## 6. Sprint 1 Plan

### Sprint Goal
Deliver a working MVP in which a user can find a food item, submit a validated meal entry, and immediately view the impact on today’s calorie totals, with the system running in a documented, deployable, and secure configuration.

### Selected Sprint Stories
- **US-001** Search for food items
- **US-003** Validate meal data
- **US-002** Create meal log
- **US-004** View daily totals and remaining calories
- **US-009** Deploy with environment variables and PostgreSQL
- **US-010** Protect data with encryption and safe input handling

### Sprint Backlog

| Task ID | Task Description | Linked Story ID | Assigned To | Estimated Hours | Status |
|---|---|---|---|---|---|
| T-001 | Define the food search fields, filters, and result layout | US-001 | Product Owner + Frontend Dev | 3 | To Do |
| T-002 | Build the food search API endpoint and data lookup logic | US-001 | Backend Dev | 8 | To Do |
| T-003 | Implement the search results component and selection flow | US-001 | Frontend Dev | 6 | To Do |
| T-004 | Add meal form validation rules and inline error messages | US-003 | Frontend Dev + Backend Dev | 6 | To Do |
| T-005 | Build the meal log form and save action | US-002 | Frontend Dev | 6 | To Do |
| T-006 | Implement meal persistence and calorie calculation in PostgreSQL | US-002 | Backend Dev | 8 | To Do |
| T-007 | Wire the dashboard summary card for today’s totals | US-004 | Frontend Dev | 5 | To Do |
| T-008 | Add remaining-calories calculation and prompt for missing goals | US-004 | Backend Dev | 4 | To Do |
| T-009 | Configure environment variables, secrets handling, and database connection | US-009, US-010 | Backend Dev + DevOps | 5 | To Do |
| T-010 | Add HTTPS-ready deployment notes and runtime checks | US-010 | DevOps | 4 | To Do |
| T-011 | Write unit tests for search, validation, and calorie calculation | US-001, US-002, US-003 | QA | 6 | To Do |
| T-012 | Run end-to-end smoke checks for meal entry and dashboard updates | US-002, US-004 | QA + Product Owner | 4 | To Do |

### How Sprint 1 Supports the MVP
Sprint 1 targets the shortest path to measurable user value. The user can search for an item, correct invalid inputs, commit a meal entry, and immediately observe updated daily totals. The deployment and security work ensures the MVP is not only demonstrable, but also operationally credible: configuration is documented, persistence is reliable, and sensitive data is handled safely.

## 7. GitHub Collaboration Workflow

1. **Create issues** for each user story using the story ID as the issue title.
2. **Link issues to requirements** by referencing `FR-xx` and `UC-xx` IDs in the issue body.
3. **Move issues across the project board** as work progresses.
4. **Attach the sprint milestone** to the six selected sprint stories.
5. **Close issues with commit references** so the history stays traceable.

This workflow keeps work visible, supports disciplined change control, and provides evidence of which requirements were implemented, reviewed, and verified.

## 8. Reflection
The most difficult aspect of planning was not drafting the stories; it was deciding what to defer. When reviewing the backlog, I felt a persistent internal pressure to treat every idea as urgent. It would have been easy to label all work as critical and produce an unrealistic plan. The primary resistance to overcome was the tendency to over‑promise scope. The planning discipline required accepting that value comes from sequencing and focus, not volume.

Effort estimation was also challenging because size and complexity had to be judged without team calibration. Several items appeared small until validation rules, persistence concerns, and edge cases were considered. Conversely, some technical tasks became manageable once their boundaries were explicitly defined. I had to keep reinforcing that story points are not commitments; they are a structured way to communicate uncertainty. This reduced overconfidence and improved the credibility of the backlog.

The largest trade‑off was balancing visible user features with enabling work. As an individual planner, I was inclined to prioritise features that are easy to demonstrate (search and logging). However, a usable product also requires deployability, security controls, and traceable documentation. Neglecting these would create a system that appears complete during a demo but fails under realistic operation. Managing this tension between immediate gratification and operational readiness strengthened the sprint selection.

It was also difficult to faithfully represent diverse stakeholder perspectives while making decisions alone. Even when considering the needs of a fitness enthusiast, a nutrition professional, a developer, or a researcher, each concern had to be reduced into a realistic increment of deliverable work. This required repeated refusal to expand scope whenever a new improvement suggested itself. Over time, the exercise clarified Agile planning as a discipline of restraint: selecting the smallest release that still delivers meaningful, verifiable value.

If repeating the planning cycle, I would invest additional time validating dependencies before ranking work. The process reinforced that effective Agile planning is not measured by backlog length; it is measured by clarity and readiness. That clarity is what turns documented intent into executable work.


