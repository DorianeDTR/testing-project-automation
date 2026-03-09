import { Page, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class AccountCreatedPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  get accountCreatedMessage() {
    return this.page.getByText('Account Created!');
  }

  get continueButton() {
    return this.page.locator('a[data-qa="continue-button"]');
  }
  

  async validateAccountCreation() {
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async clickContinue() {
    await this.ensurePageReady();
    await this.handleConsent();
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}