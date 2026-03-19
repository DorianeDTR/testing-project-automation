Feature: Add Products in Cart

  As a customer
  I want to add multiple products to my cart
  So that I can purchase them together
  
  @Automated
  Scenario: Add two different products to cart
    Given I am on homepage
    And the home page is visible successfully
    When I click on 'Products' button
    Then I am navigated to ALL PRODUCTS page successfully
    And the products list is visible
    When I hover over "first" product
    And I click Add to cart button on "first" product
    And I handle: added to cart modal
    And I click Continue Shopping in modal
    When I hover over "second" product
    And I click Add to cart button on "second" product
    And I handle: added to cart modal
    And I click View Cart in modal
    Then both products are added to Cart
    And their prices are displayed correctly
    And their quantities are displayed correctly
    And their total price is calculated correctly

  @Automated
  Scenario: Complete Purchase Order with Payment and Invoice (Test Case 24)
    Given I am on homepage
    And the home page is visible successfully
    When I add products to cart
    And I click 'Cart' button
    Then the cart page is displayed
    When I click Proceed To Checkout
    And I click 'Register / Login' button
    And I fill all details in Signup and create account
    Then 'ACCOUNT CREATED!' is visible
    And I click 'Continue' button
    And 'Logged in as username' is visible at top
    When I click 'Cart' button
    And I click 'Proceed To Checkout' button
    Then Address Details and Review Your Order are visible
    When I enter description in comment text area and click 'Place Order'
    And I enter payment details: Name on Card, Card Number, CVC, Expiration date
    And I click 'Pay and Confirm Order' button
    Then success message 'Your order has been placed successfully!' is visible
    When I click 'Download Invoice' button
    Then invoice is downloaded successfully
    And I click 'Continue' button
    When I click 'Delete Account' button
    Then 'ACCOUNT DELETED!' is visible
    And I click 'Continue' button
