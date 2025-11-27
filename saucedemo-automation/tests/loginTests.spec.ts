import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  // Navigate to base URL defined in config
  await page.goto('/');
});

test('Login Success', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Perform login
  await loginPage.login('standard_user', 'secret_sauce');

  // Validate inventory page loaded
  await inventoryPage.verifyInventoryPageLoaded();
});

test('Login Failure', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Enter invalid credentials
  await loginPage.enterCredentials('invalid_user', 'wrong_pass');
  await loginPage.clickLogin();

  // Validate error message
  await loginPage.verifyLoginError();
});
