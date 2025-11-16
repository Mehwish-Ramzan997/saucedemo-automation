import { test, expect } from '@playwright/test';

test('handle all pagination table pages and select checkboxes', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForLoadState('domcontentloaded');

  const paginationHeader = page.getByRole('heading', { name: 'Pagination Web Table' });
  await paginationHeader.scrollIntoViewIfNeeded();
  await expect(paginationHeader).toBeVisible();

  const table = paginationHeader.locator('xpath=following-sibling::div[1]//table');
  await expect(table).toBeVisible();

  
  async function selectAllCheckboxesOnPage() {
    const checkboxes = table.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    console.log(`Found ${count} checkboxes on this page.`);

    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      try {
        await checkbox.waitFor({ state: 'visible', timeout: 3000 });
        await checkbox.check({ force: true }); 
      } catch (err) {
        console.warn(`Skipping checkbox #${i + 1}: ${err.message}`);
      }
    }
  }

  const totalPages = await page.locator('xpath=//h2[text()="Pagination Web Table"]/following::ul[1]/li/a').count();

  for (let i = 0; i < totalPages; i++) {
    console.log(`\n--- Testing Page ${i + 1} ---`);

    const pageLink = page.locator('xpath=//h2[text()="Pagination Web Table"]/following::ul[1]/li/a').nth(i);
    await pageLink.click();

    
    await table.locator('input[type="checkbox"]').first().waitFor({ state: 'visible', timeout: 5000 });

    await selectAllCheckboxesOnPage();

    const checkedCount = await table.locator('input[type="checkbox"]:checked').count();
    expect(checkedCount).toBeGreaterThan(0);

    console.log(` Checked boxes on Page ${i + 1}: ${checkedCount}`);
  }

  console.log('\n All pagination pages tested successfully.');
});
