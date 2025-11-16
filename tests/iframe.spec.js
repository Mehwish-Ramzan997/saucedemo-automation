import { test, expect } from '@playwright/test';

test('Enter text in Frame 2 on UI.Vision Demo Website', async ({ page }) => {

  await page.goto('https://ui.vision/demo/webtest/frames/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  try {
    console.log(' Navigated to UI.Vision demo site.');

  
    const frame2 = page.frameLocator('frame[src="frame_2.html"]');

    
    const inputField = frame2.locator('input[name="mytext2"]');

    if (await inputField.isVisible()) {
      await inputField.fill('Automation Testing Course');
      console.log(' Successfully filled text in Frame 2.');
    } else {
      console.log(' Input field inside Frame 2 is not visible.');
    }

    await expect(inputField).toHaveValue('Automation Testing Course');
    console.log(' Verified: Correct text entered in Frame 2.');

  } catch (error) {
    console.error(' Error while interacting with Frame 2:', error);
  }

  await page.waitForTimeout(3000);

  console.log(' Test completed successfully.');
});
