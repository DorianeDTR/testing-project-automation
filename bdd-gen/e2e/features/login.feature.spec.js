// Generated from: e2e/features/login.feature
import { pageFixtures as test } from "../../../e2e/support/fixtures.ts";

test.describe('Login feature', () => {

  test.beforeEach('Background', async ({ Given, homepagePo }, testInfo) => { if (testInfo.error) return;
    await Given('I begin my journey on the homepage', null, { homepagePo }); 
  });
  
  test('Correctly login', { tag: ['@Automated'] }, async ({ When, Then, homepagePo, loginPagePo }) => { 
    await When('I go to the login page', null, { loginPagePo }); 
    await Then('I fill the login form with valid data', null, { loginPagePo }); 
    await Then('I am redirected to the homepage', null, { homepagePo }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":8,"tags":["@Automated"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I begin my journey on the homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I go to the login page","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I fill the login form with valid data","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I am redirected to the homepage","stepMatchArguments":[]}]},
]; // bdd-data-end