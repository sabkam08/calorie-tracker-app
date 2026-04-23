# Calorie Tracker App – Class Diagram

## 1. Purpose
This document presents the structural class model for the Calorie Tracker App. It translates the domain view into an object-oriented representation with classes, attributes, methods, relationships, and multiplicities.

## 2. Mermaid.js Class Diagram

```mermaid
classDiagram
direction LR

class UserProfile {
  +string userId
  +string displayName
  +string email
  +number dailyCalorieGoal
  +string activityLevel
  +setGoal(target)
  +createMealLog(entryDate)
  +reviewSummary(period)
}

class FoodCatalogue {
  +string catalogueId
  +string sourceName
  +DateTime lastSyncedAt
  +searchByName(query)
  +addFoodItem(item)
  +validateDuplicate(item)
}

class FoodItem {
  +string foodId
  +string name
  +string servingSize
  +number caloriesPerServing
  +number proteinGrams
  +number carbohydrateGrams
  +number fatGrams
  +string sourceType
  +calculateCalories(portionSize)
  +updateNutritionFacts()
}

class MealLog {
  +string mealLogId
  +DateTime entryDate
  +string mealType
  +string notes
  +number totalCalories
  +addEntry(entry)
  +removeEntry(entryId)
  +recalculateTotal()
}

class MealEntry {
  +string entryId
  +number portionSize
  +number calories
  +DateTime createdAt
  +updatePortion(portionSize)
  +syncCalories()
}

class NutritionGoal {
  +string goalId
  +number dailyCalorieTarget
  +number proteinTarget
  +number carbohydrateTarget
  +number fatTarget
  +Date effectiveDate
  +updateTargets()
  +validateGoal()
}

class NutritionSummary {
  +string summaryId
  +Date periodStart
  +Date periodEnd
  +number totalCalories
  +number remainingCalories
  +number mealCount
  +buildFromLogs()
  +calculateRemainingCalories()
}

UserProfile "1" o-- "0..*" MealLog : owns
MealLog "1" *-- "1..*" MealEntry : contains
MealEntry "*" --> "1" FoodItem : references
UserProfile "1" o-- "0..1" NutritionGoal : maintains
UserProfile "1" -- "0..*" NutritionSummary : reviews
FoodCatalogue "1" *-- "0..*" FoodItem : stores
FoodCatalogue ..> FoodItem : validates duplicate items
NutritionSummary ..> MealLog : aggregates
NutritionSummary ..> NutritionGoal : compares against goal
```

## 3. Key Design Decisions
- The model centres on `MealLog` as the main aggregate because meal entry creation, editing, and deletion all depend on a coherent log.
- `FoodCatalogue` is separated from `MealLog` so that search and catalogue maintenance remain distinct from day-to-day meal capture.
- `NutritionSummary` is treated as derived data rather than persistent user input, which keeps reporting consistent with the recorded meal history.
- `NutritionGoal` remains optional so that the application can still support basic tracking even when a user has not configured a target.
- The `sourceType` attribute on `FoodItem` allows the catalogue to represent standard food references and user-added items in a single structure.

## 4. Design Notes and Traceability
| Class | Main Responsibilities | Related Requirements | Related Use Cases |
|---|---|---|---|
| `UserProfile` | Stores user preferences and goals | FR-03, FR-04, FR-08 | View Daily Totals, Save Goals |
| `FoodCatalogue` | Searches and adds food references | FR-07, FR-13 | Search Food Items, Add Food Item |
| `FoodItem` | Holds nutrition metadata | FR-02, FR-07, FR-13 | Search Food Items, Add Food Item |
| `MealLog` | Groups meal entries and recalculates totals | FR-01, FR-02, FR-06, FR-12 | Create Meal Log, Edit/Delete Meal |
| `MealEntry` | Captures food selection and portion size | FR-01, FR-02, FR-12 | Create Meal Log |
| `NutritionGoal` | Stores target intake values | FR-04, FR-08 | Save Goals |
| `NutritionSummary` | Produces progress and trend views | FR-05, FR-09 | View Meal History, Generate Summaries & Export |

## 5. Implementation Interpretation
The class diagram preserves the same boundaries as the domain model while making object responsibilities explicit. Composition is used where one object cannot exist meaningfully without another, while aggregation is used where ownership exists but lifecycle dependence is weaker. This creates a design that is suitable for implementation while remaining faithful to the documented requirements.
