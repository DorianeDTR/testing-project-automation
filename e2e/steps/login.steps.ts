import { Page } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";
import users from "../users.json" with { type: 'json' };

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I begin my journey on the homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.goTo();
  await homepagePo.shouldBeDisplayed();
});

When('I go to the login page', async ({ loginPagePo }: AllFixtures) => {
  await loginPagePo.goTo();
  await loginPagePo.shouldBeDisplayed();
});

Then('I fill the login form with valid data', async ({ loginPagePo }: AllFixtures) => {
  const user = users.david;
  await loginPagePo.logAs(user.email, user.password);
});

Then('I am redirected to the homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.shouldBeDisplayed();
});


