
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems       = page.locator('.cart_item');
    this.cartItemNames   = page.locator('.inventory_item_name');
    this.checkoutButton  = page.locator('[data-test="checkout"]');
    this.continueShopBtn = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async removeItem(productName) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('[data-test^="remove"]').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShopBtn.click();
  }
}

module.exports = { CartPage };
