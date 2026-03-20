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
    // return this.page.locator('input[data-qa="pay-button"]');
  }

  get orderSuccessMessage() {
    return this.page.getByText('Your order has been placed successfully!');
  }

  get downloadInvoiceButton() {
    // return this.page.getByRole('button', { name: 'Download Invoice' });
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

  // async fillPaymentDetails(name: string, cardNumber: string, cvc: string, expiry: string): Promise<void> {
  //   await this.ensurePageReady();
    
  //   // Try different field combinations for card name
  //   try {
  //     await this.nameOnCardInput.fill(name);
  //   } catch {
  //     try {
  //       await this.nameOnCardInput.fill(name);
  //     } catch {
  //       console.log('Could not find card name field');
  //     }
  //   }
    
  //   // Try different field combinations for card number
  //   try {
  //     await this.cardNumberInput.fill(cardNumber);
  //   } catch {
  //     try {
  //       await this.cardNumberInput.fill(cardNumber);
  //     } catch {
  //       console.log('Could not find card number field');
  //     }
  //   }
    
  //   // Try different field combinations for CVC
  //   try {
  //     await this.cardCvcInput.fill(cvc);
  //   } catch {
  //     try {
  //       await this.cardCvcInput.fill(cvc);
  //     } catch {
  //       console.log('Could not find CVC field');
  //     }
  //   }
    
  //   // Try different field combinations for expiry
  //   try {
  //     await this.cardMonthExpirationInput.fill(expiry.split('/')[0]);
  //     await this.cardYearExpirationInput.fill(expiry.split('/')[1]);
  //   } catch {
  //     try {
  //       await this.cardMonthExpirationInput.fill(expiry.split('/')[0]);
  //       await this.cardYearExpirationInput.fill(expiry.split('/')[1]);
  //     } catch {
  //       // Try separate month/year fields
  //       const [month, year] = expiry.split('/');
  //       try {
  //         await this.cardMonthExpirationInput.fill(month);
  //         await this.cardYearExpirationInput.fill(year);
  //       } catch {
  //         console.log('Could not find expiry fields');
  //       }
  //     }
  //   }
  // }

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

  // async payAndConfirmOrder(): Promise<void> {
  //   await this.ensurePageReady();
  //   await this.payAndConfirmButton.click();
  //   await this.page.waitForLoadState('networkidle');
  // }

  async verifyOrderSuccess(): Promise<void> {
    await this.ensurePageReady();
    await this.orderSuccessMessage.waitFor({ state: 'visible', timeout: 5000 });
  
    const message = await this.orderSuccessMessage.textContent();
    expect(message).toContain('successfully');
    
    console.log('✅ Modale de succès détectée brièvement.');
  }

  async downloadInvoice(): Promise<void> {
    await this.ensurePageReady();
    // Start waiting for download
    await this.handleConsent();
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceButton.click();
    const download = await downloadPromise;
    console.log('Invoice downloaded:', download.suggestedFilename());
  }

  // async isOrderSuccessful(): Promise<boolean> {
  //   await this.ensurePageReady();
  //   return await this.orderSuccessMessage.isVisible();
  // }
}
