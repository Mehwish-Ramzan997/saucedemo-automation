import { Page, Locator } from '@playwright/test';

export class CheckoutInfoPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly zip: Locator;
  private readonly continueBtn: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zip = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.errorMsg = page.locator('[data-test="error"]'); // Add error locator here
  }

  // ✅ Actions
  async fillInformation(first: string, last: string, postal: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.zip.fill(postal);
  }

  async clickContinue(): Promise<void> {
    await this.continueBtn.click();
  }

  // ✅ Combined Action
  async completeCheckoutInfo(first: string, last: string, postal: string): Promise<void> {
    await this.fillInformation(first, last, postal);
    await this.clickContinue();
  }

  // ✅ Get error locator
  getErrorMessage(): Locator {
    return this.errorMsg;
  }

  // ✅ Optional: get text directly
  async getErrorText(): Promise<string> {
    const text = await this.errorMsg.textContent();
    return text || '';
  }
}
