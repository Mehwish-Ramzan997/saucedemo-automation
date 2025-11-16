import { test, expect } from '@playwright/test';


// ✅ Simple Alert
test('Handle Simple Alert', async ({ page }) => {
  await page.goto('https://letcode.in/alert', { waitUntil: 'domcontentloaded' });

  page.on('dialog', async dialog => {
    console.log('Alert message:', dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Simple Alert' }).click();

  await expect(page).toHaveURL(/alert/);
});


// ✅ Confirm Alert
test('Handle Confirm Alert', async ({ page }) => {
  await page.goto('https://letcode.in/alert', { waitUntil: 'domcontentloaded' });

  page.on('dialog', async dialog => {
    console.log('Confirm Alert Message:', dialog.message());
    await dialog.dismiss(); // You can use accept() also
  });

  await page.getByRole('button', { name: 'Confirm Alert' }).click();

  await expect(page).toHaveURL(/alert/);
});


// ✅ Prompt Alert — Your name prints on page ✅
test.only('Handle Prompt Alert', async ({ page }) => {
  await page.goto('https://letcode.in/alert', { waitUntil: 'domcontentloaded' });

  // Wait for dialog when button clicked
  const dialogPromise = page.waitForEvent('dialog');

  await page.getByRole('button', { name: 'Prompt Alert' }).click();

  const dialog = await dialogPromise;
  console.log('Prompt Alert Text:', dialog.message());
  await dialog.accept('Mehwish');  // Type into prompt

  // Verify printed name
  await expect(page.locator('#myName')).toHaveText('Mehwish');
});
