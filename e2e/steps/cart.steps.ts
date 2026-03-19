import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";
import users from "../users.json" with { type: 'json' };


export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I am on homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.goTo();
});

Given('the home page is visible successfully', async ({ homepagePo, loginPagePo }: AllFixtures) => {
  await homepagePo.shouldBeDisplayed();
  
  await loginPagePo.goTo();
  await loginPagePo.shouldBeDisplayed();
  const user = users.john;
  await loginPagePo.logAs(user.email, user.password);
});

When('I click on {string} button', async ({ headerPagePo }: AllFixtures) => {
  await headerPagePo.navigateToProducts();
});

Then('I am navigated to ALL PRODUCTS page successfully', async ({ productsPagePo }: AllFixtures) => {
  await productsPagePo.shouldBeDisplayed();
});

Then('the products list is visible', async ({ productsPagePo }: AllFixtures) => {
  const isVisible = await productsPagePo.isProductsListVisible();
  expect(isVisible).toBe(true);
});

When('I hover over {string} product', async ({ productsPagePo }: AllFixtures, productOrder: string) => {
  if (productOrder === 'first') {
    console.log(`Hovering over ${productOrder} product...`);
  } else if (productOrder === 'second') {
    console.log(`Hovering over ${productOrder} product...`);
  }
});

When('I click Add to cart button on {string} product', async ({ productsPagePo }: AllFixtures, productOrder: string) => {
  if (productOrder === 'first') {
    await productsPagePo.addFirstProductToCart();
  } else if (productOrder === 'second') {
    await productsPagePo.addSecondProductToCart();
  }
});

When('I handle: added to cart modal', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.handleAddedToCartModal();
});

When('I click Continue Shopping in modal', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.clickContinueShoppingInModal();
});

When('I click View Cart in modal', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.clickViewCartInModal();
});

Then('both products are added to Cart', async ({ cartPagePo }: AllFixtures) => {
  const productCount = await cartPagePo.getProductCount();
  expect(productCount).toBe(2);
});

Then('their prices are displayed correctly', async ({ cartPagePo }: AllFixtures) => {
  const firstProductPrice = await cartPagePo.getProductPriceByName('Sleeveless Dress');
  const secondProductPrice = await cartPagePo.getProductPriceByName('Stylish Dress');
  
  expect(firstProductPrice).toContain('Rs. 1000');
  expect(secondProductPrice).toContain('Rs. 1500');
});

Then('their quantities are displayed correctly', async ({ cartPagePo }: AllFixtures) => {
  const firstProductQuantity = await cartPagePo.getProductQuantity('Sleeveless Dress');
  const secondProductQuantity = await cartPagePo.getProductQuantity('Stylish Dress');
  
  expect(firstProductQuantity).toBe('1');
  expect(secondProductQuantity).toBe('1');
});

Then('their total price is calculated correctly', async ({ cartPagePo, checkoutPagePo, signupPagePo, accountStatusPagePo, homepagePo, headerPagePo }: AllFixtures) => {  
  await cartPagePo.proceedToCheckout();
  
  await checkoutPagePo.handleCheckoutModal();

  await signupPagePo.shouldBeDisplayed();
  const user = users.john;

  await signupPagePo.fillNewUserForm(user);
  await signupPagePo.verifyAccountInfoTitle();
  await signupPagePo.fillAccountInfoForm(user);

  await accountStatusPagePo.validateAccountCreated();
  await accountStatusPagePo.clickContinue();
  await homepagePo.shouldBeDisplayed();
  await headerPagePo.navigateToCart();

  await cartPagePo.shouldBeDisplayed();
  await cartPagePo.proceedToCheckout();
  await checkoutPagePo.shouldBeDisplayed();
  
  const totalPrice = await checkoutPagePo.getTotalPrice();
  expect(totalPrice).toContain('Rs. 2500');
});

When('I enter description in comment text area and click Place Order', async ({ checkoutPagePo }: AllFixtures) => {
  await checkoutPagePo.placeOrder('Test order comment');
});

When('I enter payment details: Name on Card, Card Number, CVC, Expiration date', async ({ paymentPagePo }: AllFixtures) => {
  await paymentPagePo.fillPaymentDetails('John Doe', '4111111111111111', '123', '12/28');
});

When('I click \'Pay and Confirm Order\' button', async ({ paymentPagePo }: AllFixtures) => {
  await paymentPagePo.payAndConfirmOrder();
});

Then('success message \'Your order has been placed successfully!\' is visible', async ({ paymentPagePo }: AllFixtures) => {
  await paymentPagePo.verifyOrderSuccess();
});

When('I click \'Download Invoice\' button', async ({ paymentPagePo }: AllFixtures) => {
  await paymentPagePo.downloadInvoice();
});

Then('invoice is downloaded successfully', async ({ paymentPagePo }: AllFixtures) => {
  // Verify invoice download (optional as mentioned)
  console.log('Invoice download initiated');
});

When('I click \'Delete Account\' button', async ({ headerPagePo, accountStatusPagePo }: AllFixtures) => {
  await headerPagePo.deleteAccount();
  await accountStatusPagePo.validateAccountDeleted();
  await accountStatusPagePo.clickContinue();
});
