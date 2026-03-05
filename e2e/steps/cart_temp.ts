import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I am on the homepage', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.goTo();
});

Given('the home page is visible successfully', async ({ homepagePo }: AllFixtures) => {
  await homepagePo.shouldBeDisplayed();
});

When('I click on {string} button', async ({ page }: AllFixtures, buttonName: string) => {
  if (buttonName === 'Products') {
    await page.getByRole('link', { name: 'Products' }).click();
  }
});

Then('I am navigated to ALL PRODUCTS page successfully', async ({ productsPagePo }: AllFixtures) => {
  await productsPagePo.shouldBeDisplayed();
});

Then('the products list is visible', async ({ productsPagePo }: AllFixtures) => {
  const isVisible = await productsPagePo.isProductsListVisible();
  expect(isVisible).toBe(true);
});

When('I hover over the {string} product and click {string}', async ({ productsPagePo }: AllFixtures, productOrder: string, buttonName: string) => {
  if (buttonName === 'Add to cart') {
    if (productOrder === 'first') {
      await productsPagePo.addFirstProductToCart();
    } else if (productOrder === 'second') {
      await productsPagePo.addSecondProductToCart();
    }
  }
});

When('I handle the added to cart modal', async ({ cartPagePo }: AllFixtures) => {
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
  const firstProductPrice = await cartPagePo.getProductPriceById('1');
  const secondProductPrice = await cartPagePo.getProductPriceById('2');
  
  expect(firstProductPrice).toContain('Rs. 500');
  expect(secondProductPrice).toContain('Rs. 400');
});

Then('their quantities are displayed correctly', async ({ cartPagePo }: AllFixtures) => {
  const firstProductQuantity = await cartPagePo.getProductQuantity('Blue Top');
  const secondProductQuantity = await cartPagePo.getProductQuantity('Men Tshirt');
  
  expect(firstProductQuantity).toBe('1');
  expect(secondProductQuantity).toBe('1');
});
