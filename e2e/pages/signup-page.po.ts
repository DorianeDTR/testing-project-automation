import { Page, Locator, expect } from '@playwright/test';
import { BasePo } from './base.po';

interface UserData {
  title?: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupPagePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get signupContainer() {
    return this.page.locator('form').first();
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

  get signupForm() {
    return this.page.locator('form[action="/signup"]');
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
    console.log('Current URL:', this.page.url());
    console.log('Page title:', await this.page.title());
  }

  async verifyNewUserSignupTitle(): Promise<void> {
    const signupTitle = this.page.locator('h2:has-text("New User Signup!")');
    await expect(signupTitle).toBeVisible();
  }

  async verifyAccountInfoTitle(): Promise<void> {
    await this.ensurePageReady();
    // const accountInfoTitle = this.page.locator('b').filter({ hasText: 'Enter Account Information' });
    // await expect(accountInfoTitle).toBeVisible();

    await expect(this.signupForm).toBeVisible({ timeout: 7000 });
  }

  async selectTitle(title: string): Promise<void> {
    await this.page.locator(`input[name="title"][value="${title}"]`).check();
  }

  // async selectNewsletterCheckbox(): Promise<void> {
  //   await this.page.locator('input[name="newsletter"]').check({ force: true });
  // }

  // async selectOptinCheckbox(): Promise<void> {
  //   await this.page.locator('input[name="optin"]').check({ force: true });
  // }

  // New User Signup 
  async fillNewUserForm(user: UserData): Promise<void> {
    await this.ensurePageReady();
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Account Information
  async fillAccountInfoForm(
    user: UserData): Promise<void> {
    await this.ensurePageReady();
    await this.nameInput.fill(user.name);
    if (await this.emailInput.isEditable()) {
      await this.emailInput.fill(user.email);
    } else {
      console.log('ℹ️ Email field is disabled (pre-filled), skipping fill action.');
    }
    await this.passwordInput.fill(user.password);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    // await this.companyInput.fill(user.company);
    if (user.company) {
      await this.companyInput.fill(user.company);
    }
    await this.addressInput.fill(user.address);
    // await this.address2Input.fill(user.address2);
    if (user.address2) {
      await this.address2Input.fill(user.address2);
    }
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
    await this.createAccountButton.click();
  }
}
