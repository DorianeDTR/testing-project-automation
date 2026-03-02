import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class ProductsPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators using getters
  get productsButton() {
    return this.page.getByRole('link', { name: 'Products' });
  }

  get productsList() {
    return this.page.locator('.features_items');
  }

  get productItems() {
    return this.page.locator('.productinfo');
  }

  get addToCartButton() {
    return this.page.getByRole('button', { name: 'Add to cart' });
  }

  get continueShoppingButton() {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get viewCartButton() {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  get allProductsHeader() {
    return this.page.getByText('All Products');
  }

  get productsContainer() {
    return this.page.locator('.features_items');
  }

  // Navigation method
  async goTo(): Promise<void> {
    await this.page.goto('/products');
  }

  // Page verification method
  async shouldBeDisplayed(): Promise<void> {
    await expect(this.allProductsHeader).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  // High-level action methods
  async navigateToProducts(): Promise<void> {
    await this.productsButton.click();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.productItems.first().hover();
    await this.addToCartButton.first().click();
  }

  async addSecondProductToCart(): Promise<void> {
    await this.productItems.nth(1).hover();
    await this.addToCartButton.nth(1).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async viewCart(): Promise<void> {
    await this.viewCartButton.click();
  }

  async isProductsListVisible(): Promise<boolean> {
    return await this.productsList.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async addProductToCart(productIndex: number): Promise<void> {
    const product = this.productItems.nth(productIndex);
    await product.hover();
    await product.locator('.add-to-cart').click();
  }
}
