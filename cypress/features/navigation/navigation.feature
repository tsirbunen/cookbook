Feature: Navigation

    Background:
        Given one has navigated to the COOKBOOK app
        Then the welcome page is visible

    Scenario: The navigation bar is always visible in different modes
        Given one has started using the app in "<mode>" mode
        Then the navigation bar is visible

        Examples:
            | mode   |
            | MEDIUM |
            | WIDE   |


    Scenario: One can navigate from start page (recipes) to other pages in different modes
        Given one has started using the app in "MEDIUM" mode
        When one clicks menu item "<menu item>"
        Then the page "<page>" is navigated to
        Then the navigation bar is visible

        Examples:
            | menu item | page     |
            | search    | search   |
            | cook      | cook     |
            | wizard    | wizard   |
            | settings  | settings |
            | shopping  | shopping |


# FIXME: Fix the "GitHub" Cypress mocks and comment these back in
#         | account   | account  |


# Scenario: One can navigate from the main account page to the email sub pages
#     Given one has started using the app in "MEDIUM" mode
#     When one clicks menu item "account"
#     When one clicks the "<sub page button>" button to navigate to that sub page
#     Then the account sub page "<sub page>" is navigated to
#     When one clicks the email account "<action button>"
#     Then the account sub page "<second sub page>" is navigated to

#     Examples:
#         | sub page button | sub page | action button              | second sub page |
#         | WITH EMAIL      | email    | CREATE ACCOUNT             | create          |
#         | WITH EMAIL      | email    | SIGN IN                    | signin          |
#         | WITH EMAIL      | email    | REQUEST VERIFICATION EMAIL | verification    |
