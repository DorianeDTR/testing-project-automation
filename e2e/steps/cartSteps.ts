import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const {Given, When, Then} = createBdd(fixtures);

Given('I am on the homepage', async ({ page }: AllFixtures) => {
  await page.goto('/');
});

When('I add a product to cart', async ({ page }: AllFixtures) => {
  // Add the first product to cart
  await page.locator('.productinfo').first().getByRole('button', { name: 'Add to cart' }).click();
  // Wait for success message
  await page.getByText('Your product has been added to cart').isVisible();
  // Close the success modal if present
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
});

Then('the product should be added to cart', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.navigateToCart();
  const productCount = await cartPagePo.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

When('I navigate to the cart', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.navigateToCart();
});

Then('I should see the product in cart', async ({ cartPagePo }: AllFixtures) => {
  const productCount = await cartPagePo.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

Then('the cart should display correct quantity', async ({ cartPagePo }: AllFixtures) => {
  const productCount = await cartPagePo.getProductCount();
  if (productCount > 0) {
    const firstProductQuantity = await cartPagePo.getProductQuantity('Blue Top');
    expect(firstProductQuantity).toBe('1');
  }
});

Then('the cart should display correct price', async ({ cartPagePo }: AllFixtures) => {
  const productPrice = await cartPagePo.getProductPrice('Blue Top');
  expect(productPrice).toContain('Rs. 500');
});

When('I update the product quantity to {string}', async ({ cartPagePo }: AllFixtures, quantity: string) => {
  await cartPagePo.updateQuantity('Blue Top', quantity);
});

Then('the cart should reflect the updated quantity', async ({ cartPagePo }: AllFixtures) => {
  const updatedQuantity = await cartPagePo.getProductQuantity('Blue Top');
  expect(updatedQuantity).toBe('2');
});

Then('the total price should be updated', async ({ cartPagePo }: AllFixtures) => {
  const totalPrice = await cartPagePo.getTotalPrice();
  expect(totalPrice).toContain('Rs. 1000');
});

When('I remove the product from cart', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.removeProduct('Blue Top');
});

Then('the cart should be empty', async ({ cartPagePo }: AllFixtures) => {
  const productCount = await cartPagePo.getProductCount();
  expect(productCount).toBe(0);
});

Then('I should see empty cart message', async ({ cartPagePo }: AllFixtures) => {
  const isEmpty = await cartPagePo.isCartEmpty();
  expect(isEmpty).toBe(true);
});

When('I proceed to checkout', async ({ cartPagePo }: AllFixtures) => {
  await cartPagePo.proceedToCheckout();
});

Then('I should be redirected to checkout page', async ({ page }: AllFixtures) => {
  await expect(page).toHaveURL(/.*\/checkout/);
});
