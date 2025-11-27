import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory Page Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Navigate and login
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Ensure inventory page is loaded
    await inventoryPage.verifyInventoryPageLoaded();
  });

  // ✅ Test 1: Click on a product
  test('Click a product item', async ({ page }) => {
    await inventoryPage.clickItem('Sauce Labs Backpack');
    // Add verification if needed, e.g., URL change or page element visible
    await expect(page).toHaveURL(/inventory-item.html/);
  });

  // ✅ Test 2: Open Cart
  test('Open cart page', async ({ page }) => {
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart.html/);
  });

  // ✅ Test 3: Verify Inventory Page Loaded
  test('Verify inventory page loaded', async ({ page }) => {
    await inventoryPage.verifyInventoryPageLoaded();
  });
});
