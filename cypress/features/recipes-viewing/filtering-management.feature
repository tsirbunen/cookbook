Feature: Filtering management

    Background:
        Given one has navigated to the COOKBOOK app page "search"
        Then "more than" "2" recipes are displayed


    Scenario: Recipes filtering form contains all the necessary widgets
        When one toggles the toggle for tool "filtering"
        Then the form contains the following elements:
            | element               |
            | categories selection  |
            | languages selection   |
            | ingredients selection |
            | action buttons        |


    Scenario: One can filter recipes by category
        When one toggles the toggle for tool "filtering"
        Then "exactly" "0" recipes are displayed
        Then the number of set filters shown in toggle badge is "0"
        When one clicks the "category" button "SNACK"
        When one clicks the "category" button "DESSERT"
        Then the number of set filters shown in toggle badge is "0"
        When one submits the form
        Then the number of set filters shown in toggle badge is "1"
        Then "exactly" "2" recipes are displayed
        When one toggles the toggle for tool "filtering"
        When one clears the form
        When one submits the form
        Then the number of set filters shown in toggle badge is "0"
        Then "more than" "2" recipes are displayed


    Scenario: One can filter recipes by ingredients
        When one toggles the toggle for tool "filtering"
        When one enters text "BLUEBERRY" into the ingredients text input area
        When one submits the form
        Then the number of set filters shown in toggle badge is "1"
        Then "exactly" "1" recipes are displayed
        When one toggles the toggle for tool "filtering"
        When one clears the form
        When one submits the form
        Then the number of set filters shown in toggle badge is "0"
        Then "more than" "2" recipes are displayed


    Scenario: One can filter recipes by multiple filters
        When one toggles the toggle for tool "filtering"
        When one clicks the "category" button "SNACK"
        When one clicks the "category" button "DESSERT"
        When one enters text "BLUEBERRY" into the ingredients text input area
        When one submits the form
        Then the number of set filters shown in toggle badge is "2"
        Then "exactly" "1" recipes are displayed
        When one toggles the toggle for tool "filtering"
        When one clears the form
        When one submits the form
        Then the number of set filters shown in toggle badge is "0"
        Then "more than" "2" recipes are displayed