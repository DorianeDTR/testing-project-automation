
import type { Page, Locator } from '@playwright/test';

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
      // 1. On essaie la méthode propre d'abord (clic sur le bouton)
      const frame = this.page.frameLocator('iframe[name*="googlefc"]');
      const button = frame.getByRole('button', { name: /Consent|Autoriser/i });
      
      // On n'attend que 2 secondes pour ne pas geler le test
      const buttonVisible = await button.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (buttonVisible) {
        await button.click({ force: true });
        console.log('✅ Consent clicked.');
        // Wait a bit for the click to take effect
        await this.page.waitForTimeout(1000);
      }
    } catch (e) {
      // Si le clic échoue, on passe à la suppression manuelle
    }

    // 2. LA MÉTHODE RADICALE : On supprime physiquement les éléments qui bloquent
    await this.page.evaluate(() => {
      const selectors = ['.fc-consent-root', '.fc-dialog-overlay', '.fc-dialog-container'];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
      
      // Force body styles to unlock scrolling and positioning
      const body = document.body;
      if (body) {
        body.style.setProperty('overflow', 'auto', 'important');
        body.style.setProperty('position', 'static', 'important');
        body.style.setProperty('pointer-events', 'auto', 'important');
      }
      
      // Also remove any inline styles that might be blocking
      const html = document.documentElement;
      if (html) {
        html.style.setProperty('overflow', 'auto', 'important');
        html.style.setProperty('position', 'static', 'important');
      }
    }).catch(() => {});
    
    console.log('🛡️ Consent elements physically removed and body unlocked.');
  }

  protected async ensurePageReady(): Promise<void> {
    // Call this cleanup before any expect().toBeVisible() check
    await this.handleConsent();
    // Small delay to ensure DOM is stable after removal
    await this.page.waitForTimeout(500);
  }

  protected async navigateWithConsent(url: string): Promise<void> {
    await this.page.goto(url);
    // On gère le consentement APRES le début du chargement, 
    // Playwright attendra que l'élément soit prêt.
    await this.handleConsent();
  }
}
