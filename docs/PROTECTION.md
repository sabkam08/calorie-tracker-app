# Calorie Tracker App – Branch Protection Guide

## 1. Purpose
This document explains why branch protection matters for the Calorie Tracker App and how it supports safer collaboration, automated verification, and controlled releases.

## 2. Why Branch Protection Matters
Branch protection is a GitHub rule set that limits how changes can reach a protected branch such as `main`. Instead of allowing anyone to push directly, the team uses pull requests, review checks, and automated test results to decide whether a change is safe to merge.

This matters because it:
- prevents unreviewed code from reaching the primary branch,
- ensures automated tests pass before merge,
- makes quality control visible in the repository history,
- and supports a predictable release process.

## 3. Required Protection Rules
For this project, the `main` branch should use the following settings.

| Rule | Recommended Setting | Why It Helps |
|---|---|---|
| Require a pull request before merging | Enabled | Ensures changes are reviewed and discussed before they are merged. |
| Require at least one approval | Enabled | Prevents self-merging and adds human review to automated checks. |
| Require status checks to pass | Enabled | Blocks merges when linting, type checking, tests, or build steps fail. |
| Restrict direct pushes | Enabled | Forces all changes through the pull request workflow. |
| Dismiss stale approvals on new commits | Recommended | Prevents old approvals from being reused after code changes. |
| Require conversations to be resolved | Recommended | Encourages cleanup of review comments before merge. |

## 4. How to Configure It in GitHub
1. Open the repository in GitHub.
2. Go to **Settings**.
3. Select **Branches**.
4. Under **Branch protection rules**, choose **Add rule**.
5. Enter `main` as the branch name pattern.
6. Enable the protection rules listed above.
7. Save the rule.
8. Capture a screenshot showing the enabled settings.

## 5. Which Status Checks Should Be Required
The CI workflow should expose named checks that GitHub can require before merge. For this project, the recommended checks are:
- `lint`
- `typecheck`
- `test`
- `build`

If the workflow is split into multiple jobs, require the final job that depends on the earlier jobs. The important principle is that a failing verification step must block the merge.

## 6. What Happens When the Rules Are Active
With branch protection enabled:
- a developer cannot push directly to `main`,
- a pull request must be opened instead,
- the PR must pass the required checks,
- at least one review must approve the change,
- and only then can the merge proceed.

This reduces accidental breakage and makes every change visible in review history.

## 7. Why This Is Useful for Future Work
Branch protection is not only for this project milestone. It also prepares the repository for future use cases such as:
- team collaboration,
- feature branches with review gates,
- release approval workflows,
- dependency updates,
- automated security checks,
- and deployment pipelines that require trusted merges.

Once the team grows, these rules help maintain code quality without relying on manual discipline alone.

## 8. Screenshot Checklist
When you capture proof for the repository, make sure the screenshot shows:
- the branch name `main`,
- the enabled review requirement,
- the required status checks,
- the direct-push restriction,
- and any optional protections enabled.

## 9. Short Summary
Branch protection turns `main` into a controlled release branch. It works together with CI so that code quality checks, human review, and merge control all reinforce one another.

