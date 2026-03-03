
Feature: Login feature

  Background:
    Given I begin my journey on the homepage

  @Automated
  Scenario: Correctly login
    When I go to the login page
    Then I fill the login form with valid data
    Then I am redirected to the homepage