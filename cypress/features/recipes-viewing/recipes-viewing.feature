Feature: Viewing recipes

    Background:
        Given one has navigated to the COOKBOOK app page "recipes"

    Scenario: One toggles the viewing management tools open and close in different use modes
        Given use mode is "<mode>"
        Then the header toggles are visible
        Then management tool "<tool>" "<isBefore>" visible
        When one toggles the toggle for tool "<tool>"
        Then management tool "<tool>" "<isAfter>" visible
        When one toggles the toggle for tool "<tool>"
        Then management tool "<tool>" "<isFinally>" visible

        Examples:
            | mode      | tool           | isBefore | isAfter | isFinally |
            | MOBILE    | select mode    | is not   | is      | is not    |
            | NARROW    | select mode    | is not   | is      | is not    |
            | MEDIUM    | select mode    | is not   | is      | is not    |
            | WIDE      | select mode    | is not   | is      | is not    |
            | VERY_WIDE | select mode    | is not   | is      | is not    |
            | MOBILE    | picked recipes | is not   | is      | is not    |
            | NARROW    | picked recipes | is not   | is      | is not    |
            | MEDIUM    | picked recipes | is not   | is      | is not    |
            | WIDE      | picked recipes | is not   | is      | is not    |
            | VERY_WIDE | picked recipes | is not   | is      | is not    |
            | MOBILE    | filtering      | is not   | is      | is not    |
            | NARROW    | filtering      | is not   | is      | is not    |
            | MEDIUM    | filtering      | is not   | is      | is not    |
            | WIDE      | filtering      | is not   | is      | is not    |
            | VERY_WIDE | filtering      | is not   | is      | is not    |


    Scenario: Several viewing managenent tools can be opened simultaneously
        Given use mode is "<mode>"
        Then the header toggles are visible
        Then all viewing management tools are "hidden"
        When one toggles the toggle for tool "select mode"
        When one toggles the toggle for tool "picked recipes"
        When one toggles the toggle for tool "filtering"
        Then all viewing management tools are "visible"

        Examples:
            | mode   |
            | MOBILE |
            | MEDIUM |
            | MOBILE |
            | MEDIUM |
            | MOBILE |
            | MEDIUM |
