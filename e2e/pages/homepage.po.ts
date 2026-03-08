import { expect, Page, Locator } from '@playwright/test';

import { BasePo } from "./base.po";

export class HomepagePo extends BasePo {
  get pageLocator(): Locator {
    return this.page.locator('a[href="/"]');
  }

  // Locators
  get homepageContainer() {
    return this.page.locator('#slider-carousel[');
  }

  get featuresItems() {
    return this.page.locator('.features_items');
  }

  get header() {
    return this.page.locator('header');
  }
  
  constructor(page: Page) {
    super(page);
  }

  // Actions
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/');
  }
  
  async shouldBeDisplayed() {
    // await this.page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
    await this.ensurePageReady();

    console.log('DEBUG: Starting slider check...');
    // await this.homepageContainer.waitFor({ state: 'attached', timeout: 10000 });
    // await expect(this.homepageContainer).toBeVisible();
    // await expect(this.featuresItems).toBeVisible();
    // await expect(this.header).toBeVisible();
    await expect(this.pageLocator).toBeVisible();
  }

  async isHomepageFullyLoaded(): Promise<boolean> {
    try {
      const isSliderVisible = await this.homepageContainer.isVisible();
      const isFeaturesVisible = await this.featuresItems.isVisible();
      const isHeaderVisible = await this.header.isVisible();
      
      return isSliderVisible && isFeaturesVisible && isHeaderVisible;
    } catch {
      return false;
    }
  }
}
