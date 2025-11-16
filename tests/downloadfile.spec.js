import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload a single file on TestAutomationPractice', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const fileUpload = page.locator('//input[@id="singleFileInput"]');

 
  const filePath = "C:\\Users\\Mehwish Ramzan\\Desktop\\QA Automation\\java\\function.js";

 
  await fileUpload.setInputFiles(filePath);

  console.log(' File uploaded successfully!');
});
