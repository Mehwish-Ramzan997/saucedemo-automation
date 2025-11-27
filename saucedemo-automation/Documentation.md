# SauceDemo Automation Documentation

## Test Cases
1. Login Success: Enter valid creds, verify redirect.
2. Login Failure: Enter invalid, verify error.
3. Add to Cart: Add product, check count.
4. Remove Product: Add then remove, verify.
5. Verify Cart Count: Add multiple, check badge.

## Acceptance Criteria
- Login success: URL changes to /inventory.
- Etc.

## Framework Explanation
POM: Each page has class with locators/actions/validations.

## How to Run
- Install: npm install
- Run Tests: npx playwright test
- Allure: allure open

## Allure Screenshots
[Attach images here]

## Summary
Framework complete with 5 tests, POM, Allure.