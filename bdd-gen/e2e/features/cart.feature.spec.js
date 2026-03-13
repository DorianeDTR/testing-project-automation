// Generated from: e2e/features/cart.feature
import { pageFixtures as test } from "../../../e2e/support/fixtures.ts";

test.describe('Add Products in Cart', () => {

  test('Add two different products to cart', { tag: ['@Automated'] }, async ({ Given, When, Then, And, accountStatusPagePo, cartPagePo, checkoutPagePo, headerPagePo, homepagePo, loginPagePo, productsPagePo, signupPagePo }) => { 
    await Given('I am on homepage', null, { homepagePo }); 
    await And('the home page is visible successfully', null, { homepagePo, loginPagePo }); 
    await When('I click on \'Products\' button', null, { headerPagePo }); 
    await Then('I am navigated to ALL PRODUCTS page successfully', null, { productsPagePo }); 
    await And('the products list is visible', null, { productsPagePo }); 
    await When('I hover over "first" product', null, { productsPagePo }); 
    await And('I click Add to cart button on "first" product', null, { productsPagePo }); 
    await And('I handle: added to cart modal', null, { cartPagePo }); 
    await And('I click Continue Shopping in modal', null, { cartPagePo }); 
    await When('I hover over "second" product', null, { productsPagePo }); 
    await And('I click Add to cart button on "second" product', null, { productsPagePo }); 
    await And('I handle: added to cart modal', null, { cartPagePo }); 
    await And('I click View Cart in modal', null, { cartPagePo }); 
    await Then('both products are added to Cart', null, { cartPagePo }); 
    await And('their prices are displayed correctly', null, { cartPagePo }); 
    await And('their quantities are displayed correctly', null, { cartPagePo }); 
    await And('their total price is calculated correctly', null, { accountStatusPagePo, cartPagePo, checkoutPagePo, headerPagePo, homepagePo, signupPagePo }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/cart.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@Automated"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I am on homepage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And the home page is visible successfully","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I click on 'Products' button","stepMatchArguments":[{"group":{"start":11,"value":"'Products'","children":[{"children":[{"children":[]}]},{"start":12,"value":"Products","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I am navigated to ALL PRODUCTS page successfully","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the products list is visible","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I hover over \"first\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"first\"","children":[{"start":14,"value":"first","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And I click Add to cart button on \"first\" product","stepMatchArguments":[{"group":{"start":30,"value":"\"first\"","children":[{"start":31,"value":"first","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I handle: added to cart modal","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click Continue Shopping in modal","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I hover over \"second\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"second\"","children":[{"start":14,"value":"second","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I click Add to cart button on \"second\" product","stepMatchArguments":[{"group":{"start":30,"value":"\"second\"","children":[{"start":31,"value":"second","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I handle: added to cart modal","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I click View Cart in modal","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then both products are added to Cart","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And their prices are displayed correctly","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And their quantities are displayed correctly","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And their total price is calculated correctly","stepMatchArguments":[]}]},
]; // bdd-data-end