import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  private readonly page: Page;
  private readonly finishBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishBtn = page.locator('#finish');
  }

  // ✅ Actions
  async clickFinish(): Promise<void> {
    await this.finishBtn.click();
  }

  // ✅ Validations
  async verifyOnOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }
}
