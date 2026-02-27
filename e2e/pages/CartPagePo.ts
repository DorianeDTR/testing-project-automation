import { Page, Locator } from '@playwright/test';

export class CartPagePo {
  private page: Page;
  private cartLink: Locator;
  private productRows: Locator;
  private quantityInput: Locator;
  private proceedToCheckoutButton: Locator;
  private continueShoppingButton: Locator;
  private deleteButton: Locator;
  private emptyCartMessage: Locator;
  private totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.productRows = page.locator('#cart_info_table tr[id*="product-"]');
    this.quantityInput = page.locator('input[name="quantity"]');
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed To Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.deleteButton = page.locator('a.cart_quantity_delete');
    this.emptyCartMessage = page.getByText('Cart is empty!');
    this.totalPrice = page.locator('#cart_info_table .cart_total_price');
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getProductCount(): Promise<number> {
    return await this.productRows.count();
  }

  async getProductPrice(productName: string): Promise<string> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    return await productRow.locator('.cart_price').textContent() || '';
  }

  async getProductQuantity(productName: string): Promise<string> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    return await productRow.locator('input[name="quantity"]').inputValue() || '';
  }

  async updateQuantity(productName: string, quantity: string): Promise<void> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    await productRow.locator('input[name="quantity"]').fill(quantity);
  }

  async removeProduct(productName: string): Promise<void> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    await productRow.locator('a.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async getTotalPrice(): Promise<string> {
    return await this.totalPrice.textContent() || '';
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    return await productRow.isVisible();
  }
}
