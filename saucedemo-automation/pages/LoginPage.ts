import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  // ✅ Actions
  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // ✅ Validations / Assertions
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.errorMsg).toBeVisible();
  }

  // ✅ Combined Action
  async login(username: string, password: string): Promise<void> {
    await this.enterCredentials(username, password);
    await this.clickLogin();
    await this.verifyLoginSuccess();
  }
}
