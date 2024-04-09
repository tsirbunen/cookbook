Feature: Navigation

    Background:
        Given one has navigated to the COOKBOOK app
        Then the welcome page is visible

    Scenario: The navigation bar is always visible in different modes
        Given one has started using the app in "<mode>" mode
        Then the navigation bar is visible

        Examples:
            | mode      |
            | MEDIUM    |
            | WIDE      |
            | VERY_WIDE |

    Scenario: One can navigate from start page (recipes) to other pages in different modes
        Given one has started using the app in "MEDIUM" mode
        When one clicks menu item "<menu item>"
        Then the page "<page>" is navigated to
        Then the navigation bar is visible

        Examples:
            | menu item | page     |
            | cook      | cook     |
            | wizard    | wizard   |
            | settings  | settings |
            | shopping  | shopping |

