# Calorie Tracker App – System Specification

## 1. Project Title
Calorie Tracker App

---

## 2. Domain
**Health and Nutrition**

The health and nutrition domain includes systems that help individuals monitor and improve dietary habits and overall well-being. Modern lifestyles often make it difficult to maintain healthy eating patterns or to track nutritional intake accurately.

Applications in this domain support food logging, calorie calculation, and analysis of dietary patterns. A digital calorie tracking system helps users understand eating habits and make informed dietary decisions.

---

## 3. Problem Statement

Many individuals struggle to maintain healthy eating habits because manually tracking daily calorie and nutrient intake is difficult and time-consuming.

Traditional methods such as handwritten food journals or mental estimates are often inaccurate, time-consuming, and difficult to maintain consistently. Users frequently forget to record meals or underestimate portion sizes, which leads to unreliable tracking data.

Without accurate tracking, individuals cannot effectively monitor calorie consumption or understand patterns in their nutrition. This makes it harder to achieve personal health goals such as weight management, improved diet quality, or balanced nutrition.

The proposed **Calorie Tracker App** addresses this problem by providing a central digital platform where users can record meals, calculate calories automatically, and review nutritional intake over time.

### Problem Statement Analysis (5W1H)

Click on each section to expand the details:

<details>
<summary>🎯 <strong>WHAT are we trying to achieve?</strong></summary>

- **The Goal:** Build a central digital platform where users can record meals, calculate calories automatically, and review nutritional intake.
- **The Facts:** Traditional manual tracking methods are inaccurate, time-consuming, and difficult to sustain.
- **The Risk of Inaction:** Users will continue to struggle with tracking, making personal health goals harder to achieve.
</details>

<details>
<summary>💡 <strong>WHY do we need this solution?</strong></summary>

- **The Core Reason:** To help users manage their diets and reach their goals without the burden of manual calculation.
- **Root Cause:** Modern lifestyles make manual tracking tedious. Relying on memory or pen and paper introduces friction and reduces consistency.
</details>

<details>
<summary>⚙️ <strong>HOW will things be different?</strong></summary>

- **The Change:** The burden of calculation shifts from the user to the automated system, resulting in consistent and accurate daily totals.
- **The Implementation:** The system uses an accessible, responsive full-stack web application (Next.js, Tailwind) so logging food remains efficient.
</details>

<details>
<summary>🌍 <strong>WHERE does this happen and impact?</strong></summary>

- **The Environment:** In the daily lives, kitchens, and dining environments of health-conscious individuals.
- **The Impact:** It directly affects a user's personal health and physical fitness. Responsive design ensures they can log food wherever they are.
</details>

<details>
<summary>👤 <strong>WHO is this for and who is involved?</strong></summary>

- **Target Audience:** Individuals trying to lose weight, maintain healthy habits, or understand their daily nutritional intake.
- **The Team:** A single developer building the application, with stakeholders evaluating the project.
</details>

<details>
<summary>⏱️ <strong>WHEN does this happen and when is it due?</strong></summary>

- **The Timeline:** This is a chronic, ongoing issue for users. For the developer, the solution must be designed and delivered within the duration of a single semester.
</details>

---

## 4. Individual Scope (Feasibility)

This project is designed to be feasible for development by a **single developer** within one semester.

The system will be implemented using a **modern full-stack JavaScript architecture**:

- **Next.js** for both frontend and backend API functionality
- **TypeScript** to provide strong typing and improve code reliability
- **Tailwind CSS** for efficient and responsive UI design
- **PostgreSQL** as the relational database for storing user and nutrition data

Using Next.js allows the frontend and backend to exist within the same project, simplifying development and deployment. Tailwind CSS also accelerates UI development by providing predefined utility classes.

The scope of the application will focus on **core calorie tracking functionality**, including:

- User meal logging
- Calorie calculation
- Viewing daily calorie totals
- Storing nutrition records in the database

More advanced features such as wearable integrations, AI dietary recommendations, or barcode scanning are outside the scope of the current project.

This focused scope keeps the project **realistic, achievable, and maintainable** for a single developer while still demonstrating key software engineering principles such as system design, architectural modelling, and full-stack development.

### Technical Feasibility Assessment

| | Analysis                                                                                                                                                                                                                                                                                                               | Why It Matters |
|---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|
| **Technology** | Such technology already exists. The innovation lies in building the application with a modern framework (Next.js, TypeScript, Tailwind CSS, PostgreSQL) and centralising nutritional tracking in one app. Complex features like AI or wearables are intentionally excluded to keep requirements achievable. | Avoids overengineering or chasing unrealistic scope. |
| **Infrastructure** | The system can handle the load generated by the documented use cases. Next.js simplifies deployment, and PostgreSQL is robust enough for meal logging and records. The lack of complex third-party integrations keeps demand predictable and manageable.                                                     | Prevents scalability or performance issues later. |
| **Skills** | The scope is designed for a single developer within a semester. Limiting scope to core functionality and using an efficient stack supports rapid and realistic development.                                                                                                                      | Helps plan for staffing, training, or deferred scope. |
| **Compliance** | Operating in Health and Nutrition means handling sensitive personal data. Basic data privacy, secure authentication, and database security are necessary, even if specific regulatory frameworks are not explicitly scoped.                                                                                             | Keeps the team ahead of legal and privacy risks. |
| **Dependencies** | Minimal dependencies. Relies on open-source tools and standard hosting providers (e.g., Vercel, Supabase). There are no complex third-party vendor bottlenecks.                                                                                                                        | Flags potential bottlenecks before work starts. |
