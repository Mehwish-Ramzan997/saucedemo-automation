import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Checkout Flow Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let productPage: ProductDetailsPage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInfoPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyInventoryPageLoaded();
  });

  // ✅ Test 1: Checkout with missing info
  test('Checkout with missing info shows error', async () => {
    await inventoryPage.clickItem('Sauce Labs Backpack');
    await productPage.addToCart();
    await productPage.goBack();

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await checkoutInfoPage.fillInformation('', 'Doe', ''); // Missing first name & zip
    await checkoutInfoPage.clickContinue();

    const errorMsg = checkoutInfoPage.getErrorMessage();
    await expect(errorMsg).toBeVisible();
    await expect(await checkoutInfoPage.getErrorText()).toContain('Error'); // optional text check
  });

  // ✅ Test 2: Successful checkout flow
  test('Successful checkout', async () => {
    await inventoryPage.clickItem('Sauce Labs Backpack');
    await productPage.addToCart();
    await productPage.goBack();

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    // Fill correct info
    await checkoutInfoPage.completeCheckoutInfo('John', 'Doe', '12345');

    // Overview page validations
    await checkoutOverviewPage.verifyOnOverviewPage();
    await checkoutOverviewPage.clickFinish();

    // Complete page validation
    await checkoutCompletePage.verifyOrderSuccess();
  });
});
