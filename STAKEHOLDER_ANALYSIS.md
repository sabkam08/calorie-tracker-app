# Calorie Tracker App – Stakeholder Analysis

## Purpose
This document identifies the main stakeholders for the Calorie Tracker App and captures their role, concerns, pain points, and success metrics. The analysis is aligned with the current project scope: a full-stack calorie and nutrition tracking application built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Stakeholder Analysis Table

| Stakeholder | Role | Key Concerns | Pain Points | Success Metrics |
|---|---|---|---|---|
| Primary User / Health-Conscious Individual | Uses the app to record meals, monitor calories, and track nutrition goals. | Quick meal logging, accurate calorie totals, easy progress tracking, and a clear daily summary. | Manual calorie tracking is time-consuming; paper logs are easy to forget; existing tools may be cluttered or difficult to use. | Can log a meal in under 1 minute; daily calorie totals are updated immediately; at least 80% of test users can complete the main task without assistance. |
| Busy Student or Working Professional | Uses the app to stay aware of food intake while managing a busy schedule. | Fast entry, mobile-friendly interface, reminders or easy access to recent meals, and minimal effort to maintain logs. | Limited time makes detailed tracking hard; interruptions lead to missed entries; complex interfaces reduce consistent usage. | 90% of meal entries can be completed in 3 steps or fewer; users can resume logging from recent foods; weekly active usage remains consistent. |
| Nutrition Coach / Wellness Advisor | Reviews a user's logs to give dietary guidance and identify trends. | Reliable summaries, clear nutrient trends, and accurate daily/weekly history. | Manual summaries are difficult to prepare; incomplete logs reduce the quality of advice; inconsistent portion estimates reduce trust. | Can review a week of logs in under 5 minutes; summary data is accurate and exportable; trend views match recorded entries. |
| Project Developer / Maintainer | Builds, updates, and supports the application. | Clean architecture, predictable data flow, testable features, and clear documentation. | Changing requirements can introduce bugs; poor structure makes future updates harder; undocumented behavior slows maintenance. | Core features remain modular and testable; bugs can be reproduced and fixed quickly; documentation stays current with implementation. |
| Course Instructor / Assessor | Evaluates whether the project satisfies assignment requirements and demonstrates sound system design. | Clear documentation, traceability between requirements and features, and evidence of thoughtful design. | Weakly documented work is difficult to assess; vague requirements make scoring inconsistent; missing rationale reduces academic value. | All deliverables are easy to locate; requirements map to stakeholder needs; the project demonstrates the expected full-stack and documentation quality. |
| System Administrator / Host Operator | Deploys and monitors the application environment. | Stable deployment, secure configuration, backups, and reliable uptime. | Environment setup can be inconsistent; missing configuration details cause deployment delays; unmonitored failures affect availability. | The app can be deployed with documented steps; environment variables are clearly defined; uptime and error logs can be checked quickly. |
| Future Product Owner / Potential Client | May expand the app after the semester project into a broader product. | Extensibility, manageable costs, and a feature roadmap that can grow beyond the classroom scope. | Hard-coded shortcuts make future expansion expensive; poor modularity blocks new features; unclear scope increases rework. | The system can support future enhancements such as barcode scanning or user accounts without major redesign; the current codebase remains maintainable. |

## Stakeholder Priorities Summary
- **Primary users** prioritize speed, simplicity, and accuracy.
- **Advisors and assessors** prioritize trustworthy data, traceability, and clarity.
- **Developers and administrators** prioritize maintainability, deployability, and low-risk updates.
- **Future product stakeholders** prioritize a foundation that can grow without requiring a rewrite.

## Traceability Notes
The stakeholder concerns above inform the functional and non-functional requirements in `SYSTEM_REQUIREMENTS.md`. For example:
- Fast meal entry drives the meal logging requirements.
- Accurate summaries drive calorie calculation and reporting requirements.
- Privacy and stability concerns drive security and deployability requirements.

