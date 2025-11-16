import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.locator('a:has-text("Home")');
    this.categories = page.locator('#cat');
    this.monitorsCategory = page.locator('a:has-text("Monitors")'); 
    this.productList = page.locator('.card');
    this.productTitle = page.locator('.card-title');
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
    this.cartLink = page.locator('#cartur');
    this.logoutLink = page.locator('#logout2');
    this.welcomeText = page.locator('#nameofuser');
  }

  async navigateToHome() {
    await this.homeLink.click();
    await this.page.waitForTimeout(1000);
  }

  async selectMonitorsCategory() {  
    await this.monitorsCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async selectProduct(productName) {
    await this.page.locator(`.card-title:has-text("${productName}")`).click();
    await this.page.waitForTimeout(1000);
  }

  async addToCart() {  
    
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    
    
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added.');
    await dialog.accept();
    await this.page.waitForTimeout(1000);  
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForTimeout(1000);
  }

  async logout() {
    await this.logoutLink.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyWelcomeMessage(username) {
    await expect(this.welcomeText).toHaveText(`Welcome ${username}`);
  }

  async verifyProductVisible(productName) {
    await expect(this.page.locator(`.card-title:has-text("${productName}")`)).toBeVisible();
  }

  
  async verifyProductInCart(productName) {
    const cartRow = this.page.locator(`tbody tr:has-text("${productName}")`).first();
    await expect(cartRow).toBeVisible();
  }
}
