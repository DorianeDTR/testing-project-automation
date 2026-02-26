import { expect, Page, Locator } from '@playwright/test';

import { Auth } from "../tools/auth";
import { BasePo } from "./base.po";

export class LoginPagePo extends BasePo {
  private auth = new Auth();
  get pageLocator() {
    return this.page.locator('.login-form');
  }
  get emailInput() {
    return this.page.locator('input[data-qa="login-email"]');
  }
  get passwordInput() {
    return this.page.locator('input[data-qa="login-password"]');
  }
  get loginButton() {
    return this.page.locator('button[data-qa="login-button"]');
  }
  
  constructor(page: Page) {
    super(page);
  }
  async goTo() {
    await this.page.goto('/login');
  }

  async shouldBeDisplayed() {
    await expect(this.pageLocator).toBeVisible();
  }

  async logAs(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logAsUser(userName: 'john') {
    const user = this.auth.getUser(userName);
    await this.logAs(user.email, user.password);
  }

  async wronglyLogAs(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}
