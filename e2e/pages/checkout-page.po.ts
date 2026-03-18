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
    return this.page.getByRole('button', { name: 'Place Order' });
  }

  get paymentSection() {
    return this.page.locator('#payment_section');
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

  get cardExpiryInput() {
    return this.page.locator('input[data-qa="expiry-month"]');
  }

  get orderSuccessMessage() {
    return this.page.getByText('Order Placed!');
  }

  get orderConfirmationNumber() {
    return this.page.locator('.order-number');
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
    console.log('Checking if checkout modal is visible...');
    
    if (await checkoutModal.isVisible({ timeout: 2000 })) {
      console.log('Checkout modal is visible, clicking Register / Login link...');
      await this.modalRegisterLink.click({ force: true });
      console.log('✅ Checkout modal handled - clicked Register / Login');
      // await this.page.waitForLoadState('networkidle');
      await this.page.waitForURL('**/login', { timeout: 15000 });
      console.log('After navigation - Current URL:', this.page.url());
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

  async placeOrder(): Promise<void> {
    await this.ensurePageReady();
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails(name: string, cardNumber: string, cvc: string, expiry: string): Promise<void> {
    await this.ensurePageReady();
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cardCvcInput.fill(cvc);
    await this.cardExpiryInput.fill(expiry);
  }

  async getTotalPrice(): Promise<string> {
    await this.ensurePageReady();
    
    console.log('Looking for total price on current page:', this.page.url());
    
    // Try different possible total price locators
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
          console.log(`Found total price with selector "${locator}": ${text}`);
          return text?.trim() || '';
        }
      } catch (error) {
        // Continue to next locator
      }
    }
    
    console.log('No total price element found, trying original locator...');
    // await expect(this.totalPrice).toBeVisible({ timeout: 10000 });
    await expect(this.totalPrice).not.toHaveText('Rs. 0', { timeout: 15000 });
    const text = await this.totalPrice.innerText();
    console.log('Checkout total price found:', text);
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

  async isOrderSuccessful(): Promise<boolean> {
    await this.ensurePageReady();
    return await this.orderSuccessMessage.isVisible();
  }

  async getOrderConfirmationNumber(): Promise<string> {
    await this.ensurePageReady();
    const text = await this.orderConfirmationNumber.textContent();
    return text?.trim() || '';
  }
}
