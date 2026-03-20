import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class CheckoutPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get checkoutSection() {
    return this.page.locator('section#cart_items');
  }

  get checkoutModal() {
    return this.page.locator('.modal-content');
  }

  get modalRegisterLink() {
    return this.page.getByRole('link', { name: 'Register / Login' });
  }

  get deliveryAddressSection() {
    return this.page.locator('#delivery_address');
  }

  get billingAddressSection() {
    return this.page.locator('#billing_address');
  }

  get orderSummarySection() {
    return this.page.locator('#order_summary');
  }

  get totalPrice() {
    return this.page.locator('tr', { hasText: 'Total Amount' }).locator('.cart_total_price');
  }

  get subtotalPrice() {
    return this.page.locator('#order_summary .cart_subtotal');
  }

  get taxPrice() {
    return this.page.locator('#order_summary .cart_tax');
  }

  get proceedToPaymentButton() {
    return this.page.getByRole('button', { name: 'Proceed To Payment' });
  }

  get placeOrderButton() {
    return this.page.getByRole('link', { name: 'Place Order' });
  }

  get commentTextArea() {
    return this.page.locator('textarea[name="message"]');
  }

  // Actions
  async goTo(): Promise<void> {
    // await this.page.goto('/payment');
    // await this.navigateWithConsent('https://automationexercise.com/checkout');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async handleCheckoutModal(): Promise<void> {
    await this.ensurePageReady();
    const checkoutModal = this.checkoutModal;
  
    if (await checkoutModal.isVisible({ timeout: 2000 })) {
      await this.modalRegisterLink.click({ force: true });
      await this.page.waitForURL('**/login', { timeout: 15000 });
    } else {
      console.log('Checkout modal is not visible, proceeding without modal handling');
    }
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout/);

    await this.handleConsent();
    await this.handleCheckoutModal();
    await expect(this.page.getByText('Review Your Order')).toBeVisible();
  }

  async proceedToPayment(): Promise<void> {
    await this.ensurePageReady();
    await this.proceedToPaymentButton.click();
  }

  async placeOrder(comment?: string): Promise<void> {
    await this.ensurePageReady();
    if (comment) {
      await this.commentTextArea.fill(comment);
    }
    await this.placeOrderButton.click();
  }

  async getTotalPrice(): Promise<string> {
    await this.ensurePageReady();
    
    console.log('Looking for total price on current page:', this.page.url());
    
    const totalPriceLocators = [
      'tr:has-text("Total Amount") .cart_total_price',
      'tr:has-text("Total") .cart_total_price', 
      '.cart_total_price',
      'td:has-text("Total") + td',
      'tr td:last-child:has-text("Rs.")'
    ];
    
    for (const locator of totalPriceLocators) {
      try {
        const element = this.page.locator(locator);
        if (await element.isVisible({ timeout: 1000 })) {
          const text = await element.textContent();
          return text?.trim() || '';
        }
      } catch (error) {
      }
    }
    
    await expect(this.totalPrice).not.toHaveText('Rs. 0', { timeout: 15000 });
    const text = await this.totalPrice.innerText();
    return text.trim();
  }

  async getSubtotalPrice(): Promise<string> {
    await this.ensurePageReady();
    const text = await this.subtotalPrice.textContent();
    return text?.trim() || '';
  }

  async getTaxPrice(): Promise<string> {
    await this.ensurePageReady();
    const text = await this.taxPrice.textContent();
    return text?.trim() || '';
  }
}
