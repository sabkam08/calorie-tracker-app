# Calorie Tracker App – System Architecture

## Project Title
Calorie Tracker App

---

## Domain
Health and Nutrition

---

## Problem Statement
Users often struggle to accurately track their daily calorie intake using manual methods. This system provides a digital solution that allows users to record meals, calculate calories automatically, and monitor nutritional habits over time.

---

## Individual Scope
The system is developed by a single developer using a modern web stack consisting of Next.js, TypeScript, Tailwind CSS, and PostgreSQL. The architecture remains intentionally simple while still demonstrating complete front-end, domain, and persistence concerns.

---

## Persistence Layer Overview

The application uses a repository abstraction to decouple storage concerns from domain logic.

- Generic CRUD contract: `src/repositories/Repository.ts`
- Entity contracts: `src/repositories/contracts/`
- In-memory implementations: `src/repositories/inmemory/`
- Backend selection: `src/repositories/factory/RepositoryFactory.ts`
- Future database extension point: `src/repositories/future/DatabaseFoodItemRepository.ts`

This design supports fast in-memory testing today and controlled migration to SQL/NoSQL/API backends later.

---

# C4 Architectural Diagrams

## 1. User Journey Diagram

This diagram shows one session in the progressive web app, including catalogue extension when no matching food item exists.

```mermaid
graph LR
    A[Launch App] --> B{Existing User?}
    B -- No --> C[Onboarding: Set Goals<br/>Weight, Age, Activity]
    B -- Yes --> D[Dashboard]
    C --> D
    D --> E[Log Food/Meal]
    E --> F{Search Database or<br/>Create Food Item}
    F --> G[Input Portion Size]
    G --> H[Update Daily Totals]
    H --> I[Show Remaining Calories/Macros]
    I --> D
```

## 2. Conceptual Domain Snapshot

This diagram shows high-level relationships among core domain entities. The detailed model is documented in `DOMAIN_MODEL.md` and `CLASS_DIAGRAM.md`.

```mermaid
erDiagram 
  USER ||--o{ MEAL_LOG : logs
  USER {
      string username
      float current_weight
      int daily_calorie_goal
  }
  MEAL_LOG ||--|{ FOOD_ITEM : contains
  MEAL_LOG {
      string meal_type
      date log_date
  }
  FOOD_ITEM {
      string food_name
      float calories
      float protein
      float carbs
      float fat
  }
```

## 3. Sequence Diagram

This diagram shows user interaction flow and system calls to persistence components.

```mermaid
sequenceDiagram
  actor User
  participant UI as Web App UI
  participant SVC as Domain Services
  participant REPO as Repository Layer
  participant DB as Database/API

  User->>UI: Searches for "Apple"
  UI->>SVC: searchFoodItems("Apple")
  SVC->>REPO: findByName("Apple")
  REPO-->>SVC: Return food list
  SVC-->>UI: Display food list
  User->>UI: Adds food when no match exists
  UI->>SVC: createFoodItem(foodData)
  SVC->>REPO: save(foodItem)
  REPO->>DB: Persist item (backend-specific)
  DB-->>REPO: Persisted
  User->>UI: Logs quantity and meal type
  UI->>SVC: createMealLog(...)
  SVC->>REPO: save(mealLog)
  SVC-->>UI: Return updated totals
```
