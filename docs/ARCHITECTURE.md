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
The system will be developed by a single developer using a modern web stack consisting of Next.js, TypeScript, Tailwind CSS, and PostgreSQL. The architecture is intentionally simple while still demonstrating full end-to-end system components.

---

# C4 Architectural Diagrams

## 1. User Journey Diagram

This diagram shows a person's experience during one session of using progressive web app to track their calories.

```mermaid
graph LR
    A[Launch App] --> B{Existing User?}
    B -- No --> C[Onboarding: Set Goals<br/>Weight, Age, Activity]
    B -- Yes --> D[Dashboard]
    C --> D
    D --> E[Log Food/Meal]
    E --> F{Search Database or<br/>Scan Barcode}
    F --> G[Input Portion Size]
    G --> H[Update Daily Totals]
    H --> I[Show Remaining Calories/Macros]
    I --> D
```

## 2. Entity Relationship Diagram

This diagram shows the structure and relationship between entities. Please not this diagram is subject to change as system development progresses.


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

This diagram shows how users interact with the calorie tracking system and how the system connects to external components.


```mermaid
  sequenceDiagram
    actor User
    participant UI as Web App UI
    participant DB as Database/API

    User->>UI: Selects "Add Food"
    User->>UI: Searches for "Apple"
    UI->>DB: Query Food Database
    DB-->>UI: Return Food List
    User->>UI: Selects Item + Quantity
    UI->>DB: Calculate & Save Daily Logs
    DB-->>UI: Update Totals
    UI-->>User: Display Remaining Calories
```
