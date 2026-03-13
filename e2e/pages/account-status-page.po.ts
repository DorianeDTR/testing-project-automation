import { Page, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class AccountStatusPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get statusMessage() {
    return this.page.locator('h2[data-qa="account-created"], h2[data-qa="account-deleted"]');
  }

  get accountCreatedMessage() {
    // return this.page.getByText('Account Created!');
    return this.page.locator('[data-qa="account-created"]');
  }

  get accountDeletedMessage() {
    // return this.page.getByText('Account Deleted!');
    return this.page.locator('[data-qa="account-deleted"]');
  }

  get continueButton() {
    return this.page.locator('a[data-qa="continue-button"]');
  }

  // Actions
  async shouldBeDisplayed(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.statusMessage).toBeVisible();
  }

  async validateAccountCreated(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.accountCreatedMessage).toBeVisible({ timeout: 10000 });
  }

  async validateAccountDeleted(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.accountDeletedMessage).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.ensurePageReady();
    await this.handleConsent();
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getStatusMessage(): Promise<string> {
    await this.ensurePageReady();
    const text = await this.statusMessage.textContent();
    return text?.trim() || '';
  }

  async isAccountCreated(): Promise<boolean> {
    await this.ensurePageReady();
    return await this.accountCreatedMessage.isVisible();
  }

  async isAccountDeleted(): Promise<boolean> {
    await this.ensurePageReady();
    return await this.accountDeletedMessage.isVisible();
  }
}
