# Project Issues Backlog - Repository Layer Work

## 1. Issue List

| Issue ID | Title | Type | Priority | Status | Scope |
|---|---|---|---|---|---|
| REPO-01 | Define generic repository contract | Feature | High | Done | `src/repositories/Repository.ts` |
| REPO-02 | Add entity repository contracts | Feature | High | Done | `src/repositories/contracts/*` |
| REPO-03 | Implement shared in-memory repository base | Feature | High | Done | `src/repositories/inmemory/InMemoryRepository.ts` |
| REPO-04 | Implement in-memory food item repository | Feature | High | Done | `src/repositories/inmemory/InMemoryFoodItemRepository.ts` |
| REPO-05 | Implement in-memory meal log and entry repositories | Feature | High | Done | `src/repositories/inmemory/InMemoryMealLogRepository.ts`, `src/repositories/inmemory/InMemoryMealEntryRepository.ts` |
| REPO-06 | Implement in-memory profile and goal repositories | Feature | High | Done | `src/repositories/inmemory/InMemoryUserProfileRepository.ts`, `src/repositories/inmemory/InMemoryNutritionGoalRepository.ts` |
| REPO-07 | Implement in-memory summary and catalogue repositories | Feature | Medium | Done | `src/repositories/inmemory/InMemoryNutritionSummaryRepository.ts`, `src/repositories/inmemory/InMemoryFoodCatalogueRepository.ts` |
| REPO-08 | Build repository factory for backend switching | Feature | High | Done | `src/repositories/factory/RepositoryFactory.ts` |
| REPO-09 | Add future database repository stub | Technical Debt | Medium | Done | `src/repositories/future/DatabaseFoodItemRepository.ts` |
| REPO-10 | Add repository unit tests | Test | High | Done | `tests/repositories.test.ts` |
| REPO-11 | Document persistence layer architecture | Documentation | Medium | Done | `docs/REPOSITORY_LAYER.md` |
| REPO-12 | Update class diagram with repository layer | Documentation | Medium | Done | `docs/CLASS_DIAGRAM.md` |

## 2. Next Iteration Candidates

| Issue ID | Title | Type | Priority | Notes |
|---|---|---|---|---|
| REPO-13 | Implement PostgreSQL-backed repositories | Feature | High | Replace database stubs with live SQL adapters |
| REPO-14 | Add transaction boundaries for multi-entity updates | Technical Debt | Medium | Needed for cross-repository consistency |
| REPO-15 | Add pagination and filtering contracts | Feature | Medium | Prevent large in-memory result sets |
| REPO-16 | Add repository-level audit trail | Feature | Low | Track save/update/delete metadata |

