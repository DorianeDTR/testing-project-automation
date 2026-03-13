Feature: Register User
  Test Case 1: Register User

  @Automated
  Scenario: Complete user registration flow
    Given I am on the homepage
    Then 'New User Signup!' is visible
    When I enter valid data
    When I fill account details with exhaustive information
    Then account creation confirmation is displayed
    When I log in
    Then I delete my account
