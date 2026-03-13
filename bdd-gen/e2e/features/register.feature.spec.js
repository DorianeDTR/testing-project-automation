// Generated from: e2e/features/register.feature
import { pageFixtures as test } from "../../../e2e/support/fixtures.ts";

test.describe('Register User', () => {

  test('Complete user registration flow', { tag: ['@Automated'] }, async ({ Given, When, Then, accountStatusPagePo, headerPagePo, homepagePo, signupPagePo }) => { 
    await Given('I am on the homepage', null, { homepagePo }); 
    await Then('\'New User Signup!\' is visible', null, { headerPagePo, signupPagePo }); 
    await When('I enter valid data', null, { signupPagePo }); 
    await When('I fill account details with exhaustive information', null, { signupPagePo }); 
    await Then('account creation confirmation is displayed', null, { accountStatusPagePo }); 
    await When('I log in', null, { headerPagePo }); 
    await Then('I delete my account', null, { accountStatusPagePo, headerPagePo }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/register.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@Automated"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given I am on the homepage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then 'New User Signup!' is visible","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I enter valid data","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I fill account details with exhaustive information","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then account creation confirmation is displayed","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I log in","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I delete my account","stepMatchArguments":[]}]},
]; // bdd-data-end