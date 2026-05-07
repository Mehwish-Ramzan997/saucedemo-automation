
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { USERS, PRODUCTS } = require('../utils/testData');

test.describe('Products Page Tests', () => {

  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test.describe('Product Listing', () => {

    test('TC_PROD_1 - Should display 6 products', async () => {
      const count = await productsPage.getProductCount();
      expect(count).toBe(6);
    });

    test('TC_PROD_2 - Page title should be Products', async ({ page }) => {
      await expect(page.locator('.title')).toHaveText('Products');
    });

    test('TC_PROD_3 - All products have a name', async ({ page }) => {
      const names = await page.locator('.inventory_item_name').allTextContents();
      names.forEach(name => expect(name.length).toBeGreaterThan(0));
    });

    test('TC_PROD_4 - All products have a price', async ({ page }) => {
      const prices = await page.locator('.inventory_item_price').allTextContents();
      prices.forEach(price => expect(price).toMatch(/\$\d+\.\d{2}/));
    });

    test('TC_PROD_5 - All products have an image', async ({ page }) => {
      const images = await page.locator('.inventory_item img').all();
      for (const img of images) {
        await expect(img).toBeVisible();
      }
    });

    test('TC_PROD_6 - All products have Add to Cart button', async ({ page }) => {
      const buttons = await page.locator('.btn_inventory').allTextContents();
      buttons.forEach(btn => expect(btn).toContain('Add to cart'));
    });

  });

  test.describe('Sorting', () => {

    test('TC_SORT_1 - Sort A-Z works correctly', async ({ page }) => {
      await productsPage.sortProducts('az');
      const names = await page.locator('.inventory_item_name').allTextContents();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    });

    test('TC_SORT_2 - Sort Z-A works correctly', async ({ page }) => {
      await productsPage.sortProducts('za');
      const names = await page.locator('.inventory_item_name').allTextContents();
      const sorted = [...names].sort().reverse();
      expect(names).toEqual(sorted);
    });

    test('TC_SORT_3 - Sort Price Low to High works', async () => {
      await productsPage.sortProducts('lohi');
      const prices = await productsPage.getAllProductPrices();
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    });

    test('TC_SORT_4 - Sort Price High to Low works', async () => {
      await productsPage.sortProducts('hilo');
      const prices = await productsPage.getAllProductPrices();
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
      }
    });

  });

  test.describe('Add to Cart', () => {

    test('TC_CART_1 - Cart badge appears after adding product', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack);
      const count = await productsPage.getCartCount();
      expect(count).toBe(1);
    });

    test('TC_CART_2 - Cart count updates with multiple products', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack);
      await productsPage.addProductToCart(PRODUCTS.bikeLight);
      const count = await productsPage.getCartCount();
      expect(count).toBe(2);
    });

    test('TC_CART_3 - Button changes to Remove after adding', async ({ page }) => {
      await productsPage.addProductToCart(PRODUCTS.backpack);
      const item = page.locator('.inventory_item', { hasText: PRODUCTS.backpack });
      await expect(item.locator('button')).toHaveText('Remove');
    });

  });

  test.describe('Logout', () => {

    test('TC_LOGOUT_1 - User can logout successfully', async ({ page }) => {
      await productsPage.logout();
      await expect(page).toHaveURL('/');
      await expect(loginPage.loginButton).toBeVisible();
    });

  });

});
