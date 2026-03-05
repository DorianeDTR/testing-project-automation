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

  // get viewCartButton() {
  //   return this.page.getByRole('link', { name: 'View Cart' });
  // }

  get allProductsHeader() {
    return this.page.getByText('All Products');
  }

  get productsContainer() {
    return this.page.locator('.features_items');
  }

  // Navigation method
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/products');
  }

  // Page verification method
  async shouldBeDisplayed(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.allProductsHeader).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  // High-level action methods
  async navigateToProducts(): Promise<void> {
    await this.productsButton.click();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.ensurePageReady();
    // Target specific product by data-product-id and use force click
    const firstProductAddToCart = this.page.locator('.productinfo >> a[data-product-id="3"]');
    await firstProductAddToCart.click({ force: true });
  }

  async addSecondProductToCart(): Promise<void> {
    await this.ensurePageReady();
    // Target specific product by data-product-id and use force click
    const secondProductAddToCart = this.page.locator('.productinfo >> a[data-product-id="4"]');
    await secondProductAddToCart.click({ force: true });
  }

  // async viewCart(): Promise<void> {
  //   await this.ensurePageReady();
  //   await this.viewCartButton.click({ force: true });
  // }

  async isProductsListVisible(): Promise<boolean> {
    return await this.productsList.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async addProductToCart(productIndex: number): Promise<void> {
    await this.ensurePageReady();
    const product = this.productItems.nth(productIndex);
    await product.locator('a[data-product-id]').click({ force: true });
  }
}
