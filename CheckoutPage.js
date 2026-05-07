
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.finishButton    = page.locator('[data-test="finish"]');
    this.successHeader   = page.locator('.complete-header');
    this.backHomeButton  = page.locator('[data-test="back-to-products"]');
    this.totalLabel      = page.locator('.summary_total_label');
  }

  async fillInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async isOrderSuccessful() {
    return await this.successHeader.isVisible();
  }

  async getSuccessMessage() {
    return await this.successHeader.textContent();
  }
}

module.exports = { CheckoutPage };
