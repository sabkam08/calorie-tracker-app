# Calorie Tracker App – Use Case Diagram & Model

## 1. Use Case Diagram

The use case diagram is embedded below as an SVG image to ensure consistent rendering without reliance on Mermaid support.

![Calorie Tracker App UML Use Case Diagram](use-case-diagram.svg)

*Figure 1: UML use case diagram with actors outside the system boundary and use cases inside the Calorie Tracker App boundary.*

## 2. Detailed Actor Descriptions

### Fitness Enthusiast
- **Role:** Primary end user responsible for meal logging and daily progress tracking.
- **Concerns:** Ease of use, rapid entry, habit tracking, and clear progress feedback.
- **Interactions:** Logs meals, reviews summaries, edits entries, and sets goals.
- **Success Metrics:** Meal entry completed in under one minute; totals update immediately.

### Professional Athlete
- **Role:** Performance-focused user requiring precise nutrition tracking.
- **Concerns:** Accuracy, meal timing, reliable summaries, and consistent records.
- **Interactions:** Logs meals, reviews progress, monitors goals, and analyses trends.
- **Success Metrics:** Accurate calorie records and dependable performance summaries.

### Nutritionist
- **Role:** Professional reviewer who analyses logs and supports dietary guidance.
- **Concerns:** Accurate summaries, trend visibility, and exportable records.
- **Interactions:** Reviews history, generates reports, and analyses nutrition patterns.
- **Success Metrics:** Weekly review completed efficiently with no data loss during export.

### Fitness Coach
- **Role:** Professional who monitors client progress and supports goal adherence.
- **Concerns:** Consistent progress tracking, summary views, and actionable feedback.
- **Interactions:** Reviews history, checks summaries, and supports goal setting.
- **Success Metrics:** Clear progress visibility for coaching discussions.

### Personal Chef
- **Role:** Service provider who uses nutrition information to plan meals.
- **Concerns:** Portion accuracy, dietary restrictions, and meal planning support.
- **Interactions:** Reviews summaries and aligns meal portions with nutrition targets.
- **Success Metrics:** Meal plans match dietary requirements and portion targets.

### Fitness Researcher
- **Role:** Analyst who studies historical nutrition and activity patterns.
- **Concerns:** Data integrity, anonymised access, and structured historical outputs.
- **Interactions:** Reviews history and evaluates reports for trend analysis.
- **Success Metrics:** Reliable use of exported or summarised data for research purposes.

### Software Developer
- **Role:** Internal contributor responsible for building, maintaining, and deploying the application.
- **Concerns:** Modularity, maintainability, testability, and clear documentation.
- **Interactions:** Manages code structure, API maintenance, deployment configuration, and documentation.
- **Success Metrics:** Stable deployments, limited defects, and maintainable code.

### Data Provider
- **Role:** External source that supplies food and nutrition reference data.
- **Concerns:** API stability, correct attribution, and compliant data usage.
- **Interactions:** Supports search and calorie lookup workflows.
- **Success Metrics:** Consistent data quality and dependable availability.

### Nutrition NGOs
- **Role:** Public-health stakeholder interested in aggregated nutrition insight.
- **Concerns:** Accessibility, anonymised reporting, and educational usefulness.
- **Interactions:** Reviews summary outputs and aggregate trends.
- **Success Metrics:** Useful public-health insight without exposure of personal data.

### Healthy Food Supplier
- **Role:** Commercial partner that may use the platform for nutrition-aware visibility.
- **Concerns:** Product visibility, partner integration, and relevant user engagement.
- **Interactions:** Reviews future-facing summary or referral opportunities.
- **Success Metrics:** Measurable visibility or referral-related engagement.

### Advertiser
- **Role:** Business stakeholder interested in promotional visibility and engagement.
- **Concerns:** Targeted placement, audience engagement, and measurable return.
- **Interactions:** Relies on future-facing engagement and analytics capabilities.
- **Success Metrics:** Strong engagement metrics and effective targeting.

---

## 3. Use Case Relationships Explained

### Inclusion Relationships (→ includes)
**Create Meal Log → Search Food Items**
- Each meal entry depends on locating the correct food item.
- Search therefore occurs before calorie calculation.
- Supports FR-01 and FR-07.

