# Calorie Tracker App – CI/CD Issues Tracker

## 1. Purpose
This document serves as the issue planning tracker for the continuous integration and continuous delivery work required for the Calorie Tracker App. It explains what CI/CD means, what should be opened as GitHub issues, how the branch protection rules should be configured, and how the delivery steps can be verified.

## 2. What CI/CD Means

### Continuous Integration
Continuous integration is the practice of merging small changes frequently and automatically verifying them with checks such as linting, type checking, and automated tests. The goal is to detect problems early, before they reach the main branch.

### Continuous Delivery
Continuous delivery extends integration by packaging a releasable build whenever changes reach the protected main branch. For this project, the practical release artifact is the production build output from the Next.js application, packaged so it can be reused for deployment, review, or handoff.

### Why it matters here
- It prevents broken code from being merged silently.
- It gives visible proof that the codebase still builds and passes tests.
- It creates a repeatable release process for a web application.
- It makes future automation easier, such as preview deployments, dependency scans, or release tagging.

## 3. Suggested GitHub Issues to Open
Open the following issues in GitHub and link each one to the relevant branch, pull request, or workflow step.

| Issue ID | GitHub Issue Title | Purpose | Acceptance Criteria | Status |
|---|---|---|---|---|
| CICD-01 | Add GitHub Actions workflow for lint, type check, tests, and build | Create the automated CI pipeline | Workflow runs on push to any branch and on pull requests targeting `main`; it executes `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. | To Open |
| CICD-02 | Add release artifact packaging on `main` | Generate a reusable production artifact after merge | On push to `main`, the workflow packages the Next.js production build and uploads it as a downloadable artifact. | To Open |
| CICD-03 | Configure branch protection for `main` | Prevent direct pushes and require review | `main` requires at least one pull request review, required status checks, and no direct pushes. | To Open |
| CICD-04 | Add CI/CD documentation to the README | Explain the local and remote verification steps | README includes how to run tests locally, how the workflow behaves, and where to find the CI/CD docs. | To Open |
| CICD-05 | Create `PROTECTION.md` with branch protection guidance | Explain why branch rules matter | The file documents the purpose of review rules, required checks, and merge restrictions. | To Open |
| CICD-06 | Capture screenshots for branch protection, workflow checks, and artifact output | Provide submission evidence | Screenshots show branch protection rules, a failing PR blocked by checks, passing workflow runs, and the uploaded artifact. | To Open |
| CICD-07 | Add future automation notes for security and deployment | Plan the next automation steps | Documentation covers future uses such as dependency scanning, preview deployments, release tagging, and rollback-friendly artifacts. | To Open |
| CICD-08 | Validate local commands before enabling branch protection | Confirm the repo is ready for automation | `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` succeed locally before the workflow is treated as authoritative. | To Open |

## 4. Recommended Order of Work
1. Add the GitHub Actions workflow file.
2. Run the local verification commands until they pass.
3. Configure branch protection for `main`.
4. Open a pull request and confirm that failing checks block merge.
5. Merge a successful pull request and confirm the release artifact uploads.
6. Capture screenshots for each required proof point.
7. Update the README and branch protection guidance.

## 5. GitHub Issue Body Drafts
Use the following structure when opening each issue.

### Issue template
- **Title:** short action-oriented summary.
- **Description:** what the work accomplishes and why it matters.
- **Acceptance criteria:** clear observable conditions for completion.
- **Dependencies:** upstream tasks that must be completed first.
- **Evidence:** screenshot, workflow link, or test output required for closure.

### Example body for `CICD-01`
**Description:** Create a GitHub Actions workflow that runs on every push and pull request. The workflow should install dependencies, run linting, run type checking, execute automated tests, and build the app.

**Acceptance criteria:**
- The workflow triggers on push to any branch.
- The workflow triggers on pull requests targeting `main`.
- The workflow executes `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- The workflow fails when any command fails.
- The workflow file is committed under `.github/workflows/ci.yml`.

### Example body for `CICD-02`
**Description:** Package the production build after code reaches `main` and upload it as a GitHub Actions artifact.

**Acceptance criteria:**
- The artifact job runs only after the CI job passes.
- The artifact job runs only on push events to `main`.
- The uploaded artifact contains the production build output or a packaged archive of it.
- The artifact is visible in the Actions run page.

## 6. Branch Protection Setup Summary
The branch protection rule for `main` should require:
- at least one pull request review,
- required status checks from the CI workflow,
- and no direct pushes.

Optional but helpful controls:
- dismiss stale reviews when new commits are pushed,
- require conversations to be resolved,
- and restrict who can push to the branch.

## 7. How to Set Up the Deliverables

### Step 1: Verify the project locally
Run the project checks before enabling branch protection.

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

### Step 2: Add the CI workflow
Create `.github/workflows/ci.yml` with two parts:
- **CI job:** runs on push and pull request events.
- **Release job:** runs only after CI passes and only on push to `main`.

### Step 3: Configure branch protection
In GitHub, go to **Settings → Branches → Branch protection rules** and create a rule for `main`.

Required settings:
- Require a pull request before merging.
- Require at least one review.
- Require status checks to pass before merging.
- Select the CI check created by the workflow.
- Restrict direct pushes to `main`.

### Step 4: Open a test pull request
Create a pull request with a deliberate failing change to confirm that branch protection blocks the merge. Then fix the issue and confirm the merge becomes possible after checks pass.

### Step 5: Merge to main and verify the artifact
After a successful merge, open the GitHub Actions run and confirm that the release job uploaded the artifact.

### Step 6: Capture the required screenshots
Collect screenshots for:
- branch protection rules,
- a failed pull request blocked by checks,
- a successful workflow run,
- and the uploaded release artifact.

## 8. Future Use Cases for CI/CD
CI/CD can support more than build validation. Future improvements may include:
- preview deployments for pull requests,
- automated dependency update checks,
- security scanning with CodeQL or dependency audit tools,
- tagged release packaging,
- environment-specific deployment approvals,
- and rollback-friendly artifact retention.

These enhancements become easier once the core workflow is in place because the project already has repeatable build, test, and packaging steps.

## 9. Notes for Submission Evidence
When preparing screenshots, make sure they show:
- the branch name,
- the required checks,
- the workflow run result,
- and the artifact name.

This makes the evidence easier to review and demonstrates that the pipeline is actually enforcing quality control.

## 10. Quick Reference
- **CI workflow file:** `.github/workflows/ci.yml`
- **Branch protection guide:** `docs/PROTECTION.md`
- **README summary:** `README.md`
- **Local checks:** lint, type check, tests, build

