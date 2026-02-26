import { Page } from "@playwright/test";
import { test as base } from "playwright-bdd";

import { LoginPagePo } from "../pages/login-page.po";
import { HomepagePo } from "../pages/homepage.po";

interface Pages {
  loginPagePo: LoginPagePo;
  homepagePo: HomepagePo;
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
});