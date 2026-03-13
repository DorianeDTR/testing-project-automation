import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class HeaderPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get header() {
    return this.page.locator('header');
  }

  get homeLink() {
    return this.page.getByRole('link', { name: 'Home' });
  }

  get productsLink() {
    // return this.page.getByRole('link', { name: 'Products' });
    return this.page.locator('a[href="/products"]');
  }

  get cartLink() {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  get signupLoginLink() {
    return this.page.getByRole('link', { name: 'Signup / Login' });
  }

  get testCasesLink() {
    return this.page.getByRole('link', { name: 'Test Cases' });
  }

  get apiTestingLink() {
    return this.page.getByRole('link', { name: 'API Testing' });
  }

  get videoTutorialsLink() {
    return this.page.getByRole('link', { name: 'Video Tutorials' });
  }

  get contactUsLink() {
    return this.page.getByRole('link', { name: 'Contact us' });
  }

  get logo() {
    return this.page.locator('.logo');
  }

  get cartBadge() {
    return this.page.locator('.cart-badge');
  }

  get loggedInUser() {
    return this.page.locator('.nav.navbar-nav > li').filter({ hasText: 'Logged in as' });
  }

  get deleteAccountLink() {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }

  get logoutLink() {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  // Actions
  async shouldBeDisplayed(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async navigateToHome(): Promise<void> {
    await this.ensurePageReady();
    await this.homeLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToProducts(): Promise<void> {
    await this.ensurePageReady();
    await this.productsLink.click({ force: true });
    // await this.page.waitForLoadState('networkidle');
    if (!this.page.url().includes('/products')) {
      await this.page.goto('https://automationexercise.com/products');
    }
  }

  async navigateToCart(): Promise<void> {
    await this.ensurePageReady();
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToSignupLogin(): Promise<void> {
    await this.ensurePageReady();
    await this.signupLoginLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTestCases(): Promise<void> {
    await this.ensurePageReady();
    await this.testCasesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToApiTesting(): Promise<void> {
    await this.ensurePageReady();
    await this.apiTestingLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToVideoTutorials(): Promise<void> {
    await this.ensurePageReady();
    await this.videoTutorialsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToContactUs(): Promise<void> {
    await this.ensurePageReady();
    await this.contactUsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickLogo(): Promise<void> {
    await this.ensurePageReady();
    await this.logo.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartCount(): Promise<string> {
    await this.ensurePageReady();
    const count = await this.cartBadge.textContent();
    return count?.trim() || '0';
  }

  async isLoggedIn(): Promise<boolean> {
    await this.ensurePageReady();
    return await this.loggedInUser.isVisible();
  }

  async getLoggedInUserName(): Promise<string> {
    await this.ensurePageReady();
    const text = await this.loggedInUser.textContent();
    if (text) {
      const match = text.match(/Logged in as (.+)/);
      return match ? match[1].trim() : '';
    }
    return '';
  }

  async logout(): Promise<void> {
    await this.ensurePageReady();
    await this.logoutLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async deleteAccount(): Promise<void> {
    await this.ensurePageReady();
    await this.deleteAccountLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLinkVisible(linkName: string): Promise<boolean> {
    await this.ensurePageReady();
    const link = this.page.getByRole('link', { name: linkName });
    return await link.isVisible();
  }
}
