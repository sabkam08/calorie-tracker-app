# Calorie Tracker App – Agile User Stories

## 1. Purpose and Traceability
This document converts stakeholder needs, functional requirements, and use cases into user stories. It provides the traceability layer between `SYSTEM_REQUIREMENTS.md`, `USE_CASES.md`, and the Agile delivery plan.

The current project scope focuses on calorie tracking, meal logging, nutrition summaries, and deployment and maintenance support. Stakeholders such as advertisers and healthy food suppliers are retained in the analysis as future or indirect stakeholders, but they are not modelled as core initiating actors in the current scope.

---

## 2. Traceability Matrix

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

## 3. User Stories

All user stories follow the format “As a [role], I want [action] so that [benefit]” and are written to satisfy INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable). Acceptance criteria are phrased as observable system behaviour to support verification.

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

