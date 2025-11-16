import { test, expect } from '@playwright/test';

test('handle dropdown on website', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const sortedlistdropdown = page.locator('select[name="animals"]');
  console.log('I am selecting values Cat, Cheetah, Deer, Dog...');

  await sortedlistdropdown.selectOption([
    { label: 'Cat' },
    { label: 'Cheetah' },
    { label: 'Deer' },
    { label: 'Dog' }
  ]);

  
  const optionLocator = page.locator('select[name="animals"] option');
  const count = await optionLocator.count();
  console.log("Number of options in dropdown: " + count);
  await expect(optionLocator).toHaveCount(10); 

  const optionArray = await page.$$('select[name="animals"] option');
  console.log('Number of animals: ' + optionArray.length);
  await expect(optionArray.length).toBe(10);

  console.log('All selected values are correct');
  console.log('Test case passed: Dropdown options count is 10');

  
  await expect(optionLocator).toContainText(['Deer']);   
  await expect(optionLocator).not.toContainText(['Turtle']); 
});
