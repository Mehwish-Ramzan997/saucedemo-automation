import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,  
  reporter: [['allure-playwright'], ['html']],
  use: {
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
