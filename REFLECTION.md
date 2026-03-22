# Calorie Tracker App – Reflection

## Overview
This reflection summarizes the main challenges encountered while turning the calorie-tracking idea into a structured set of stakeholder, functional, and non-functional requirements.

## Challenges Faced

### 1. Balancing simplicity with feature richness
One challenge was deciding how much functionality to include. A calorie tracker can easily grow into a very large wellness platform with barcode scanning, wearable device support, social sharing, AI recommendations, and meal recognition. However, the assignment is based on a single-student semester project, so the requirements had to remain realistic. I focused on the core functions of meal logging, calorie totals, summaries, and basic history management to keep the scope achievable.

### 2. Supporting different stakeholder priorities
The primary user wants speed and convenience, while the instructor wants documentation quality and traceability, and the maintainer wants clean architecture and easy updates. These priorities do not always align perfectly. For example, adding more detailed validation and summary views improves quality, but it can also make the interface feel heavier. I resolved this by keeping the core workflow simple while still documenting quality requirements clearly.

### 3. Managing accuracy versus ease of use
A tracking system is only useful if the calorie data is accurate, but exact nutritional tracking can be difficult for users. Portion sizes, manual entry errors, and incomplete food data can all affect results. The requirements therefore emphasize clear form validation, automatic calorie calculation, and straightforward summaries so that the system is both usable and trustworthy.

### 4. Writing measurable requirements
Another challenge was avoiding vague statements such as "the system should be fast" or "the app should be easy to use." For the assignment rubric, requirements needed to be measurable and testable. I addressed this by writing requirements with concrete acceptance criteria, such as loading the dashboard within 2 seconds or completing meal submission within 3 seconds under normal conditions.

### 5. Keeping the documentation aligned
The repository already contained a project overview, specification, and architecture documentation. The challenge was making the new assignment documents consistent with those existing files instead of repeating them or introducing conflicting statements. I aligned all documents around the same scope: a Next.js, TypeScript, Tailwind CSS, and PostgreSQL calorie-tracking system developed by a single student.

## Lessons Learned
- Stakeholder analysis helps reveal hidden requirements, especially around usability, maintainability, and deployment.
- Clear traceability makes it easier to justify why each requirement exists.
- A well-scoped system can still be academically strong if the requirements are detailed and measurable.
- Non-functional requirements are just as important as functional ones because they define the quality of the final system.

## Conclusion
This assignment improved my understanding of requirements engineering by showing how stakeholder needs, system scope, and quality attributes must work together. The resulting documentation creates a clearer foundation for the project and supports future development stages.

