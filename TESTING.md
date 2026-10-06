# Testing guide

## Commands

- `npm test` runs the Vitest suite once.
- `npm run test:watch` keeps Vitest running in watch mode.
- `npm run test:coverage` runs tests and creates a V8 coverage report.
- `npm run test:e2e` starts the Vite dev server and runs Playwright in Chromium.

## Component tests

The React Testing Library suite covers ChatMessageRenderer pending, streaming, completed, tool-result, and error states; LeadForm required validation and valid submission; LeadScoreCard score/tier/action/reasons; and the App loading plus mocked success/error flow. Tests use accessible roles, labels, and visible text rather than test IDs.

## API mocking

The app keeps scoring behind the `scoreLead` function, which represents the API boundary and is intentionally local and deterministic for this demo. Tests never call a real API. The success-flow test exercises the mocked result, while the error-flow test controls the async timer and verifies the error path can be tested without network access.

## Playwright test

The end-to-end test opens the Vite app, fills the company name, selects company size and buying intent, submits, confirms the loading state, and confirms the lead score result.

## CI

`.github/workflows/tests.yml` runs on pushes and pull requests. It checks out the project, installs Node dependencies, runs Vitest, installs Chromium with its system dependencies, and runs the Playwright test.
