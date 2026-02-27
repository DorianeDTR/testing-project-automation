@Automated
Feature: Shopping Cart Management

  As a customer
  I want to manage my shopping cart
  So that I can purchase products

  Background:
    Given I am on the homepage
    When I add a product to cart
    Then the product should be added to cart

  Scenario: View cart contents
    When I navigate to the cart
    Then I should see the product in cart
    And the cart should display correct quantity
    And the cart should display correct price

  Scenario: Update product quantity in cart
    When I navigate to the cart
    And I update the product quantity to "2"
    Then the cart should reflect the updated quantity
    And the total price should be updated

  Scenario: Remove product from cart
    When I navigate to the cart
    And I remove the product from cart
    Then the cart should be empty
    And I should see empty cart message

  Scenario: Proceed to checkout from cart
    When I navigate to the cart
    And I proceed to checkout
    Then I should be redirected to checkout page
