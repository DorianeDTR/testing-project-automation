import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";
import users from "../users.json" with { type: 'json' };

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I am on the homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.goTo();
  await homepagePo.shouldBeDisplayed();
});

Then('\'New User Signup!\' is visible', async ({ headerPagePo, signupPagePo }: AllFixtures) => {
  await headerPagePo.navigateToSignupLogin();

  await signupPagePo.shouldBeDisplayed();
  await signupPagePo.verifyNewUserSignupTitle();
});

When('I enter valid data', async ({ signupPagePo }: AllFixtures) => {
  const user = users.jane;
  await signupPagePo.fillNewUserForm(user);
});

When('I fill account details with exhaustive information', async ({ signupPagePo }: AllFixtures) => {
  const user = users.jane;
  await signupPagePo.verifyAccountInfoTitle();
  // if (user.title) {
  //   await signupPagePo.selectTitle(user.title);
  // }
  
  // await signupPagePo.selectNewsletterCheckbox();
  // await signupPagePo.selectOptinCheckbox();
  await signupPagePo.fillAccountInfoForm(user);
});

Then('account creation confirmation is displayed', async ({ accountStatusPagePo }: AllFixtures) => {
  await accountStatusPagePo.validateAccountCreated();
  await accountStatusPagePo.clickContinue();
});

When('I log in', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.shouldBeDisplayed();
  // await expect (headerPagePo.loggedInUser).toBeVisible();
  
  const displayUserName = await headerPagePo.getLoggedInUserName();
  console.log('Logged in as:', displayUserName);
  expect(displayUserName).toContain('JaneDoe');
});

Then('I delete my account', async ({ headerPagePo, accountStatusPagePo }: AllFixtures) => {
  await headerPagePo.deleteAccount();

  await accountStatusPagePo.validateAccountDeleted();
  await accountStatusPagePo.clickContinue();
});
