
class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle     = page.locator('.title');
    this.productItems  = page.locator('.inventory_item');
    this.productNames  = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown  = page.locator('[data-test="product-sort-container"]');
    this.cartBadge     = page.locator('.shopping_cart_badge');
    this.cartIcon      = page.locator('.shopping_cart_link');
    this.burgerMenu    = page.locator('#react-burger-menu-btn');
    this.logoutLink    = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    await product.locator('button').click();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent());
    }
    return 0;
  }

  async sortProducts(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductPrices() {
    const priceElements = await this.productPrices.all();
    const prices = [];
    for (const el of priceElements) {
      const text = await el.textContent();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = { ProductsPage };
