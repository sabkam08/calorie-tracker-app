# Calorie Tracker App Roadmap

## Current Focus
The current version covers the core calorie tracking workflow, the service layer, REST API routes, repository abstractions, PostgreSQL connectivity helpers, and CI/CD documentation.

## Planned Improvements

### Short Term
- Add more complete user account flows.
- Expand food catalogue management with richer search and filtering.
- Improve dashboard summaries and meal history views.
- Complete PostgreSQL-backed repository implementations.

### Medium Term
- Add role-based access control for maintainer and user workflows.
- Add export formats such as CSV and PDF for summaries.
- Introduce stronger API validation and error reporting.
- Add preview or staging deployment support through GitHub Actions.

### Future Ideas
- Integrate Redis caching for frequently requested summaries.
- Add barcode scanning for packaged foods.
- Add external food data sync jobs.
- Add analytics dashboards for trends and progress over time.
- Add security scanning and dependency automation in CI.

## Contribution Opportunities
| Area | Example Work | Why It Helps |
|---|---|---|
| Onboarding | Improve setup and contribution docs | Makes the repository easier to join |
| API | Extend routes and validation | Strengthens the service surface |
| Repository Layer | Finish database-backed repositories | Moves the app closer to production-ready storage |
| Testing | Add more integration coverage | Improves confidence during changes |
| CI/CD | Expand workflow checks and release steps | Supports safer collaboration and delivery |

## Maintenance Principle
Prefer small, well-tested changes that preserve the existing architecture: domain model → repository layer → service layer → REST API → documentation.

