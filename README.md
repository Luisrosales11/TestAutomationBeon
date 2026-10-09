# Cypress Test Automation

## Prerequisites

- Node.js and npm
- A supported browser such as Chrome

## Installation

From the project root, install dependencies:

```bash
npm install
```

## Execution

Open Cypress in interactive mode:

```bash
npx cypress open
```

Run all tests headlessly:

```bash
npx cypress run
```

### UI vs. API

Run the web checkout test:

```bash
npx cypress run --spec "cypress/e2e/web/e2eEcommerce.cy.js"
```

Run the booking API tests:

```bash
npx cypress run --spec "cypress/e2e/api/booking-lifecycle.cy.js"
```

### Headless vs. UI

- **Headless:** `npx cypress run` runs tests from the command line.
- **UI:** `npx cypress open` launches Cypress, where you can choose a spec and watch it run.

## Framework architecture

- `cypress/e2e/web` and `cypress/e2e/api` contain the test specs.
- `cypress/support/pages` contains reusable page objects and API request methods.
- `cypress/fixtures/web` and `cypress/fixtures/api` hold test data.
- `cypress.config.js` configures Cypress and the web app base URL.