**Create Meal Log → Validate Input**
- Validation is performed during meal submission.
- This prevents invalid entries from reaching the database.
- Addresses FR-12.

### Extension Relationships (→ extends to)
**View Daily Totals ⟶ Display Remaining Calories**
- Remaining calories extend the totals view.
- The detail appears only when a goal exists.
- Links FR-03 and FR-04.

**Search Food Items → Add Food Item**
- When no suitable match exists, the user may create a new food entry.
- This keeps meal logging moving without interruption.
- Supports FR-07 and FR-13.

### Generalization Relationships (→ initiates)
**Busy Professional generalizes Primary User**
- Both follow the same core meal logging flow.
- Busy Professional emphasises speed, while Primary User emphasises simplicity.
- Both perform the same use cases with different performance expectations.

---

## 4. Alignment with Stakeholder Concerns

| Stakeholder | Key Concern | Addressed By Use Cases |
|---|---|---|
| Fitness Enthusiast | Quick meal logging and accurate totals | Create Meal Log, View Daily Totals, Display Remaining Calories, Add Food Item |
| Professional Athlete | Precision, fast entry, and reliable totals | Search Food Items, Create Meal Log, Add Food Item, View Daily Totals |
| Nutritionist | Reliable summaries and trend analysis | View Meal History, Generate Summaries & Export |
| Fitness Coach | Progress monitoring and actionable summaries | View Meal History, View Daily Totals, Generate Summaries & Export |
| Personal Chef | Portion planning and dietary alignment | View Meal History, Generate Summaries & Export |
| Fitness Researcher | Historical patterns and aggregated data | View Meal History, Generate Summaries & Export |
| Software Developer | Clean architecture and maintainability | Configure Environment, Maintain Documentation |
| Data Provider | Stable data access and correct usage | Search Food Items, Create Meal Log |
| Nutrition NGOs | Anonymised insight for public-health use | Generate Summaries & Export |
| Healthy Food Supplier | Nutrition-aware product visibility | Generate Summaries & Export, Add Food Item |
| Advertiser | Future engagement and visibility | Future-oriented analytics only; not core to current scope |

---

## 5. Requirements Traceability

Each use case is mapped to one or more functional requirements from `SYSTEM_REQUIREMENTS.md`:

| Use Case | FR ID(s) | Description |
|---|---|---|
| Create Meal Log | FR-01, FR-02 | Log meals and calculate calories automatically |
| Search Food Items | FR-07 | Find food items by name and filters |
| Validate Input | FR-12 | Show validation messages for incomplete/invalid data |
| View Daily Totals | FR-03 | Display total calories consumed today |
| Display Remaining Calories | FR-04 | Show calories remaining against daily goal |
| View Meal History | FR-05 | Browse logs by day, week, or custom range |
| Edit/Delete Meal | FR-06 | Modify or remove existing entries |
| Save Goals | FR-08 | Persist user's daily calorie target |
| Generate Summaries & Export | FR-09 | Create reports with totals and trends |
| Configure Environment | FR-10, FR-11 | Set up database and application settings |
| Maintain Documentation | FR-11 | Keep docs current for future maintainers |
| Add Food Item | FR-13 | Create a new catalogue entry when no suitable match exists |

---

## 6. Design Decisions

### Why 6 Actors?
- **Core users:** Fitness Enthusiast, Professional Athlete, Nutritionist, Fitness Coach, Personal Chef, and Fitness Researcher represent the main interaction groups.
- **Supporting stakeholders:** Software Developer and Data Provider ensure the system can be deployed, maintained, and populated with reliable data.
- **Extended stakeholders:** Nutrition NGOs, Healthy Food Supplier, and Advertiser are retained for completeness and future expansion.

### Why 12 Use Cases?
- **Core workflows (9):** Meal logging, search, validation, catalogue maintenance, viewing, editing, goals, and summaries
- **Support workflows (3):** Environment setup, documentation, and configuration
- Each use case maps to one or more functional requirements, ensuring coverage

### Inclusion vs. Extension
- **Inclusion** (meal log → search, meal log → validate) enforces required steps.
- **Extension** (totals → remaining calories) captures an optional but natural enhancement.
- This design avoids duplication while keeping the flows clear.

