# Calorie Tracker App – Service Layer and REST API

## 1. Purpose
This document summarises the application service layer and the REST API built on top of the repository abstraction. The service layer contains business logic, validation, and orchestration, while the API layer exposes that logic through HTTP endpoints.

## 2. Service Layer

| Service | Responsibilities | Repository Dependencies |
|---|---|---|
| `FoodItemService` | Search food items, add new catalogue entries, update food details, and prevent unsafe deletion when meal history depends on an item. | `foodItems`, `foodCatalogues`, `mealEntries` |
| `MealLogService` | Create, list, update, and delete meal logs; validate input; recalculate meal totals; refresh daily summaries after changes. | `foodItems`, `mealEntries`, `mealLogs`, `nutritionGoals`, `nutritionSummaries` |
| `NutritionGoalService` | Create and update nutrition targets, read the current goal, delete the active goal, and produce summary snapshots for the dashboard. | `mealLogs`, `nutritionGoals`, `nutritionSummaries` |

## 3. REST API Routes

| Route | Methods | Description |
|---|---|---|
| `/api/food-items` | `GET`, `POST` | Search or create food catalogue entries. |
| `/api/food-items/[id]` | `GET`, `PUT`, `DELETE` | Retrieve, update, or remove a specific food item. |
| `/api/meal-logs` | `GET`, `POST` | List meal logs or create a new meal log. |
| `/api/meal-logs/[id]` | `GET`, `PUT`, `DELETE` | Retrieve, update, or remove a specific meal log. |
| `/api/nutrition-goals` | `GET`, `POST`, `PUT`, `DELETE` | Read, create, update, or delete the current nutrition goal. |
| `/api/nutrition-goals/summary` | `GET` | Return a daily or range-based nutrition summary. |

## 4. Behaviour Notes

- Validation errors return HTTP `400`.
- Missing records return HTTP `404`.
- Duplicate food names or other conflicts return HTTP `409`.
- Unexpected failures return HTTP `500`.
- All route handlers return JSON responses.

## 5. Testing Approach

The API layer is tested with Node-based integration tests that call the route handlers directly.
The service layer is tested in isolation with in-memory repositories so that business logic remains deterministic and fast to verify.

## 6. Traceability

| Business Capability | Service | API Route |
|---|---|---|
| Search food items | `FoodItemService` | `GET /api/food-items` |
| Add food item to database | `FoodItemService` | `POST /api/food-items` |
| Create meal log | `MealLogService` | `POST /api/meal-logs` |
| View daily totals and remaining calories | `NutritionGoalService` | `GET /api/nutrition-goals/summary` |
| Save or update nutrition goal | `NutritionGoalService` | `POST` / `PUT /api/nutrition-goals` |
| Review current nutrition goal | `NutritionGoalService` | `GET /api/nutrition-goals` |

