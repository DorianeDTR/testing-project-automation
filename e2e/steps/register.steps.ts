import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('the home page is visible successfully', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.goTo();
  await homepagePo.shouldBeDisplayed();
});

When('I click on \'Signup / Login\' button', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.navigateToSignupLogin();
});

Then('\'New User Signup!\' is visible', async ({ signupPagePo }: AllFixtures) => {
  await signupPagePo.shouldBeDisplayed();
  await signupPagePo.verifyNewUserSignupTitle();
});

When('I enter valid data', async ({ signupPagePo }: AllFixtures) => {
  const testEmail = 'miniga3780@ostahie.com';
  await signupPagePo.fillNewUserForm('JohnDoe', testEmail);
});

// When('I click \'Signup\' button', async ({ signupPagePo }: AllFixtures) => {
//   // This is handled in fillNewUserForm method
// });

// Then('\'ENTER ACCOUNT INFORMATION\' is visible', async ({ signupPagePo }: AllFixtures) => {
//   await signupPagePo.verifyAccountInfoTitle();
// });

When('I fill account details with exhaustive information', async ({ signupPagePo }: AllFixtures) => {
await signupPagePo.verifyAccountInfoTitle();
  const testEmail = 'miniga3780@ostahie.com';
  
  // Select title (Mr/Mrs)
  await signupPagePo.selectTitle('Mr');
  
  // Fill basic account info
  await signupPagePo.fillAccountInfoForm(
    testEmail, // name (will be pre-filled)
    testEmail, // email (will be pre-filled)  
    'Password123', // password
    'Test', // first name
    'User', // last name
    'Test Company', // company
    '123 Test Street', // address
    'Apt 4B', // address2
    'United States', // country
    'California', // state
    'Test City', // city
    '12345', // zipcode
    '1234567890' // mobile number
  );
});

When('I select checkbox \'Sign up for our newsletter!\'', async ({ signupPagePo }: AllFixtures) => {
  await signupPagePo.selectNewsletterCheckbox();
});

When('I select checkbox \'Receive special offers from our partners!\'', async ({ signupPagePo }: AllFixtures) => {
  await signupPagePo.selectOptinCheckbox();
});

When('I fill address details with first name, last name, company, address, country, state, city, zipcode and mobile number', async ({ signupPagePo }: AllFixtures) => {
  // This is already handled in the fillAccountInfoForm method above
  // Keeping this step for completeness and readability
});

When('I click \'Create Account button\'', async ({ signupPagePo }: AllFixtures) => {
  // This is handled in fillAccountInfoForm method
});

Then('\'ACCOUNT CREATED!\' is visible', async ({ accountCreatedPagePo }: AllFixtures) => {
  await accountCreatedPagePo.validateAccountCreation();
});

When('I click \'Continue\' button', async ({ accountCreatedPagePo }: AllFixtures) => {
  await accountCreatedPagePo.clickContinue();
});

Then('\'Logged in as username\' is visible', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.shouldBeDisplayed();
  const isLoggedIn = await headerPagePo.isLoggedIn();
  expect(isLoggedIn).toBe(true);
  
  const loggedInUserEmail = await headerPagePo.getLoggedInUserEmail();
  console.log('Logged in as:', loggedInUserEmail);
  expect(loggedInUserEmail).toContain('testuser');
});

When('I click \'Delete Account\' button', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.deleteAccount();
});

Then('\'ACCOUNT DELETED!\' is visible', async ({ page }: AllFixtures) => {
  const deletedMessage = page.getByText('Account Deleted!');
  await expect(deletedMessage).toBeVisible();
});

When('I click \'Continue\' button', async ({ page }: AllFixtures) => {
  const continueButton = page.getByRole('link', { name: 'Continue' });
  await continueButton.click();
  await page.waitForLoadState('networkidle');
});
