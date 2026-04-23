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
- `tests/` contains unit tests for domain rules and each creational pattern.

### Language and Design Choices

- **TypeScript** is used to preserve strong type safety and match the existing Next.js project stack.
- Domain classes use private fields with focused methods aligned to the class diagram and requirements traceability.
- Business rules from the domain model are enforced in constructors and guard methods (duplicate detection, positive portions, required entries, and valid goals).
- The implementation separates domain logic from pattern examples to keep responsibilities clear.

### Creational Pattern Rationale

- **Simple Factory:** `FoodItemSimpleFactory` centralizes creation of standard and custom food items.
- **Factory Method:** `SummaryExporterCreator` delegates exporter construction to concrete creators for CSV or JSON output.
- **Abstract Factory:** Dashboard widget families (`MobileDashboardWidgetFactory`, `WebDashboardWidgetFactory`) create related UI components consistently.
- **Builder:** `MealLogBuilder` constructs meal logs step by step and validates required elements.
- **Prototype:** `FoodItemPrototypeRegistry` clones preconfigured food templates for fast reuse.
- **Singleton:** `DatabaseConnection` ensures one shared connection instance, including async-safe initialization.

## Running Tests and Coverage

```bash
npm test
npm run coverage
```

The coverage command generates terminal output and an HTML report under `coverage/`.
Reference notes for coverage execution are available in `tests/COVERAGE_REPORT.md`.

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
- 🧭 [Object State Model](docs/OBJECT_STATE_MODEL.md)
- 🖼️ [Object State Model Figure](docs/object-state-model.svg)
- 🔄 [Activity Workflow Model](docs/ACTIVITY_WORKFLOW_MODEL.md)
- 🖼️ [Activity Workflow Model Figure](docs/activity-workflow-model.svg)
- 🗂️ [Agile Planning Document](docs/AGILE_PLANNING.md)
- 📌 [GitHub Project Template Analysis](docs/TEMPLATE_ANALYSIS.md)
- 🖼️ [Template Comparison Figure](docs/template_comparison.svg)
- 📋 [Kanban Board Explanation](docs/KANBAN_EXPLANATION.md)
- 🖼️ [Kanban Board Illustration](docs/kanban_board.svg)
- 🧠 [Reflection](docs/REFLECTION.md)

## GitHub Project Documentation

The repository also includes documentation for the GitHub Projects workflow used to support Agile delivery of the Calorie Tracker App.

- The **template analysis** compares available GitHub Project templates and justifies the selected approach.
- The **template comparison figure** summarises the template options presented in the report.
- The **Kanban explanation** describes the board structure, work-in-progress limits, and workflow logic.
- The **Kanban board illustration** is provided as an SVG asset for direct embedding.
- The **domain model** defines the principal entities, business rules, and traceability links.
- The **class diagram** presents the object-oriented structure in Mermaid.js and is paired with an SVG export.
- The **object state model** documents key lifecycle transitions for the core application artefacts.
- The **activity workflow model** describes the principal operational flows using UML-style diagrams.
- The **SVG figures** provide visual exports for convenient review and presentation.

## Project Status
🚧 This project is currently under development.

## Author
**Sabelo Kama**
