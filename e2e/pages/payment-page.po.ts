import { BasePo } from "./base.po";
import { Page, expect } from "@playwright/test";

export class PaymentPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }
  
  // Locators
  get pageLocator() {
    return this.page.locator('.payment-information');
  }

  get nameOnCardInput() {
    return this.page.locator('input[data-qa="name-on-card"]');
  }

  get cardNumberInput() {
    return this.page.locator('input[data-qa="card-number"]');
  }

  get cardCvcInput() {
    return this.page.locator('input[data-qa="cvc"]');
  }

  get cardMonthExpirationInput() {
    return this.page.locator('input[data-qa="expiry-month"]');
  }

  get cardYearExpirationInput() {
    return this.page.locator('input[data-qa="expiry-year"]');
  }

  get payAndConfirmButton() {
    return this.page.getByRole('button', { name: 'Pay and Confirm Order' });
  }

  get orderSuccessMessage() {
    return this.page.getByText('Your order has been placed successfully!');
  }

  get downloadInvoiceButton() {
    return this.page.getByRole('link', { name: 'Download Invoice' });
  }

  // Actions
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/payment');
  }

  async shouldBeDisplayed(): Promise<void> {
    await this.ensurePageReady();
    await expect(this.pageLocator).toBeVisible();
  }

  async proceedPayment(
    name: string, 
    cardNumber: string, 
    cvc: string, 
    expiryMonth: string, 
    expiryYear: string
  ): Promise<void> {
    await this.ensurePageReady();
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cardCvcInput.fill(cvc);
    await this.cardMonthExpirationInput.fill(expiryMonth);
    await this.cardYearExpirationInput.fill(expiryYear);
    await this.handleConsent();
    await this.payAndConfirmButton.click();
  }

  async verifyOrderSuccess(): Promise<void> {
    await this.ensurePageReady();
    await this.orderSuccessMessage.waitFor({ state: 'visible', timeout: 5000 });
  
    const message = await this.orderSuccessMessage.textContent();
    expect(message).toContain('successfully');

  }

  async downloadInvoice(): Promise<void> {
    await this.ensurePageReady();
    await this.handleConsent();
    const downloadPromise = this.page.waitForEvent('download', { timeout: 20000 });
    await this.downloadInvoiceButton.click({ force: true });
    const download = await downloadPromise;
    console.log('Downloaded invoice:', download.suggestedFilename());
  }
}

