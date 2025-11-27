import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let productPage: ProductDetailsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // Initialize Page Objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);

    // Go to login page and login
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify inventory page loaded
    await inventoryPage.verifyInventoryPageLoaded();
  });

  // ✅ Test 1: Open Cart
  test('Open cart and verify cart page', async () => {
    await inventoryPage.clickItem('Sauce Labs Backpack');
    await productPage.addToCart();
    await productPage.goBack();

    await inventoryPage.openCart();

    // Verify cart page loaded
    await cartPage.verifyCartPageLoaded();
  });

  // ✅ Test 2: Click Checkout from Cart
  test('Click checkout button from cart', async () => {
    await inventoryPage.clickItem('Sauce Labs Backpack');
    await productPage.addToCart();
    await productPage.goBack();

    await inventoryPage.openCart();

    // Click checkout
    await cartPage.clickCheckout();

    // ✅ Use new helper method
    await cartPage.verifyCheckoutPage();
  });
});
