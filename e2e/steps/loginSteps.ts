import { Page } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I go to the login page', async ({ loginPagePo }: AllFixtures) => {
  await loginPagePo.goTo();
  await loginPagePo.shouldBeDisplayed();
});

When('I fill the login form with valid data', async ({ loginPagePo }: AllFixtures) => {
  await loginPagePo.logAsUser('john');
});
Then('I am redirected to the homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.shouldBeDisplayed();
});


