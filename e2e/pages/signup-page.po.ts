import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

export class SignupPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get signupContainer() {
    return this.page.locator('.signup-form');
  }

  get signupNameInput() {
    return this.page.locator('input[data-qa="signup-name"]');
  }
  get signupEmailInput() {
    return this.page.locator('input[data-qa="signup-email"]');
  }
  get signupButton() {
    return this.page.locator('button[data-qa="signup-button"]');
  }

  get accountInfoTitle() {
    return this.page.locator('b:has-text("Enter Account Information")');
  }
  get nameInput() {
    return this.page.locator('input[data-qa="name"]');
  }
  get emailInput() {
    return this.page.locator('input[data-qa="email"]');
  }
  get passwordInput() {
    return this.page.locator('input[data-qa="password"]');
  }
  get firstNameInput() {
    return this.page.locator('input[data-qa="first_name"]');
  }
  get lastNameInput() {
    return this.page.locator('input[data-qa="last_name"]');
  }
  get companyInput() {
    return this.page.locator('input[data-qa="company"]');
  }
  get addressInput() {
    return this.page.locator('input[data-qa="address"]');
  }
  get address2Input() {
    return this.page.locator('input[data-qa="address2"]');
  }
  get countrySelect() {
    return this.page.locator('select[data-qa="country"]');
  }
  get stateInput() {
    return this.page.locator('input[data-qa="state"]');
  }
  get cityInput() {
    return this.page.locator('input[data-qa="city"]');
  }
  get zipcodeInput() {
    return this.page.locator('input[data-qa="zipcode"]');
  }
  get mobileNumberInput() {
    return this.page.locator('input[data-qa="mobile_number"]');
  }
  get createAccountButton() {
    return this.page.locator('button[data-qa="create-account"]');
  }

  // Actions
  async goTo(): Promise<void> {
    await this.navigateWithConsent('https://automationexercise.com/login');
  }

  async shouldBeDisplayed() {
    await this.ensurePageReady();
    await expect(this.signupContainer).toBeVisible();
  }

  // New User Signup 
  async fillNewUserForm(name: string, email: string): Promise<void> {
    await this.ensurePageReady();
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
    await this.page.waitForLoadState('networkidle');
  }


  // Account Information
  async fillAccountInfoForm(
    name: string,
    email: string,
    password: string,
    firstName: string, 
    lastName: string, 
    company: string, 
    address: string, 
    address2: string, 
    country: string, 
    state: string, 
    city: string, 
    zipcode: string, 
    mobileNumber: string): Promise<void> {
    await this.ensurePageReady();
    await this.nameInput.fill(name);
    // await this.emailInput.fill(email);
    if (await this.emailInput.isEditable()) {
      await this.emailInput.fill(email);
    } else {
      console.log('ℹ️ Email field is disabled (pre-filled), skipping fill action.');
    }
    await this.passwordInput.fill(password);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.addressInput.fill(address);
    await this.address2Input.fill(address2);
    await this.countrySelect.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.createAccountButton.click();
  }
}
