import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'About us' }).click();
  await page.getByText('No compatible source was').click();
  await page.locator('#videoModal').getByText('Close', { exact: true }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
});