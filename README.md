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

## QA Report

### Scenarios covered

- **UI happy path:** Log in, add two products, verify the cart, complete checkout, and confirm the order.
- **Exploratory checks:** Login, cart operations, checkout form, product details and sorting. Empty-cart checks and removing items from the cart passed. Order confirmation checks were blocked when checkout could not be completed.

### Bugs found

#### 1. Inventory: Unable to remove certain items

- **Description:** Removing some items from the inventory page does not work.
- **Steps to reproduce:** Log in, select an affected item, and attempt to remove it from the inventory page.
- **Expected vs. actual:** Eligible items can be removed; some items remain and cannot be removed.
- **Severity:** Medium — inventory selection functionality is partially affected.

#### 2. Inventory: Unable to add certain items to the cart

- **Description:** Some products cannot be added to the cart.
- **Steps to reproduce:** Log in, select an affected item, and click **Add to Cart**.
- **Expected vs. actual:** The item is added and the UI updates; some items are not added.
- **Severity:** High — core shopping functionality is affected.

#### 3. Inventory: Duplicate product images and invalid names

- **Description:** Product images are duplicated, and some product names are invalid.
- **Steps to reproduce:** Log in and compare the images and names of multiple products with their expected details.
- **Expected vs. actual:** Each product shows its correct image and name; the same image appears for multiple products and some names are incorrect.
- **Severity:** High — inaccurate product information may mislead shoppers.

#### 4. Inventory: Product sorting does not work

- **Description:** Selecting a sort option does not order products as expected.
- **Steps to reproduce:** Log in, choose an available sorting option, and check the product order. Repeat with other options.
- **Expected vs. actual:** Products are sorted by the selected name or price order; the displayed order does not update correctly.
- **Severity:** Medium — product discovery is affected.

#### 5. Cart: Product information is incorrect

- **Description:** Some product details are missing or incorrect in the cart.
- **Steps to reproduce:** Log in, add multiple products, open the cart, and review each item.
- **Expected vs. actual:** Each item shows accurate details such as name, image, and price; some details are missing or incorrect.
- **Severity:** High — shoppers may not be able to verify their selections.

#### 6. Checkout: Last name field does not accept input

- **Description:** The last name field does not accept user input.
- **Steps to reproduce:** Log in, add a product, open the cart, choose **Checkout**, and enter a last name.
- **Expected vs. actual:** The field accepts valid text so the user can complete the form; it does not accept input.
- **Severity:** High — the required checkout form cannot be completed.
