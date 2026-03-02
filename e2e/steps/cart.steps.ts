import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

// Given('I am on the homepage', async ({ homepagePo }: AllFixtures) => {
//   await homepagePo.goTo();
// });

// Given('the home page is visible successfully', async ({ homepagePo }: AllFixtures) => {
//   await homepagePo.shouldBeDisplayed();
// });

// When('I click on {string} button', async ({ page }: AllFixtures, buttonName: string) => {
//   if (buttonName === 'Products') {
//     await page.getByRole('link', { name: 'Products' }).click();
//   }
// });

// Then('I am navigated to ALL PRODUCTS page successfully', async ({ productsPagePo }: AllFixtures) => {
//   await productsPagePo.shouldBeDisplayed();
// });

// Then('the products list is visible', async ({ productsPagePo }: AllFixtures) => {
//   const isVisible = await productsPagePo.isProductsListVisible();
//   expect(isVisible).toBe(true);
// });

// When('I hover over the first product and click {string}', async ({ productsPagePo }: AllFixtures, buttonName: string) => {
//   if (buttonName === 'Add to cart') {
//     await productsPagePo.addFirstProductToCart();
//   }
// });

// When('I click Continue Shopping button', async ({ productsPagePo }: AllFixtures) => {
//   await productsPagePo.continueShopping();
// });

// When('I hover over the second product and click {string}', async ({ productsPagePo }: AllFixtures, buttonName: string) => {
//   if (buttonName === 'Add to cart') {
//     await productsPagePo.addSecondProductToCart();
//   }
// });

// When('I click View Cart button', async ({ productsPagePo }: AllFixtures) => {
//   await productsPagePo.viewCart();
// });

// Then('both products are added to Cart', async ({ cartPagePo }: AllFixtures) => {
//   const productCount = await cartPagePo.getProductCount();
//   expect(productCount).toBe(2);
// });

// Then('their prices are displayed correctly', async ({ cartPagePo }: AllFixtures) => {
//   const firstProductPrice = await cartPagePo.getProductPrice('Blue Top');
//   const secondProductPrice = await cartPagePo.getProductPrice('Men Tshirt');
  
//   expect(firstProductPrice).toContain('Rs. 500');
//   expect(secondProductPrice).toContain('Rs. 400');
// });

// Then('their quantities are displayed correctly', async ({ cartPagePo }: AllFixtures) => {
//   const firstProductQuantity = await cartPagePo.getProductQuantity('Blue Top');
//   const secondProductQuantity = await cartPagePo.getProductQuantity('Men Tshirt');
  
//   expect(firstProductQuantity).toBe('1');
//   expect(secondProductQuantity).toBe('1');
// });

// Then('their total price is calculated correctly', async ({ cartPagePo }: AllFixtures) => {
//   const totalPrice = await cartPagePo.getTotalPrice();
//   expect(totalPrice).toContain('Rs. 900');
// });
