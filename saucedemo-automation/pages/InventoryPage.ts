import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  // ✅ Dynamic locator for item title
  itemTitle(name: string): Locator {
    return this.page.locator('.inventory_item_name', { hasText: name });
  }

  // ✅ Actions
  async clickItem(name: string): Promise<void> {
    await this.itemTitle(name).click();
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  // ✅ Validations
  async verifyInventoryPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory.html/);
  }
}
