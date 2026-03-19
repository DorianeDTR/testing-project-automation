import { Page } from "@playwright/test";
import { test as base } from "playwright-bdd";

import { LoginPagePo } from "../pages/login-page.po";
import { HomepagePo } from "../pages/homepage.po";
import { CartPagePo } from "../pages/cart-page.po";
import { ProductsPagePo } from "../pages/products-page.po";
import { CheckoutPagePo } from "../pages/checkout-page.po";
import { SignupPagePo } from "../pages/signup-page.po";
import { AccountStatusPagePo } from "../pages/account-status-page.po";
import { HeaderPagePo } from "../pages/header-page.po";
import { PaymentPagePo } from "../pages/payment-page.po";

interface Pages {
  loginPagePo: LoginPagePo;
  homepagePo: HomepagePo;
  cartPagePo: CartPagePo;
  productsPagePo: ProductsPagePo;
  checkoutPagePo: CheckoutPagePo;
  signupPagePo: SignupPagePo;
  accountStatusPagePo: AccountStatusPagePo;
  headerPagePo: HeaderPagePo;
  paymentPagePo: PaymentPagePo;
};

export interface AllFixtures extends Pages {
    page: Page;
}

export const pageFixtures = base.extend<Pages>({
    loginPagePo: async ({ page }, use) => {
        await use(new LoginPagePo(page));
    },
    homepagePo: async ({ page }, use) => {
        await use(new HomepagePo(page));
    },
    cartPagePo: async ({ page }, use) => {
        await use(new CartPagePo(page));
    },
    productsPagePo: async ({ page }, use) => {
        await use(new ProductsPagePo(page));
    },
    checkoutPagePo: async ({ page }, use) => {
        await use(new CheckoutPagePo(page));
    },
    signupPagePo: async ({ page }, use) => {
        await use(new SignupPagePo(page));
    },
    accountStatusPagePo: async ({ page }, use) => {
        await use(new AccountStatusPagePo(page));
    },
    headerPagePo: async ({ page }, use) => {
        await use(new HeaderPagePo(page));
    },
    paymentPagePo: async ({ page }, use) => {
        await use(new PaymentPagePo(page));
    },
});