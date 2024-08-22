Feature: Cooking: scaling recipe

    Background:
        Given one has navigated to the COOKBOOK app page "search"
        Given one has selected three recipes to cook
        When one clicks menu item "cook"
        Then the page "cook" is navigated to


    Scenario: Recipe ingredient amounts can be scaled on and off using preset values
        When one toggles "is scaling" for recipe at "0"
        Then scaling options "are" visible for recipe at "0"
        When one toggles the preset scale by "1.5" X for recipe at "0"
        Then scaling options "are not" visible for recipe at "0"
        Then the set multiplier of "1.5" "is" visible for recipe at "0"

        When one toggles "is scaling" for recipe at "0"
        When one toggles the preset scale by "1.5" X for recipe at "0"
        Then the set multiplier of "1.5" "is not" visible for recipe at "0"


    Scenario: Recipe data can be displayed in 1 or two columns
        When one toggles "has two columns" for recipe at "0"
        Then ingredients and instructions are displayed in "2" columns for recipe at "0"
        When one toggles "has two columns" for recipe at "0"
        Then ingredients and instructions are displayed in "1" columns for recipe at "0"

    Scenario: One can toggle is cooking on and off for a recipe
        When one toggles "is cooking" for recipe at "0"
        Then ingredients and instructions "have" checkboxes for recipe at "0"
        When one toggles "is cooking" for recipe at "0"
        Then ingredients and instructions "do not have" checkboxes for recipe at "0"

    Scenario: One can check ingredients' and instructions' checkboxes on and off for a recipe
        When one toggles "is cooking" for recipe at "0"
        Then the "first" ingredient in recipe at "0" check status "is not" checked
        Then the "first" ingredient in recipe at "0" "is not" opaque
        When one "checks" the checkbox for the "first" ingredient in recipe at "0"
        Then the "first" ingredient in recipe at "0" check status "is" checked
        Then the "first" ingredient in recipe at "0" "is" opaque
        When one "unchecks" the checkbox for the "first" ingredient in recipe at "0"
        Then the "first" ingredient in recipe at "0" check status "is not" checked
        Then the "first" ingredient in recipe at "0" "is not" opaque


    Scenario: Recipe's favorite status can be toggled on and off
        When one toggles "is favorite" for recipe at "0"
        Then recipe at "0" "is" marked as favorite
        When one toggles "is favorite" for recipe at "0"
        Then recipe at "0" "is not" marked as favorite

    Scenario: Number of displayed recipes can be changed
        Then "1" recipes are displayed
        When one toggles to view "2" recipes at the same time
        Then "2" recipes are displayed
        When one toggles to view "3" recipes at the same time
        Then "3" recipes are displayed
        When one toggles to view "1" recipes at the same time
        Then "1" recipes are displayed
        When one toggles to view "3" recipes at the same time
        Then "3" recipes are displayed
        When one toggles to view "1" recipes at the same time
        Then "1" recipes are displayed

    Scenario: All selections can be cleared at once (apart from is favorite)
        When one toggles "is scaling" for recipe at "0"
        When one toggles the preset scale by "1.5" X for recipe at "0"
        When one toggles "is cooking" for recipe at "0"
        When one "checks" the checkbox for the "first" ingredient in recipe at "0"
        When one toggles "has two columns" for recipe at "0"

        Then the set multiplier of "1.5" "is" visible for recipe at "0"
        Then ingredients and instructions "have" checkboxes for recipe at "0"
        Then the "first" ingredient in recipe at "0" "is" opaque
        Then ingredients and instructions are displayed in "2" columns for recipe at "0"

        When one toggles "clear all" for recipe at "0"
        Then the set multiplier of "1.5" "is not" visible for recipe at "0"
        Then ingredients and instructions "do not have" checkboxes for recipe at "0"
        Then the "first" ingredient in recipe at "0" "is not" opaque
        Then ingredients and instructions are displayed in "1" columns for recipe at "0"


    Scenario: Toggle actions are directed for the correct recipe (when viewing multiple recipes)
        When one toggles to view "2" recipes at the same time
        Then scaling options "are not" visible for recipe at "0"
        Then scaling options "are not" visible for recipe at "1"
        Then ingredients and instructions "do not have" checkboxes for recipe at "0"
        Then ingredients and instructions "do not have" checkboxes for recipe at "1"


        When one toggles "is scaling" for recipe at "1"
        Then scaling options "are" visible for recipe at "1"
        Then scaling options "are not" visible for recipe at "0"
        When one toggles the preset scale by "1.5" X for recipe at "1"
        Then scaling options "are not" visible for recipe at "1"
        Then the set multiplier of "1.5" "is" visible for recipe at "1"

        When one toggles "is cooking" for recipe at "1"
        Then ingredients and instructions "have" checkboxes for recipe at "1"
        Then ingredients and instructions "do not have" checkboxes for recipe at "0"
        When one toggles "is cooking" for recipe at "1"
        Then ingredients and instructions "do not have" checkboxes for recipe at "0"



