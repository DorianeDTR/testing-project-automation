Feature: Register User
  Test Case 1: Register User

  Scenario: Complete user registration flow
    Given the home page is visible successfully
    When I click on 'Signup / Login' button
    Then 'New User Signup!' is visible
    When I enter valid data
    When I fill account details with exhaustive information
    And I select checkbox 'Sign up for our newsletter!'
    And I select checkbox 'Receive special offers from our partners!'
    And I fill address details with first name, last name, company, address, country, state, city, zipcode and mobile number
    And I click 'Create Account button'
    Then 'ACCOUNT CREATED!' is visible
    When I click 'Continue' button
    Then 'Logged in as username' is visible
    When I click 'Delete Account' button
    Then 'ACCOUNT DELETED!' is visible
    And I click 'Continue' button
