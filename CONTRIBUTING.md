# Contributing to Calorie Tracker App

## Getting Started
1. Fork the repository.
2. Clone your fork locally.
3. Install dependencies.
4. Run the local verification commands.
5. Pick an issue labeled `good-first-issue` or `feature-request`.
6. Create a branch, make your changes, and open a pull request.

## Prerequisites
- Node.js 20 or newer
- npm
- A GitHub account
- Access to the repository fork

## Installation
```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

If you are working on PostgreSQL-related features, also confirm your environment variables and connection check:

```bash
npm run db:check
```

## Coding Standards
- Keep changes small and focused.
- Write or update tests when behavior changes.
- Run linting, type checking, and tests before opening a pull request.
- Follow the existing TypeScript and Next.js structure used in `src/`.
- Prefer clear names and explicit validation over hidden assumptions.
- Do not commit secrets or local environment files.

## Picking Issues
- Start with issues labeled `good-first-issue` if you are new to the project.
- Use `feature-request` issues for larger enhancements or shared planning work.
- Read the issue description, acceptance criteria, and linked docs before starting.
- Comment on the issue to say you are working on it so others can avoid duplicate effort.

## Pull Request Process
1. Create a branch from `main`.
2. Implement the requested change.
3. Add or update tests if needed.
4. Re-run the verification commands.
5. Open a pull request with a clear title and summary.
6. Reference the issue number in the pull request description.
7. Ask for review and wait for CI checks to pass.

## Helpful Notes
- Keep pull requests small so they are easier to review.
- Include screenshots for UI changes.
- Include example requests or responses for API changes.
- If you are unsure about a task, comment on the issue before editing code.

