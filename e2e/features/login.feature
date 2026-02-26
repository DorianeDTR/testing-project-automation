
Feature: Login feature

  Background:
    Given I go to the login page

  Scenario: Correctly login
    When I fill the login forme with valid data
    Then I am redirected to the homepage