import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly page: Page;
  private readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successHeader = page.locator('.complete-header');
  }

  // ✅ Validations
  async verifyOrderSuccess(): Promise<void> {
    await expect(this.successHeader).toHaveText('Thank you for your order!');
  }
}
