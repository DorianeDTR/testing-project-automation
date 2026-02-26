import { expect, Page, Locator } from '@playwright/test';

import { BasePo } from "./base.po";

export class HomepagePo extends BasePo {
  get pageLocator(): Locator {
    return this.page.locator('a[href="/"]');
  }
  
  constructor(page: Page) {
    super(page);
  }
  
  async shouldBeDisplayed() {
    await expect(this.pageLocator).toBeVisible();
  }
}
