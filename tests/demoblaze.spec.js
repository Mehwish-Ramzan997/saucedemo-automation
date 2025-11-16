import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';   
import { LogoutPage } from '../pages/LogoutPage.js';  

const TEST_USERNAME = 'User222';
const TEST_PASSWORD = 'User222';

test.describe('DemoBlaze E-commerce with POM', () => {
  test('Complete Flow: Login → Add Product to Cart → Logout', async ({ page }) => {
    
    await page.goto('https://www.demoblaze.com/');
    await page.waitForLoadState('domcontentloaded');
    
    
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const logoutPage = new LogoutPage(page);

    
    console.log(' Logging in...');
    await loginPage.login(TEST_USERNAME, TEST_PASSWORD);
    console.log(' Login successful');

    
    console.log(' Selecting Monitors category...');
    await productPage.selectMonitorsCategory();
    console.log(' Monitors category selected');


    console.log('  Select product...');
    const productName = 'ASUS Full HD ';
    await productPage.selectProduct(productName);
    console.log(` Product "${productName}" selected`);

    
    console.log(' Add product to cart...');
    await productPage.addToCart();
    console.log(' Product added to cart');

    
    console.log(' Verifying product in cart...');
    await productPage.goToCart();
    await productPage.verifyProductInCart(productName);
    console.log(' Product verified in cart');

  
    console.log(' Logging out...');
    await logoutPage.logout();
    await logoutPage.verifyLogoutSuccess();
    console.log('Logout successful');
    console.log('Test completed');

    
  });
});
