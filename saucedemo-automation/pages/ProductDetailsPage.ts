import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  private readonly page: Page;
  private readonly addToCartBtn: Locator;
  private readonly backBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator('button[data-test*="add-to-cart"]');
    this.backBtn = page.locator('#back-to-products');
  }

  // ✅ Actions
  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async goBack(): Promise<void> {
    await this.backBtn.click();
  }

  // ✅ Validations
  async verifyAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartBtn).toBeVisible();
  }
}
