import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
  }

  // ✅ Actions
  async clickCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }

  // ✅ Validations
  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart.html/);
  }

  // ✅ New: Verify Checkout Page
  async verifyCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }
}
