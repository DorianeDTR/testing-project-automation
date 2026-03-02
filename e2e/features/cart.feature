
Feature: Add Products in Cart

  As a customer
  I want to add multiple products to my cart
  So that I can purchase them together

  @Automated
  Scenario: Add two different products to cart
    Given I am on the homepage
    And the home page is visible successfully
    When I click on 'Products' button
    Then I am navigated to ALL PRODUCTS page successfully
    And the products list is visible
    When I hover over the first product and click 'Add to cart'
    And I click Continue Shopping button
    And I hover over the second product and click 'Add to cart'
    And I click View Cart button
    Then both products are added to Cart
    And their prices are displayed correctly
    And their quantities are displayed correctly
    And their total price is calculated correctly
