# Calorie Tracker App – Product Backlog

## 1. Purpose
This document prioritises the user stories for the Calorie Tracker App using MoSCoW classification and effort estimates. It explains why each item is ordered as it appears in the backlog.

## 2. Product Backlog

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

## 3. Prioritization Rationale
The first six items are prioritised as **Must-have** because they form the smallest complete and safe MVP: search, validate, log, provide daily progress feedback, run reliably in a deployable environment, and protect user data. These items address the highest-impact stakeholder concerns (speed, accuracy, reliability, and privacy/security). The **Should-have** items improve review, correction, and professional workflows, but are not required to demonstrate a complete primary user journey. The **Could-have** and **Won’t-have** items are explicitly deferred to prevent scope dilution and to preserve delivery credibility.

