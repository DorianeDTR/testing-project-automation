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

  get loginModal() {
    return this.page.getByText('Register / Login');
  }

  get signupLoginLink() {
    return this.page.getByRole('link', { name: 'Signup / Login' });
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
    return this.page.locator('table#cart_info_table tbody tr').last().locator('.cart_total_price');
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

  async handleLoginModal(): Promise<void> {
    const loginModal = this.loginModal;
    if (await loginModal.isVisible({ timeout: 2000 })) {
      await this.signupLoginLink.click();
      console.log('✅ Login modal handled - clicked Signup / Login');
    }
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout/);

    await this.handleConsent();
    await this.handleLoginModal();
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

    await expect(this.totalPrice).toBeVisible({ timeout: 10000 });
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
