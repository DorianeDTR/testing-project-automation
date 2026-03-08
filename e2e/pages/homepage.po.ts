import { expect, Page, Locator } from '@playwright/test';

import { BasePo } from "./base.po";

export class HomepagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get homepageContainer() {
    return this.page.locator('#slider-carousel');
  }

  get featuresItems() {
    return this.page.locator('.features_items');
  }

  get header() {
    return this.page.locator('header');
  }
  

  // Actions
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/');
  }
  
  async shouldBeDisplayed() {
    await this.ensurePageReady();
    await expect(this.homepageContainer).toBeVisible();
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
