# Calorie Tracker App – GitHub Project Template Analysis

## 1. Purpose
This document evaluates the GitHub Projects templates available for Agile work management and identifies the template most appropriate for the Calorie Tracker App. The analysis is aligned with the sprint-based delivery approach defined in the project’s Agile planning document.

## 2. Template Comparison

| Template | Typical Columns and Workflow | Automation Features | Agile Suitability | Relevance to the Calorie Tracker App |
|---|---|---|---|---|
| **Basic Kanban** | A simple flow such as **To Do → In Progress → Done**. Items are moved manually. | Limited or no built-in automation. | Suitable for small teams that need a straightforward visual board. | Adequate for basic tracking, but too minimal for a project that requires sprint traceability, testing, and issue-based delivery. |
| **Automated Kanban** | A structured flow such as **Backlog → Ready → In Progress → Review → Done**. | Can automate issue movement, status updates, and workflow transitions when issues or pull requests change state. | Strong fit for continuous delivery and incremental work. | Highly suitable because the project is issue-driven, sprint-oriented, and benefits from reduced manual board maintenance. |
| **Bug Triage** | Usually organized around **New → Needs Triage → Confirmed → In Progress → Done**. | Strong for triage automation, labeling, and prioritization of defects. | Best suited to maintenance-heavy or support-heavy environments. | Less suitable because the project is focused on planned feature delivery rather than large-scale defect management. |
| **Team Planning** | Commonly uses **Backlog → Ready for Sprint → In Progress → Blocked → Done**, often combined with iteration views. | Supports planning, prioritization, milestones, and team coordination. | Strong for sprint planning and multi-member delivery. | Useful from a planning perspective, but more process-heavy than necessary for a compact academic project. |

## 3. Selected Template and Justification

The **Automated Kanban** template is the most suitable option for the Calorie Tracker App.

### Justification
1. **It aligns with Agile delivery.** The project is organized around user stories, sprint planning, and incremental delivery, which are well supported by a Kanban-style workflow.
2. **It reduces administrative overhead.** Automation minimizes manual board updates and helps keep the board current as issues move from one stage to another.
3. **It supports traceability.** The project already uses functional requirements, use cases, and sprint tasks with clear identifiers. An issue-driven template strengthens that traceability.
4. **It accommodates quality assurance.** The board can be extended with **Testing** and **Blocked** columns, which are necessary for formal review and defect resolution.
5. **It fits the project scale.** The calorie tracker is a semester project with a limited scope. Automated Kanban provides sufficient structure without the complexity of enterprise planning tools.

## 4. Custom Board Configuration for the Project

The board should be adapted from the selected template using the following columns:

| Column | Purpose | WIP Guidance | Exit Criteria |
|---|---|---|---|
| **Backlog** | Holds all approved user stories and sprint tasks awaiting prioritization. | No fixed limit. | Item is refined and ready for planning. |
| **Ready** | Contains tasks selected for the current sprint but not yet started. | Limited to the sprint capacity. | Acceptance criteria are clear and the assignee is confirmed. |
| **In Progress** | Tracks tasks that are actively being developed. | Maximum of 3 items per contributor. | Implementation is functionally complete. |
| **Review** | Holds completed work awaiting code or document review. | Maximum of 2 items. | Reviewer approves the task or requests revisions. |
| **Testing** | Used for functional validation, regression checks, and acceptance testing. | Maximum of 2 items. | Test evidence confirms the requirement is satisfied. |
| **Blocked** | Captures items that cannot proceed because of a dependency or defect. | No fixed limit, but each item must include an explanation. | The obstacle is removed and the task returns to the active flow. |
| **Done** | Contains items that meet the definition of done and have been accepted. | No limit. | All criteria are complete, verified, and documented. |

## 5. Issue Population Plan

The sprint board should be populated with the tasks from `AGILE_PLANNING.md`. The following table shows how the initial items should be distributed across the project board.

| Task ID | Task Description | Linked Story ID | Suggested Label(s) | Initial Column | Suggested Assignee |
|---|---|---|---|---|---|
| T-001 | Define the food search fields, filters, and result layout | US-001 | `feature`, `frontend`, `sprint-1` | Ready | @product-owner, @frontend-dev |
| T-002 | Build the food search API endpoint and data lookup logic | US-001 | `feature`, `backend`, `sprint-1` | Backlog | @backend-dev |
| T-003 | Implement the search results component and selection flow | US-001 | `feature`, `frontend`, `sprint-1` | Ready | @frontend-dev |
| T-004 | Add meal form validation rules and inline error messages | US-003 | `feature`, `frontend`, `backend`, `sprint-1` | Backlog | @frontend-dev, @backend-dev |
| T-005 | Build the meal log form and save action | US-002 | `feature`, `frontend`, `sprint-1` | Ready | @frontend-dev |
| T-006 | Implement meal persistence and calorie calculation in PostgreSQL | US-002 | `feature`, `backend`, `database`, `sprint-1` | Backlog | @backend-dev |
| T-007 | Wire the dashboard summary card for today’s totals | US-004 | `feature`, `frontend`, `sprint-1` | Ready | @frontend-dev |
| T-008 | Add remaining-calories calculation and prompt for missing goals | US-004 | `feature`, `backend`, `sprint-1` | Backlog | @backend-dev |
| T-009 | Configure environment variables, secrets handling, and database connection | US-009, US-010 | `devops`, `security`, `sprint-1` | In Progress | @devops |
| T-010 | Add HTTPS-ready deployment notes and runtime checks | US-010 | `devops`, `security`, `sprint-1` | Backlog | @devops |
| T-011 | Write unit tests for search, validation, and calorie calculation | US-001, US-002, US-003 | `qa`, `test`, `sprint-1` | Ready | @qa-analyst |
| T-012 | Run end-to-end smoke checks for meal entry and dashboard updates | US-002, US-004 | `qa`, `acceptance`, `sprint-1` | Ready | @qa-analyst, @product-owner |

## 6. Board Governance

To maintain consistency, each issue should include:
- the linked story ID,
- the applicable functional requirement IDs,
- the acceptance criteria,
- the expected assignee,
- the current board column,
- and any dependencies or blockers.

The board should be reviewed during sprint planning and updated during stand-ups or progress reviews. This approach supports transparency, preserves traceability, and keeps the work aligned with the documented requirements.

## 7. Conclusion

The **Automated Kanban** template provides the best balance of simplicity, traceability, and workflow control for the Calorie Tracker App. It supports the project’s sprint structure, accommodates testing and blocker management, and creates a clear operational link between requirements, issues, and delivery status.
