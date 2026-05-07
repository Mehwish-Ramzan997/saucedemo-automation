
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { USERS, PRODUCTS } = require('../utils/testData');

test.describe('🛒 Cart Tests', () => {

  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_CART_001 - Cart is empty on fresh login', async () => {
    await productsPage.goToCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('TC_CART_002 - Added product appears in cart', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.goToCart();
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(PRODUCTS.backpack);
  });

  test('TC_CART_003 - Multiple products appear in cart', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.addProductToCart(PRODUCTS.bikeLight);
    await productsPage.goToCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('TC_CART_004 - Remove item from cart works', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('TC_CART_005 - Cart badge disappears after removing all items', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    const badgeVisible = await productsPage.cartBadge.isVisible();
    expect(badgeVisible).toBeFalsy();
  });

  test('TC_CART_006 - Remove one item keeps others', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.addProductToCart(PRODUCTS.bikeLight);
    await productsPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    const names = await cartPage.getCartItemNames();
    expect(names).not.toContain(PRODUCTS.backpack);
    expect(names).toContain(PRODUCTS.bikeLight);
  });

  test('TC_CART_007 - Continue Shopping goes back to products', async ({ page }) => {
    await productsPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_CART_008 - Checkout button navigates to checkout', async ({ page }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

});
