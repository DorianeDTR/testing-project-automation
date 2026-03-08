import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class ProductsPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
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

  get allProductsHeader() {
    return this.page.getByText('All Products');
  }

  get productsContainer() {
    return this.page.locator('.features_items');
  }

  // Actions
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/products');
  }

  async shouldBeDisplayed(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.allProductsHeader).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  async navigateToProducts(): Promise<void> {
    await this.productsButton.click();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.ensurePageReady();
    const firstProductAddToCart = this.page.locator('.productinfo >> a[data-product-id="3"]');
    await firstProductAddToCart.click({ force: true });
  }

  async addSecondProductToCart(): Promise<void> {
    await this.ensurePageReady();
    const secondProductAddToCart = this.page.locator('.productinfo >> a[data-product-id="4"]');
    await secondProductAddToCart.click({ force: true });
  }

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
