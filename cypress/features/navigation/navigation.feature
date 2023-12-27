Feature: Navigation

    Scenario: One can open the navigation drawer in mobile mode
        Given one has navigated to the COOKBOOK app url in "MOBILE" mode
        When one clicks the menu button to open the navigation drawer
        Then the navigation drawer becomes visible
        Then the navigation bar is not available

    Scenario: One can navigate from launch page to other pages in mobile mode
        Given one has opened the navigation drawer
        When one taps "<menu item>"
        Then the "<page>" is navigated to
        Then the navigation drawer is closed

        Examples:
            | menu item | page      |
            | cook      | cook      |
            | wizard    | wizard    |
            | settings  | settings  |
            | shopping  | shopping  |
            | favorites | favorites |

    Scenario: The navigation bar is always visible in modes other than mobile
        Given one has navigated to the COOKBOOK app url in "<mode>" mode
        Then the navigation bar is visible
        Then the navigation drawer is not available

        Examples:
            | mode   |
            | NARROW |
            | MEDIUM |
            | WIDE   |

    Scenario: One can navigate from launch page to other pages in modes other than mobile
        Given one has navigated to the COOKBOOK app url in "NARROW" mode
        When one clicks "<menu item>"
        Then the "<page>" is navigated to
        Then the navigation bar is visible

        Examples:
            | menu item | page      |
            | cook      | cook      |
            | wizard    | wizard    |
            | settings  | settings  |
            | shopping  | shopping  |
            | favorites | favorites |

