
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePo {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  private get consentIframe() {
    return this.page.frameLocator('iframe[name*="googlefc"]');
  }

  private get consentButton() {
    return this.consentIframe.getByRole('button', { name: /Consent|Autoriser/i });
  }

  protected async handleConsent(): Promise<void> {
    try {
  
      const frame = this.page.frameLocator('iframe[name*="googlefc"]');
      const button = frame.getByRole('button', { name: /Consent|Autoriser/i });
      
      const buttonVisible = await button.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (buttonVisible) {
        await button.click({ force: true });
        console.log('✅ Consent clicked.');
        await expect(button).not.toBeVisible({ timeout: 3000 }).catch(() => {});
      }
    } catch (e) {
    }

    await this.page.evaluate(() => {
      const selectors = ['.fc-consent-root', '.fc-dialog-overlay', '.fc-dialog-container'];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
      
      const body = document.body;
      if (body) {
        body.style.setProperty('overflow', 'auto', 'important');
        body.style.setProperty('position', 'static', 'important');
        body.style.setProperty('pointer-events', 'auto', 'important');
      }
      
      const html = document.documentElement;
      if (html) {
        html.style.setProperty('overflow', 'auto', 'important');
        html.style.setProperty('position', 'static', 'important');
      }
    }).catch(() => {});
    
    console.log('🛡️ Consent elements physically removed and body unlocked.');
  }

  protected async ensurePageReady(): Promise<void> {
    await this.handleConsent();
    // await this.page.waitForTimeout(500);
  }

  protected async navigateWithConsent(url: string): Promise<void> {
    await this.page.goto(url);
    await this.handleConsent();
  }
}
