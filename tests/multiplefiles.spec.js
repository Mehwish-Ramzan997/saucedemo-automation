import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload multiple files on TestAutomationPractice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  
  const fileUpload = page.locator("//input[@id='multipleFilesInput']");

  
  const files = [
    "C:\\Users\\Mehwish Ramzan\\Desktop\\QA Automation\\java\\function.js",
    "C:\\Users\\Mehwish Ramzan\\Desktop\\QA Automation\\java\\evenodd.js",
    "C:\\Users\\Mehwish Ramzan\\Desktop\\QA Automation\\java\\loop.js"
  ];

  
  await fileUpload.setInputFiles(files);

  console.log(' Multiple files uploaded successfully!');
});
import { test, expect } from '@playwright/test';

test('Verify present date in Datepicker1 field', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

  const year = '2025';
  const month = 'June';
  const date = '26';

  // Open the date picker
  await page.click('#datepicker');

  // Loop until correct month & year appear
  while (true) {
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();

    if (currentMonth.trim() === month && currentYear.trim() === year) {
      break;
    }
    // Corrected selector: capital 'N'
    await page.locator('[title="Next"]').click();
  }

  // Select the date
  const dates = await page.$$('.ui-state-default');
  for (const dt of dates) {
    if ((await dt.textContent()) === date) {
      await dt.click();
      break;
    }
  }

  // Verify selected date is in input
  await expect(page.locator('#datepicker')).toHaveValue('06/26/2025');
});

