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
    // await productsPagePo.addFirstProductToCart();
    console.log(`Hovering over ${productOrder} product...`);
  } else if (productOrder === 'second') {
    // await productsPagePo.addSecondProductToCart();
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

  // Check if we need to signup/login or if we're already on checkout page
  // const currentUrl = await checkoutPagePo.getCurrentUrl();
  // console.log('Current URL after modal handling:', currentUrl);
  
  // if (currentUrl.includes('/login')) {
  //   // We need to signup/login
  //   await signupPagePo.shouldBeDisplayed();

  //   const user = {
  //     title: 'Mr',
  //     name: 'JohnDoe',
  //     email: 'miniga3780@ostahie.com',
  //     password: 'pa$$word',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     company: '',
  //     address: 'Here and there',
  //     address2: '',
  //     country: 'Canada',
  //     state: 'Gironde',
  //     city: 'Bordeaux',
  //     zipcode: '33000',
  //     mobileNumber: '0123456789'
  //   };

    await signupPagePo.fillNewUserForm(user);
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
  }
);

