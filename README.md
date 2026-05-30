# Calorie Tracker App

## Project Overview
The **Calorie Tracker App** is a full-stack web application for monitoring daily calorie intake and nutritional consumption. It enables users to record meals, track calories, and review eating patterns in support of healthier dietary habits.

The application simplifies nutritional tracking by providing a central platform for meal recording, automatic calorie calculation, and dietary analysis.

The project demonstrates full-stack system design through specification, architectural modelling, and structured documentation.

## Core Features
- Record daily meals
- Automatically calculate calorie totals
- Track nutritional intake over time
- View summaries of daily and weekly calorie consumption
- Manage personal nutrition logs

## Technology Stack
- **Frontend:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend API:** Next.js API Routes
- **Database:** PostgreSQL

## Implementation Overview

The source code follows the documented domain and class model:

- `src/domain/` contains the class implementations (`UserProfile`, `FoodCatalogue`, `FoodItem`, `MealLog`, `MealEntry`, `NutritionGoal`, `NutritionSummary`).
- `src/creational_patterns/` contains all six creational pattern implementations.
- `src/repositories/` contains generic repository contracts, in-memory implementations, backend stubs, and factory-based storage selection.
- `src/services/` contains business services for food items, meal logs, and nutrition goals.
- `src/app/api/` contains REST route handlers that expose the services through JSON endpoints.
- `tests/` contains unit tests for domain rules, creational patterns, and repository behavior.

### Language and Design Choices

- **TypeScript** is used to preserve strong type safety and match the existing Next.js project stack.
- Domain classes use private fields with focused methods aligned to the class diagram and requirements traceability.
- Business rules from the domain model are enforced in constructors and guard methods.
- The implementation separates domain logic, object-creation patterns, and persistence abstractions.

### Creational Pattern Rationale

- **Simple Factory:** `FoodItemSimpleFactory` centralizes creation of standard and custom food items.
- **Factory Method:** `SummaryExporterCreator` delegates exporter construction to concrete creators for CSV or JSON output.
- **Abstract Factory:** Dashboard widget families create related UI components consistently.
- **Builder:** `MealLogBuilder` constructs meal logs step by step and validates required elements.
- **Prototype:** `FoodItemPrototypeRegistry` clones preconfigured food templates for fast reuse.
- **Singleton:** `DatabaseConnection` ensures one shared connection instance, including async-safe initialization.

### Repository Layer Rationale

- **Generic repository contract:** avoids CRUD duplication across entities.
- **Entity-specific interfaces:** preserve domain-specific query semantics such as `findByName` and `findByDateRange`.
- **In-memory repositories:** support fast local testing through `Map`-based storage.
- **Factory-based storage switching:** `RepositoryFactory` enables runtime backend selection with minimal calling-code impact.
- **Future backend stubs:** reserve integration points for SQL/NoSQL/API storage adapters.

### Service Layer and REST API

- **Food item services:** support search, creation, update, and safe deletion rules.
- **Meal log services:** validate input, persist logs, and refresh summary snapshots.
- **Nutrition goal services:** manage the current target and compute dashboard summaries.
- **REST API routes:** expose these capabilities under `/api/food-items`, `/api/meal-logs`, and `/api/nutrition-goals`.
- **OpenAPI document:** `docs/openapi.yaml` defines request and response schemas for the API.

### PostgreSQL Connection Setup

The repository layer now includes reusable PostgreSQL connection logic in `src/repositories/database/`.

Required environment variable:

- `DATABASE_URL` (example: `postgresql://user:password@localhost:5432/calorie_tracker`)

Optional environment variables:

- `PGSSL_MODE` (`disable`, `require`, or `no-verify`)
- `PG_POOL_MAX` (default `10`)
- `PG_IDLE_TIMEOUT_MS` (default `30000`)
- `PG_CONNECT_TIMEOUT_MS` (default `5000`)

Run a quick connectivity check:

```bash
npm run db:check
```

## Running Tests and Coverage

```bash
npm test
npm run coverage
```

The coverage command generates terminal output and an HTML report under `coverage/`.
Reference notes for coverage execution are available in `tests/COVERAGE_REPORT.md`.

## CI/CD Workflow

The repository includes a GitHub Actions workflow at `.github/workflows/ci.yml`.

### How the pipeline works
- **On push to any branch:** the workflow runs linting, type checking, automated tests, and a production build.
- **On pull requests to `main`:** the same checks run before merge is allowed.
- **On push to `main`:** after the verification job passes, the workflow packages a release artifact and uploads it to the GitHub Actions run.

### Why CI/CD matters
CI/CD automates quality checks and release packaging. It helps the project by:
- catching mistakes early,
- preventing broken changes from reaching `main`,
- proving that the app still builds after each change,
- and creating a repeatable release package.

### Future uses of CI/CD
This pipeline can later support preview deployments, dependency updates, security scanning, release tagging, and rollback-friendly build artifacts.

### Local verification before pushing
Run the same checks locally before opening a pull request:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Demo Runner

```bash
npm run demo
```

This command executes a small end-to-end demonstration of object creation and summary calculation.

## Documentation

Project documentation can be found in the following files:

- 📄 [System Specification](docs/SPECIFICATION.md)
- 🏗️ [System Architecture](docs/ARCHITECTURE.md)
- 🧩 [Stakeholder Analysis](docs/STAKEHOLDER_ANALYSIS.md)
- 📘 [System Requirements](docs/SYSTEM_REQUIREMENTS.md)
- 📚 [Use Cases](docs/USE_CASES.md)
- ✍️ [Use Case Specifications and Test Plan](docs/TEST_AND_USE_CASES.md)
- 🧱 [Domain Model](docs/DOMAIN_MODEL.md)
- 🖼️ [Domain Model Figure](docs/domain-model.svg)
- 🧩 [Class Diagram](docs/CLASS_DIAGRAM.md)
- 🖼️ [Class Diagram Figure](docs/class-diagram.svg)
- 🗄️ [Repository Layer](docs/REPOSITORY_LAYER.md)
- 🧾 [Project Issues Backlog](docs/PROJECT_ISSUES_BACKLOG.md)
- 🧭 [Object State Model](docs/OBJECT_STATE_MODEL.md)
- 🖼️ [Object State Model Figure](docs/object-state-model.svg)
- 🔄 [Activity Workflow Model](docs/ACTIVITY_WORKFLOW_MODEL.md)
- 🖼️ [Activity Workflow Model Figure](docs/activity-workflow-model.svg)
- 🗂️ [Agile Planning Document](docs/AGILE_PLANNING.md)
- 📌 [GitHub Project Template Analysis](docs/TEMPLATE_ANALYSIS.md)
- 🖼️ [Template Comparison Figure](docs/template_comparison.svg)
- 📋 [Kanban Board Explanation](docs/KANBAN_EXPLANATION.md)
- 🖼️ [Kanban Board Illustration](docs/kanban_board.svg)
- 🧪 [Service Layer and REST API](docs/SERVICE_AND_API.md)
- 📜 [OpenAPI Specification](docs/openapi.yaml)
- 🧠 [Reflection](docs/REFLECTION.md)
- 🧾 [CI/CD Issues Tracker](docs/CI_CD_ISSUES_TRACKER.md)
- 🛡️ [Branch Protection Guide](docs/PROTECTION.md)

## Project Status
🚧 This project is currently under development.

## Author
**Sabelo Kama**
