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
  const user = users.john;
  await signupPagePo.fillNewUserForm(user);
});

When('I fill account details with exhaustive information', async ({ signupPagePo }: AllFixtures) => {
  const user = users.john;
  await signupPagePo.verifyAccountInfoTitle();
  if (user.title) {
    await signupPagePo.selectTitle(user.title);
  }
  await signupPagePo.fillAccountInfoForm(user);
  await signupPagePo.selectNewsletterCheckbox();
  await signupPagePo.selectOptinCheckbox();
});

// When('I select checkbox \'Sign up for our newsletter!\'', async ({ signupPagePo }: AllFixtures) => {
// });

// When('I select checkbox \'Receive special offers from our partners!\'', async ({ signupPagePo }: AllFixtures) => {
// });

// When('I fill address details with first name, last name, company, address, country, state, city, zipcode and mobile number', async ({ signupPagePo }: AllFixtures) => {
//   // This is already handled in the fillAccountInfoForm method above
//   // Keeping this step for completeness and readability
// });

// When('I click \'Create Account button\'', async ({ signupPagePo }: AllFixtures) => {
//   // This is handled in fillAccountInfoForm method
// });

Then('account creation confirmation is displayed', async ({ accountStatusPagePo }: AllFixtures) => {
  await accountStatusPagePo.validateAccountCreated();
  await accountStatusPagePo.clickContinue();
});

// When('I click \'Continue\' button', async ({ accountCreatedPagePo }: AllFixtures) => {
// });

When('I log in', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.shouldBeDisplayed();
  const isLoggedIn = await headerPagePo.isLoggedIn();
  expect(isLoggedIn).toBe(true);
  
  const displayUserName = await headerPagePo.getLoggedInUserName();
  console.log('Logged in as:', displayUserName);
  expect(displayUserName).toContain(users.john.name);
});

Then('I delete my account', async ({ headerPagePo, accountStatusPagePo }: AllFixtures) => {
  await headerPagePo.deleteAccount();

  await accountStatusPagePo.validateAccountDeleted();
  await accountStatusPagePo.clickContinue();
});
