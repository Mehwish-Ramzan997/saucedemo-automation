import { test,expect } from '@playwright/test';
import { DiffieHellmanGroup } from 'crypto';
    test("Add to cart product on demoblaze website", async ({page}) => { 

    await page.goto('http://demoblaze.com/');
    await page.click('a: has-text("samsung galaxy s6")');
    await page.click('a:has-test("Add to cart")');

    page.on('dialog', async dialog =>{
        await expect(dialog.message()).toContain('Product added');
        await dialog.accept();
    });
    await page.click('a:has-test("cart")');
      await expect(page.locator('td:has-text("Samsung galaxy s6")')).toBeVisible();
});
