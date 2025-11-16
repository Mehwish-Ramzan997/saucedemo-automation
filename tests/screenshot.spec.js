import { test, expect } from '@playwright/test';

test('Page Screenshot', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.screenshot({path: 'tests/screenshots/'+Date.now()+'HomePage.png'})

});

test('Full page Screenshot', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.screenshot({path: 'tests/screenshots/'+Date.now()+'FullPage.png',fullPage:true})

});

test.only('Page element Screenshot', async ({ page }) => {
  
  await page.goto('https://altaseer.pk/product-category/perfume/', {
    waitUntil: 'domcontentloaded'
  });
 
  await page.waitForSelector('#main img', { state: 'visible', timeout: 60000 });
  const firstProduct = page.locator('#main ul li:first-child img');
  await firstProduct.screenshot({
    path: `tests/screenshots/${Date.now()}_Perfume.png`
  });

  console.log(' Screenshot saved successfully!');
});
