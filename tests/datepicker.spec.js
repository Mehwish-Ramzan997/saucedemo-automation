import { test, expect } from '@playwright/test';

test('Verify present date in Datepicker1 field', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const year = '2025';
  const month = 'October';
  const date = '26';

 
  await page.click('#datepicker');

  
  const datePicker = page.locator('.ui-datepicker');
  await expect(datePicker).toBeVisible();

  
  for (let i = 0; i < 12; i++) { 
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();

    if (currentMonth.trim() === month && currentYear.trim() === year) {
      break;
    }

    
    const nextButton = datePicker.getByRole('link', { name: 'Next' });
    await nextButton.click();
    await page.waitForTimeout(500); 
  }

  
  const allDates = await page.$$('.ui-state-default');
  for (const dt of allDates) {
    const text = await dt.textContent();
    if (text === date) {
      await dt.click();
      break;
    }
  }

  
  await expect(page.locator('#datepicker')).toHaveValue('10/26/2025');

  console.log('Date 10/26/2025 selected and verified successfully!');
});
