import { expect, Page, Locator } from '@playwright/test';

import { BasePo } from "./base.po";

export class HomepagePo extends BasePo {
  get pageLocator(): Locator {
    return this.page.locator('a[href="/"]');
  }

  get homepageContainer() {
    return this.page.locator('.slider');
  }
  
  constructor(page: Page) {
    super(page);
  }

  // Navigation method
  // async goTo(): Promise<void> {
  //   await this.page.goto('/');
  // }
  
  async shouldBeDisplayed() {
    await expect(this.homepageContainer).toBeVisible();
  }
}
