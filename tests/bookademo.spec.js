const { test, expect, chromium } = require("@playwright/test");

test.describe("Book Free Demo using Manual Fixtures", () => {

  let browser;
  let context;
  let page;

  
  test.setTimeout(60000);

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async () => {
    await page.goto("https://www.orangehrm.com/en/book-a-free-demo", { waitUntil: "domcontentloaded" });
  });

  test("Fill Demo Form", async () => {

   await page.getByPlaceholder('Full Name').fill("Mehwish Ramzan");
  await page.getByPlaceholder('Email').fill("mehwish.test@example.com");
  await page.getByPlaceholder('Phone Number').fill("03001234567");

  await page.getByRole('combobox', { name: 'Country' }).selectOption("Pakistan");
  await page.getByPlaceholder('Company Name').fill("QA Tester");
  await page.getByPlaceholder('Job title').fill("QA Engineer");

    await page.selectOption('select[name="Country"]', { label: "Pakistan" });
    await page.selectOption('select[name="NoOfEmployees"]', "51 - 200");


    console.log(" 'I am not a robot' manually...");
    await page.waitForTimeout(7000);

  await page.click('//input[@id="Form_getForm_action_submitForm"]');

    await expect(page).toHaveURL(/thank|demo/i);
  });

  test.afterAll(async () => {
    await browser.close();
  });

});
