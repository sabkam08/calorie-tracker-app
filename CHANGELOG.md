# Changelog

## 2026-04-24

### Added
- Repository layer contracts in `src/repositories/contracts/` for core domain entities.
- Shared in-memory repository base in `src/repositories/inmemory/InMemoryRepository.ts`.
- In-memory CRUD repositories for food items, catalogues, meal logs, meal entries, goals, summaries, and user profiles.
- Storage-abstraction factory in `src/repositories/factory/RepositoryFactory.ts`.
- Future backend stub in `src/repositories/future/DatabaseFoodItemRepository.ts`.
- Unit tests for repository behavior in `tests/repositories.test.ts`.
- Repository layer documentation in `docs/REPOSITORY_LAYER.md`.
- Project issue tracker documentation in `docs/PROJECT_ISSUES_BACKLOG.md`.

### Updated
- `docs/CLASS_DIAGRAM.md` with repository interfaces, in-memory implementations, and factory relationships.
- `README.md` with repository design rationale and documentation links.

## 2026-04-23

### Added
- Domain class implementations in `src/domain` based on the documented class model.
- Creational pattern implementations in `src/creational_patterns`:
  - Simple Factory
  - Factory Method
  - Abstract Factory
  - Builder
  - Prototype
  - Singleton
- Unit tests in `tests` for:
  - Domain rules
  - Pattern behavior and object creation
  - Builder input validation edge cases
  - Singleton async concurrency behavior
- Node test-runner scripts with TSX support and coverage command.
- Demo runner in `src/demo.ts`.

### Updated
- `README.md` with language choice, design rationale, pattern mapping, and test commands.
- `package.json` scripts and development dependencies for testing and coverage.
