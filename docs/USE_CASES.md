# Calorie Tracker App – Use Case Diagram & Model

## 1. Use Case Diagram

The use case diagram is embedded below as an SVG image so it renders consistently without relying on Mermaid support.

![Calorie Tracker App UML Use Case Diagram](use-case-diagram.svg)

*Figure 1: UML use case diagram with actors outside the system boundary and use cases inside the Calorie Tracker App boundary.*

## 2. Detailed Actor Descriptions

### Fitness Enthusiast
- **Role:** Primary end user who logs meals and tracks daily nutrition progress.
- **Concerns:** Ease of use, fast entry, habit tracking, and clear progress feedback.
- **Interactions:** Meal logging, viewing summaries, editing entries, setting goals.
- **Success Metrics:** Meal entry completed in under one minute; totals update immediately.

### Professional Athlete
- **Role:** Performance-focused user who requires precise nutrition tracking.
- **Concerns:** High accuracy, meal timing, reliable summaries, and consistent records.
- **Interactions:** Meal logging, progress review, goal monitoring, and trend analysis.
- **Success Metrics:** Accurate calorie records and dependable performance-oriented summaries.

### Nutritionist
- **Role:** Professional reviewer who analyses logs and supports dietary guidance.
- **Concerns:** Accurate summaries, trend visibility, and exportable records.
- **Interactions:** View history, generate reports, and analyse nutrition patterns.
- **Success Metrics:** Review a week of logs efficiently and export results without data loss.

### Fitness Coach
- **Role:** Professional who monitors client progress and supports goal adherence.
- **Concerns:** Consistent progress tracking, summary views, and actionable feedback.
- **Interactions:** View history, review summaries, and support goal setting.
- **Success Metrics:** Clear progress visibility for coaching conversations.

### Personal Chef
- **Role:** Service provider who uses nutrition information to plan meals.
- **Concerns:** Portion accuracy, dietary restriction awareness, and meal planning support.
- **Interactions:** Review summaries and align meal portions with nutrition targets.
- **Success Metrics:** Meal plans match dietary requirements and portion targets.

### Fitness Researcher
- **Role:** Analyst who studies historical nutrition and activity patterns.
- **Concerns:** Data integrity, anonymised access, and structured historical outputs.
- **Interactions:** Review history and evaluate reports for trend analysis.
- **Success Metrics:** Reliable use of exported or summarised data for research purposes.

### Software Developer
- **Role:** Internal contributor who builds, maintains, and deploys the application.
- **Concerns:** Modularity, maintainability, testability, and clear documentation.
- **Interactions:** Code organisation, API maintenance, deployment configuration, documentation updates.
- **Success Metrics:** Stable deployments, limited defects, and maintainable code structure.

### Data Provider
- **Role:** External source that supplies food and nutrition reference data.
- **Concerns:** API stability, correct attribution, and compliant data usage.
- **Interactions:** Supports search and calorie lookup workflows.
- **Success Metrics:** Consistent data quality and dependable service availability.

### Nutrition NGOs
- **Role:** Public-health stakeholder interested in aggregated nutrition insights.
- **Concerns:** Accessibility, anonymised reporting, and educational usefulness.
- **Interactions:** Review summary outputs and aggregate trends.
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
- Every meal entry depends on locating the correct food item in the database.
- This ensures that search occurs before calorie calculation.
- Supports FR-01 and FR-07 together.

**Create Meal Log → Validate Input**
- Validation occurs as part of meal submission rather than as a separate process.
- This prevents invalid entries before they reach the database.
- Addresses FR-12 (validation messages).

### Extension Relationships (→ extends to)
**View Daily Totals ⟶ Display Remaining Calories**
- Remaining calories appear as an extension of the totals view.
- The detail appears only when a user has set a goal.
- Ties FR-03 and FR-04 together in a natural workflow.

**Search Food Items → Add Food Item**
- When the catalogue does not contain a suitable match, the user can create a new food entry.
- This keeps meal logging moving without forcing the user to stop at a search failure.
- Supports FR-07 and FR-13 together.

### Generalization Relationships (→ initiates)
**Busy Professional generalizes Primary User**
- Both follow the same core meal logging flow.
- Busy Professional emphasises speed, while Primary User emphasises simplicity.
- Both can perform the same use cases but with different performance expectations.

---

## 4. Alignment with Stakeholder Concerns

| Stakeholder | Key Concern | Addressed By Use Cases |
|---|---|---|
| Fitness Enthusiast | Quick meal logging, accurate totals | Create Meal Log, View Daily Totals, Display Remaining Calories, Add Food Item |
| Professional Athlete | Precision, fast entry, reliable totals | Search Food Items, Create Meal Log, Add Food Item, View Daily Totals |
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

Each use case is mapped to one or more functional requirements (FR) from `SYSTEM_REQUIREMENTS.md`:

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
- **Core workflows (9):** Meal logging, search, validation, catalogue maintenance, viewing, editing, goals, summaries
- **Support workflows (3):** Environment setup, documentation, configuration
- Each use case maps to one or more functional requirements, ensuring complete coverage

### Inclusion vs. Extension
- **Inclusion** (meal log → search, meal log → validate) enforces that certain steps always happen together
- **Extension** (totals → remaining calories) shows optional but natural workflow enhancements
- This design prevents duplicate specifications while keeping flows clear

