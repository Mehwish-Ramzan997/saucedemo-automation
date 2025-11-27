# Saucedemo Automation

This repository contains the automation test scripts for the **SauceDemo** website using **Playwright** and **Allure Reports**.

## Project Structure
- `tests/` : All test scripts
- `pages/` : Page Object Models
- `playwright.config.ts` : Playwright configuration file
- `allure-results/` : Generated test results (should be ignored in git)
- `package.json` & `package-lock.json` : Node project dependencies

## Running Tests
```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/loginTests.spec.ts --project=chromium
