
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { USERS, PRODUCTS, CHECKOUT_INFO, MESSAGES } = require('../utils/testData');

test.describe('Checkout Tests', () => {

  let loginPage, productsPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await productsPage.addProductToCart(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test.describe('Step 1 - Customer Info', () => {

    test('TC_CHK_001 - Lands on checkout step one page', async ({ page }) => {
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('TC_CHK_002 - Empty first name shows error', async () => {
      const d = CHECKOUT_INFO.invalid.noFirstName;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      const error = await checkoutPage.getErrorMessage();
      expect(error).toContain(MESSAGES.checkoutFirstName);
    });

    test('TC_CHK_003 - Empty last name shows error', async () => {
      const d = CHECKOUT_INFO.invalid.noLastName;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      const error = await checkoutPage.getErrorMessage();
      expect(error).toContain(MESSAGES.checkoutLastName);
    });

    test('TC_CHK_004 - Empty postal code shows error', async () => {
      const d = CHECKOUT_INFO.invalid.noZip;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      const error = await checkoutPage.getErrorMessage();
      expect(error).toContain(MESSAGES.checkoutPostalCode);
    });

    test('TC_CHK_005 - Valid info proceeds to step 2', async ({ page }) => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      await expect(page).toHaveURL(/checkout-step-two/);
    });

  });

  test.describe('Step 2 - Order Overview', () => {

    test.beforeEach(async () => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
    });

    test('TC_CHK_006 - Overview shows ordered item', async ({ page }) => {
      const itemName = await page.locator('.inventory_item_name').textContent();
      expect(itemName).toContain(PRODUCTS.backpack);
    });

    test('TC_CHK_007 - Total price is displayed', async ({ page }) => {
      await expect(page.locator('.summary_total_label')).toBeVisible();
    });

    test('TC_CHK_008 - Total equals subtotal plus tax', async ({ page }) => {
      const subtotalText = await page.locator('.summary_subtotal_label').textContent();
      const taxText = await page.locator('.summary_tax_label').textContent();
      const totalText = await page.locator('.summary_total_label').textContent();
      const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
      const tax = parseFloat(taxText.replace('Tax: $', ''));
      const total = parseFloat(totalText.replace('Total: $', ''));
      expect(total).toBeCloseTo(subtotal + tax, 2);
    });

  });

  test.describe('Step 3 - Order Complete', () => {

    test('TC_CHK_009 - Complete order shows success message', async () => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      await checkoutPage.completeOrder();
      expect(await checkoutPage.isOrderSuccessful()).toBeTruthy();
    });

    test('TC_CHK_010 - Success page shows Thank You', async () => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      await checkoutPage.completeOrder();
      const msg = await checkoutPage.getSuccessMessage();
      expect(msg).toContain(MESSAGES.orderSuccess);
    });

    test('TC_CHK_011 - Back Home button goes to products', async ({ page }) => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      await checkoutPage.completeOrder();
      await checkoutPage.backHomeButton.click();
      await expect(page).toHaveURL(/inventory/);
    });

    test('TC_CHK_012 - Cart is empty after order', async ({ page }) => {
      const d = CHECKOUT_INFO.valid;
      await checkoutPage.fillInfo(d.firstName, d.lastName, d.postalCode);
      await checkoutPage.completeOrder();
      await checkoutPage.backHomeButton.click();
      const badgeVisible = await page.locator('.shopping_cart_badge').isVisible();
      expect(badgeVisible).toBeFalsy();
    });

  });

});
