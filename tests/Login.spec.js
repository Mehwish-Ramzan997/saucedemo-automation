import { test, expect } from '@playwright/test';

test('login test case on Demoblaze website', async ({ page }) => {
  test.setTimeout(60000); // ⏱️ 6 seconds timeout for this test

  await page.goto('https://demoblaze.com/');
  await expect(page.locator('#login2')).toBeVisible();
  await page.locator('#login2').click();
  const loginModal = page.locator('#logInModal'); 
  await expect(loginModal).toBeVisible();
  await loginModal.locator('#loginusername').fill('Admin888');
  await loginModal.locator('#loginpassword').fill('12345678');
  await loginModal.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#nameofuser')).toContainText('Welcome Admin888');
});
