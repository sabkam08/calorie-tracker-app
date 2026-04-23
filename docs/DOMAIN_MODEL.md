# Calorie Tracker App – Domain Model

## 1. Purpose
This document defines the core domain entities of the Calorie Tracker App, their responsibilities, their relationships, and the business rules that govern their interaction. It provides the conceptual bridge between the requirements, the use cases, and the structural design.

## 2. Core Domain Entities

| Entity | Attributes | Responsibilities | Relationships | Requirement Traceability |
|---|---|---|---|---|
| `UserProfile` | `userId`, `displayName`, `email`, `dailyCalorieGoal`, `activityLevel` | Stores the user’s profile, maintains the active nutrition goal, and initiates tracking activities. | Owns multiple `MealLog` records; maintains zero or one `NutritionGoal`; reviews `NutritionSummary` outputs. | FR-03, FR-04, FR-05, FR-08, FR-12 |
| `FoodCatalogue` | `catalogueId`, `sourceName`, `lastSyncedAt` | Provides search, duplicate checking, and controlled insertion of food items. | Stores many `FoodItem` records. | FR-07, FR-13, FR-10, FR-11 |
| `FoodItem` | `foodId`, `name`, `servingSize`, `caloriesPerServing`, `proteinGrams`, `carbohydrateGrams`, `fatGrams`, `sourceType` | Represents a reusable nutrition reference used in meal logging and search results. | Is stored in one `FoodCatalogue`; is referenced by one or many `MealEntry` records. | FR-07, FR-13, FR-02 |
| `MealLog` | `mealLogId`, `entryDate`, `mealType`, `notes`, `totalCalories` | Groups entries for a single meal occasion and recalculates the total after changes. | Belongs to one `UserProfile`; contains one or more `MealEntry` records. | FR-01, FR-02, FR-03, FR-05, FR-06, FR-12 |
| `MealEntry` | `entryId`, `portionSize`, `calories`, `createdAt` | Represents the selected food item and portion used in a meal log. | Belongs to one `MealLog`; references one `FoodItem`. | FR-01, FR-02, FR-12 |
| `NutritionGoal` | `goalId`, `dailyCalorieTarget`, `proteinTarget`, `carbohydrateTarget`, `fatTarget`, `effectiveDate` | Defines the user’s target intake and supports progress calculations. | Belongs to zero or one `UserProfile`. | FR-04, FR-08 |
| `NutritionSummary` | `summaryId`, `periodStart`, `periodEnd`, `totalCalories`, `remainingCalories`, `mealCount` | Consolidates meal activity into daily or weekly progress information. | Derived from `MealLog` records; compared against `NutritionGoal`. | FR-03, FR-04, FR-05, FR-09 |

## 3. Relationship Overview
- A `UserProfile` may own multiple `MealLog` records, but each `MealLog` belongs to one user.
- A `MealLog` contains one or more `MealEntry` records.
- Each `MealEntry` references one `FoodItem`.
- A `FoodCatalogue` stores reusable food references, including manually added items.
- A `NutritionGoal` is optional, but when present it supports remaining-calorie calculations.
- A `NutritionSummary` is derived data and is not edited directly.

## 4. Business Rules
1. A meal log shall not be saved unless it contains at least one valid meal entry.
2. Each meal entry shall reference a valid food item and a positive portion size.
3. Manually added food items shall include a name and the required nutrition fields before save.
4. Duplicate food items shall be flagged before insertion into the catalogue.
5. A user shall maintain at most one active nutrition goal.
6. Nutrition summaries shall be derived from meal logs and remain read-only.
7. Remaining calories shall equal the daily goal minus consumed calories when a goal exists.
8. Custom food items shall become searchable immediately after successful persistence.

## 5. Alignment with Requirements and Use Cases
| Domain Element | Related Use Case(s) | Related Functional Requirement(s) |
|---|---|---|
| `FoodCatalogue` and `FoodItem` | Search Food Items, Add Food Item | FR-07, FR-13 |
| `MealLog` and `MealEntry` | Create Meal Log, Validate Input, Edit/Delete Meal | FR-01, FR-02, FR-06, FR-12 |
| `UserProfile` and `NutritionGoal` | Save Goals, View Daily Totals | FR-03, FR-04, FR-08 |
| `NutritionSummary` | Generate Summaries & Export | FR-05, FR-09 |

## 6. Domain Interpretation
The domain model centres on a small set of stable objects so that the system remains understandable and maintainable. The catalogue manages food reference data, meal logs capture daily behaviour, and summaries provide derived insight. This structure supports the current scope while leaving room for controlled expansion.

