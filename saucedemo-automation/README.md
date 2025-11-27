# UI Automation Using Playwright (POM) – SauceDemo

## Assignment Summary
This project implements a UI

## Running Tests

To run the Playwright tests successfully, please ensure you execute the commands inside the `saucedemo-automation` directory because the Playwright configuration file (`playwright.config.js`) is located there.

### Run tests from within saucedemo-automation folder:

```bash
cd saucedemo-automation
npx playwright test --project=chromium
```

Alternatively, from the root directory, specify the config file path explicitly:

```bash
npx playwright test --config=saucedemo-automation/playwright.config.js --project=chromium
```

### Using npm script

You can also run tests with the npm script defined in `saucedemo-automation/package.json`:

```bash
cd saucedemo-automation
npm test
```

This will run the tests using the Chromium project as configured in the Playwright config.

Following these instructions will avoid the error:  
`Project(s) "chromium" not found. Available projects: ""`


### Tasks covered:
- Framework Development with Playwright and POM
- Allure Reporting enabled with screenshots on success and failure
- Automation of 5-10 functional test cases
- Clean, modular, and maintainable codebase
- Documentation and reporting
- GitHub repository readiness
