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
