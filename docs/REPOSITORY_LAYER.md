# Calorie Tracker App - Persistence Repository Layer

## 1. Purpose
This document defines the persistence abstraction used by the Calorie Tracker App. The design separates domain logic from storage logic, provides CRUD operations through typed interfaces, and allows storage backends to be swapped with minimal code changes.

## 2. Repository Interface Design

### Generic contract
The generic repository contract is defined in `src/repositories/Repository.ts`.

```ts
export interface Repository<T, ID> {
  save(entity: T): void;
  findById(id: ID): T | undefined;
  findAll(): T[];
  delete(id: ID): void;
}
```

### Entity-specific contracts
Entity-specific contracts extend the generic interface and add query methods:

- `FoodItemRepository` (`findByName`)
- `FoodCatalogueRepository` (`findBySourceName`)
- `MealEntryRepository` (`findByFoodItemId`)
- `MealLogRepository` (`findByDateRange`, `findByMealType`)
- `NutritionGoalRepository` (`findLatest`)
- `NutritionSummaryRepository` (`findByPeriod`)
- `UserProfileRepository` (`findByEmail`)

These contracts are located in `src/repositories/contracts/`.

## 3. In-Memory Implementation

The in-memory layer is implemented with `Map<ID, T>` storage in `src/repositories/inmemory/`.

- `InMemoryRepository<T, ID>` provides shared CRUD behavior.
- Concrete repositories implement entity-specific contracts.
- `save` acts as an upsert operation.

This implementation supports fast local testing without external services.

## 4. Storage Abstraction Mechanism

A factory-based selection mechanism is implemented in `src/repositories/factory/RepositoryFactory.ts`.

- `StorageBackend` options: `"memory"` and `"database"`
- `RepositoryFactory.createRepositorySet(backend)` returns a full set of repositories
- Current behavior:
  - `memory`: all repositories are in-memory implementations
  - `database`: `FoodItemRepository` routes to a database stub, other repositories remain in-memory placeholders

This approach keeps construction logic centralized and makes backend switching explicit.

## 5. Future-Proofing

A future database backend stub is provided:

- `src/repositories/future/DatabaseFoodItemRepository.ts`

The class implements the `FoodItemRepository` contract and throws clear `not implemented` errors. This ensures the integration point is already part of the architecture and can be completed without changing calling code.

## 6. Test Coverage

Repository behavior is validated in `tests/repositories.test.ts`.

Coverage includes:

- CRUD operations (`save`, `findById`, `findAll`, `delete`)
- Entity-specific queries
- Latest-goal retrieval logic
- Date-range summary filtering
- Email lookup behavior
- Backend selection behavior (`database` routes to stub)

## 7. Design Rationale

- Generic interfaces reduce duplication and enforce consistency.
- Entity-specific contracts preserve domain-focused query semantics.
- In-memory repositories support fast, deterministic tests.
- Factory-based construction enables controlled backend evolution.
- Backend stubs define extension points early, reducing migration risk.

