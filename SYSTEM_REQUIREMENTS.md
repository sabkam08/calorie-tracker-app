# Calorie Tracker App – System Requirements Document (SRD)

## 1. Introduction
The Calorie Tracker App is a full-stack web application that helps users log meals, calculate daily calorie intake, and review nutrition patterns over time. This SRD defines the functional and non-functional requirements for the system and traces them to stakeholder needs.

## 2. Scope
The system will support meal logging, calorie calculation, daily summaries, nutrition history, and basic account/profile management within the current project scope. Advanced features such as wearable-device integration, barcode scanning, or AI-based meal suggestions are outside the current project scope unless added later.

## 3. Stakeholder-to-Requirement Traceability
| Stakeholder | Main Requirement Areas |
|---|---|
| Fitness Enthusiast | Meal logging, calorie totals, summaries, usability, fast entry |
| Professional Athlete | Precise calorie and macro tracking, performance-oriented summaries, accuracy |
| Nutritionist | History views, weekly summaries, exportable data, client guidance |
| Advertiser | Engagement analytics, visibility options, future monetization support |
| Data Provider | Food data integrity, API stability, compliant data usage |
| Software Developer | Modularity, documentation, testing, maintainability, deployment configuration |
| Personal Chef | Recipe-related meal planning, portion tracking, dietary restriction support |
| Fitness Coach | Progress tracking, history views, client support, goal monitoring |
| Nutrition NGOs | Anonymized insights, accessibility, public-health reporting support |
| Healthy Food Supplier | Product visibility, partner integration, nutrition-aware commerce support |
| Fitness Researcher | Aggregated trends, anonymized data, exportable research outputs |

## 4. Functional Requirements

| ID | Requirement | Primary Stakeholder(s) | Acceptance Criteria |
|---|---|---|---|
| FR-01 | The system shall allow users to create a meal log by entering a meal type, food item name, portion size, and meal date/time. | Fitness Enthusiast, Personal Chef, Fitness Coach | A logged meal is saved successfully and appears in the user's meal history with all entered details. |
| FR-02 | The system shall calculate the calorie total for each logged meal automatically based on the selected food item and portion size. | Fitness Enthusiast, Professional Athlete, Nutritionist | The meal total is updated immediately after saving, and the displayed value matches the stored calculation. |
| FR-03 | The system shall display the user's total calories consumed for the current day. | Fitness Enthusiast, Professional Athlete, Fitness Coach | The daily total updates after each meal entry and reflects all meals recorded for that day. |
| FR-04 | The system shall display remaining calories against the user's daily calorie goal. | Fitness Enthusiast, Fitness Coach, Professional Athlete | The remaining calories value equals goal minus consumed calories and changes whenever the daily total changes. |
| FR-05 | The system shall allow users to view meal history by day, week, and custom date range. | Fitness Enthusiast, Nutritionist, Fitness Researcher | The selected range returns the correct logs and totals for the chosen period. |
| FR-06 | The system shall allow users to edit or delete an existing meal log. | Fitness Enthusiast, Software Developer | Edited or deleted entries are reflected immediately in history and summary totals. |
| FR-07 | The system shall allow users to search for food items by name and filter results by matching terms. | Fitness Enthusiast, Healthy Food Supplier | Search results display relevant matches and exclude unrelated items for the entered keyword. |
| FR-08 | The system shall allow users to save personal nutrition goals such as daily calorie target. | Fitness Enthusiast, Fitness Coach, Nutritionist | A saved goal is persisted and used in future summary calculations. |
| FR-09 | The system shall generate a daily and weekly summary of calorie intake and meal activity. | Nutritionist, Fitness Coach, Fitness Researcher, Nutrition NGOs | Summary views show total calories, number of meals, and trend information for the selected period. |
| FR-10 | The system shall store nutrition records in a PostgreSQL database. | Software Developer, Data Provider | Logged meals persist after a refresh or new session and are retrievable from the database. |
| FR-11 | The system shall allow an administrator or maintainer to configure application settings through environment variables. | Software Developer, Data Provider | Documented environment variables are sufficient to run the app in a new deployment environment. |
| FR-12 | The system shall provide clear validation messages when a user submits incomplete or invalid meal data. | Fitness Enthusiast, Nutritionist, Personal Chef | Invalid fields are flagged before submission or on submit, and the user can correct the data without losing the form context. |

## 5. Non-Functional Requirements

### 5.1 Usability
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-U1 | The interface shall provide a simple, mobile-responsive layout suitable for quick meal entry. | Core pages render correctly on common desktop and mobile screen sizes without horizontal scrolling for the main content. |
| NFR-U2 | The interface shall support accessible form interactions, including labels, focus states, and readable contrast. | Forms can be completed using a keyboard, inputs have visible labels, and text remains readable on standard displays. |

### 5.2 Deployability
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-D1 | The system shall be deployable on standard Node.js hosting environments that support Next.js and PostgreSQL. | The application can be started using documented setup steps after environment variables and database access are configured. |

### 5.3 Maintainability
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-M1 | The codebase shall be organized into reusable components, API routes, and data-access logic to reduce duplication. | Common UI and data logic can be updated in one place with limited impact on unrelated features. |
| NFR-M2 | The documentation shall include setup, architecture, and requirements guidance for future contributors. | A new maintainer can locate the key documentation files and understand the app scope without additional explanation. |

### 5.4 Scalability
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-S1 | The system shall support at least 1,000 concurrent lightweight page sessions during peak usage in a deployed environment. | The application remains usable under the target load without errors caused by routine navigation or summary views. |

### 5.5 Security
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-SEC1 | User data shall be protected in transit using HTTPS in deployed environments. | Requests are served over HTTPS when the application is deployed publicly. |
| NFR-SEC2 | Sensitive configuration values such as database credentials shall not be stored in source control. | Secrets are read from environment variables and are absent from committed files. |
| NFR-SEC3 | The system shall validate user input before saving it to reduce the risk of malformed or malicious data. | Invalid or unsafe input is rejected, and only sanitized values are stored. |

### 5.6 Performance
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| NFR-P1 | The dashboard shall load the current day's summary within 2 seconds under normal operating conditions. | The summary is displayed within the target time for a typical user session and dataset. |
| NFR-P2 | Meal log submission shall complete within 3 seconds under normal operating conditions. | After submission, the user sees a success state and the updated totals within the target time. |
| NFR-P3 | Search results for common food queries shall appear within 2 seconds under normal operating conditions. | Search feedback is returned quickly enough for interactive use during meal entry. |

## 6. Requirements Notes
- Functional requirements are intentionally limited to the app’s current scope so they remain realistic for a semester project.
- Non-functional requirements emphasize usability, deployability, maintainability, scalability, security, and performance because these are key evaluation criteria in the current documentation set.
- Each requirement is written to be testable and traceable back to at least one stakeholder concern.

