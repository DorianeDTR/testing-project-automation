import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class CartPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get cartLink() {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  get productRows() {
    return this.page.locator('#cart_info_table tr[id*="product-"]');
  }

  get quantityInput() {
    return this.page.locator('input[name="quantity"]');
  }

  get proceedToCheckoutButton() {
    return this.page.getByText('Proceed To Checkout');
  }

  get continueShoppingButton() {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get viewCartButton() {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  get deleteButton() {
    return this.page.locator('a.cart_quantity_delete');
  }

  get emptyCartMessage() {
    return this.page.getByText('Cart is empty!');
  }

  get totalPrice() {
    return this.page.locator('#cart_info .cart_total_price');
  }

  get cartContainer() {
    return this.page.locator('#cart_items');
  }

  get addedToCartModal() {
    return this.page.locator('.modal-content');
  }

  get modalContinueShoppingButton() {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get modalViewCartButton() {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  get modalCloseButton() {
    return this.page.locator('.modal-header .close-modal');
  }

  // Actions
  async goTo(): Promise<void> {
    await this.page.goto('/view_cart');
    await this.navigateWithConsent('https://automationexercise.com/view_cart');
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.cartContainer).toBeVisible();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async handleAddedToCartModal(): Promise<void> {
    await this.ensurePageReady();
    await this.addedToCartModal.waitFor({ state: 'visible', timeout: 5000 });
  }

  async clickContinueShoppingInModal(): Promise<void> {
    await this.ensurePageReady();
    await this.modalContinueShoppingButton.click({ force: true });
  }

  async clickViewCartInModal(): Promise<void> {
    await this.ensurePageReady();
    await this.modalViewCartButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
    await this.productRows.first().waitFor({ state: 'visible', timeout: 5000 });
  }

  async closeAddedToCartModal(): Promise<void> {
    await this.ensurePageReady();
    await this.modalCloseButton.click();
  }

  async isAddedToCartModalVisible(): Promise<boolean> {
    return await this.addedToCartModal.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productRows.count();
  }

  async getProductPriceById(productId: string): Promise<string> {
    const productRow = this.page.locator(`tr#product-${productId}`);
    const price = await productRow.locator('.cart_price').textContent();
    return price?.trim() || '';
  }

  async getProductPriceByName(productName: string): Promise<string> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    const price = await productRow.locator('.cart_price').textContent();
    return price?.trim() || '';
  }

  async getProductPriceByProductId(productId: string): Promise<string> {
    const productRow = this.page.locator(`tr#product-${productId}`);
    const price = await productRow.locator('.cart_price').textContent();
    return price?.trim() || '';
  }

  async getProductQuantity(name: string): Promise<string> {
    const row = this.page.locator('tr', { hasText: name });
    
    const quantityLocator = row.locator('td.cart_quantity button.disabled'); 
    
    await expect(quantityLocator).not.toHaveText(''); 
    
    return await quantityLocator.innerText();
  }

  async getProductQuantityByName(productName: string): Promise<string> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    const quantityInput = await productRow.locator('td.cart_quantity input').inputValue().catch(() => '');
    if (quantityInput) {
      return quantityInput;
    }
    const quantityText = await productRow.locator('td.cart_quantity').textContent().catch(() => '');
    return quantityText?.trim() || '';
  }

  async updateProductQuantity(productName: string, quantity: string): Promise<void> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    await productRow.locator('input[name="quantity"]').fill(quantity);
  }

  async removeProduct(productName: string): Promise<void> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    await productRow.locator('a.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.ensurePageReady();
    await this.proceedToCheckoutButton.click();
    await this.navigateWithConsent('https://automationexercise.com/checkout');
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const productRow = this.page.locator(`#cart_info_table tr:has-text("${productName}")`);
    return await productRow.isVisible();
  }

  async clearCart(): Promise<void> {
    const productCount = await this.getProductCount();
    for (let i = 0; i < productCount; i++) {
      await this.deleteButton.first().click();
    }
  }
}
