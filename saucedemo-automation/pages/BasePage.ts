import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;  // Protected taake sub-classes access kar sakein

    constructor(page: Page) {
        this.page = page;
    }

 async waitForPageLoad(): Promise<void> {
  await this.page.locator("#user-name").waitFor({ timeout: 15000 });
}


    // Common utility: Screenshot lo (optional, tests me use karo)
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    // Aur utilities add kar sakte ho, jaise wait for element
    async waitForElement(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }
}
