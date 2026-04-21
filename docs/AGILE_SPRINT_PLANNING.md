# Calorie Tracker App – Agile Sprint Planning

## 1. Purpose
This document defines the first sprint plan for the Calorie Tracker App. It includes the sprint goal, selected user stories, task breakdown, collaboration workflow, and reflection on planning decisions.

## 2. Sprint Goal
Deliver a working MVP in which a user can find or add a food item, submit a validated meal entry, and immediately view the impact on today’s calorie totals, with the system running in a documented, deployable, and secure configuration.

## 3. Selected Sprint Stories
- **US-001** Search for food items
- **US-003** Validate meal data
- **US-013** Add food item to the database
- **US-002** Create meal log
- **US-004** View daily totals and remaining calories
- **US-009** Deploy with environment variables and PostgreSQL
- **US-010** Protect data with encryption and safe input handling

## 4. Sprint Backlog

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
| T-013 | Design the custom food entry form and required fields | US-013 | Product Owner + Frontend Dev | 3 | To Do |
| T-014 | Build the food-item creation API and database persistence flow | US-013 | Backend Dev | 8 | To Do |
| T-015 | Add validation and unit tests for duplicate or invalid food entries | US-013 | QA + Backend Dev | 5 | To Do |

## 5. How Sprint 1 Supports the MVP
Sprint 1 targets the shortest path to measurable user value. The user can search for an item, add a missing food entry when necessary, correct invalid inputs, commit a meal entry, and immediately observe updated daily totals. The deployment and security work ensures the MVP is not only demonstrable, but also operationally credible: configuration is documented, persistence is reliable, and sensitive data is handled safely.

## 6. GitHub Collaboration Workflow

1. **Create issues** for each user story using the story ID as the issue title.
2. **Link issues to requirements** by referencing `FR-xx` and `UC-xx` IDs in the issue body.
3. **Move issues across the project board** as work progresses.
4. **Attach the sprint milestone** to the selected sprint stories.
5. **Close issues with commit references** so the history stays traceable.

This workflow keeps work visible, supports disciplined change control, and provides evidence of which requirements were implemented, reviewed, and verified.

## 7. Reflection
The most difficult aspect of planning was not drafting the stories; it was deciding what to defer. When reviewing the backlog, I felt a persistent internal pressure to treat every idea as urgent. It would have been easy to label all work as critical and produce an unrealistic plan. The primary resistance to overcome was the tendency to over-promise scope. The planning discipline required accepting that value comes from sequencing and focus rather than volume.

Effort estimation was also challenging because size and complexity had to be judged without team calibration. Several items appeared small until validation rules, persistence concerns, and edge cases were considered. Conversely, some technical tasks became manageable once their boundaries were explicitly defined. I had to keep reinforcing that story points are not commitments; they are a structured way to communicate uncertainty. This reduced overconfidence and improved the credibility of the backlog.

The largest trade-off was balancing visible user features with enabling work. As an individual planner, I was inclined to prioritise features that are easy to demonstrate (search and logging). However, a usable product also requires deployability, security controls, and traceable documentation. Neglecting these would create a system that appears complete during a demo but fails under realistic operation. Managing this tension between immediate gratification and operational readiness strengthened the sprint selection.

It was also difficult to faithfully represent diverse stakeholder perspectives while making decisions alone. Even when considering the needs of a fitness enthusiast, a nutrition professional, a developer, or a researcher, each concern had to be reduced into a realistic increment of deliverable work. This required repeated refusal to expand scope whenever a new improvement suggested itself. Over time, the exercise clarified Agile planning as a discipline of restraint: selecting the smallest release that still delivers meaningful, verifiable value.

If repeating the planning cycle, I would invest additional time validating dependencies before ranking work. The process reinforced that effective Agile planning is not measured by backlog length; it is measured by clarity and readiness. That clarity is what turns documented intent into executable work.

