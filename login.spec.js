// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { USERS, MESSAGES } = require('../utils/testData');

test.describe('🔐 Login Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('✅ Positive Tests', () => {

    test('TC_LOGIN_001 - Standard user login successfully', async ({ page }) => {
      await loginPage.login(USERS.standard.username, USERS.standard.password);
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator('.title')).toHaveText('Products');
    });

    test('TC_LOGIN_002 - Page title is correct', async ({ page }) => {
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    test('TC_LOGIN_003 - Login button is visible and enabled', async () => {
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    });

    test('TC_LOGIN_004 - Performance glitch user can login', async ({ page }) => {
      await loginPage.login(USERS.performance.username, USERS.performance.password);
      await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
    });

  });

  test.describe('❌ Negative Tests', () => {

    test('TC_LOGIN_005 - Locked out user sees error', async () => {
      await loginPage.login(USERS.locked.username, USERS.locked.password);
      const error = await loginPage.getErrorMessage();
      expect(error).toContain(MESSAGES.lockedUserError);
    });

    test('TC_LOGIN_006 - Wrong password shows error', async () => {
      await loginPage.login(USERS.standard.username, 'wrongpassword');
      expect(await loginPage.isErrorVisible()).toBeTruthy();
    });

    test('TC_LOGIN_007 - Empty username shows error', async () => {
      await loginPage.login('', USERS.standard.password);
      const error = await loginPage.getErrorMessage();
      expect(error).toContain(MESSAGES.emptyUsernameError);
    });

    test('TC_LOGIN_008 - Empty password shows error', async () => {
      await loginPage.login(USERS.standard.username, '');
      const error = await loginPage.getErrorMessage();
      expect(error).toContain(MESSAGES.emptyPasswordError);
    });

    test('TC_LOGIN_009 - Both fields empty shows error', async () => {
      await loginPage.login('', '');
      expect(await loginPage.isErrorVisible()).toBeTruthy();
    });

    test('TC_LOGIN_010 - Invalid username shows error', async () => {
      await loginPage.login('fake_user', USERS.standard.password);
      expect(await loginPage.isErrorVisible()).toBeTruthy();
    });

  });

  test.describe('🎨 UI Tests', () => {

    test('TC_LOGIN_011 - Username field is visible', async () => {
      await expect(loginPage.usernameInput).toBeVisible();
    });

    test('TC_LOGIN_012 - Password field masks input', async () => {
      const type = await loginPage.passwordInput.getAttribute('type');
      expect(type).toBe('password');
    });

    test('TC_LOGIN_013 - User can type in username field', async () => {
      await loginPage.usernameInput.fill('test_user');
      await expect(loginPage.usernameInput).toHaveValue('test_user');
    });

  });

});
