Feature: Cooking: scaling recipe

    Background:
        Given one has navigated to the COOKBOOK app page "cook/1.2.3"
    # Given one has toggled to view "2" recipes at the same time

    # Scenario: Recipe ingredient amounts can be scaled on and off using preset values
    #     When one toggles "is scaling" for recipe "1"
    #     Then scaling options "are" visible for recipe "1"
    #     When one toggles the preset scale by "1.5" X for recipe "1"
    #     Then scaling options "are not" visible for recipe "1"
    #     Then the set multiplier of "1.5" "is" visible for recipe "1"

    #     When one toggles "is scaling" for recipe "1"
    #     When one toggles the preset scale by "1.5" X for recipe "1"
    #     Then the set multiplier of "1.5" "is not" visible for recipe "1"

    # Scenario: Recipe data can be displayed in 1 or two columns
    #     When one toggles "has two columns" for recipe "1"
    #     Then ingredients and instructions are displayed in "2" columns for recipe "1"
    #     When one toggles "has two columns" for recipe "1"
    #     Then ingredients and instructions are displayed in "1" columns for recipe "1"

    # Scenario: One can toggle is cooking on and off for a recipe
    #     When one toggles "is cooking" for recipe "1"
    #     Then ingredients and instructions "have" checkboxes for recipe "1"
    #     When one toggles "is cooking" for recipe "1"
    #     Then ingredients and instructions "do not have" checkboxes for recipe "1"

    # Scenario: One can check ingredients' and instructions' checkboxes on and off for a recipe
    #     When one toggles "is cooking" for recipe "1"
    #     Then ingredient "2" of group "2" in recipe "1" check status "is not" checked
    #     Then ingredient "2" of group "2" in recipe "1" "is not" opaque
    #     When one "checks" the checkbox for ingredient "2" of group "2" for recipe "1"
    #     Then ingredient "2" of group "2" in recipe "1" "is" opaque
    #     Then ingredient "2" of group "2" in recipe "1" check status "is" checked

    #     When one "unchecks" the checkbox for ingredient "2" of group "2" for recipe "1"
    #     Then ingredient "2" of group "2" in recipe "1" "is not" opaque
    #     Then ingredient "2" of group "2" in recipe "1" check status "is not" checked

    Scenario: Recipe's favorite status can be toggled on and off
        When one toggles is favorite for recipe "1"
        Then recipe "1" "is" marked as favorite
        When one toggles is favorite for recipe "1"
        Then recipe "1" "is not" marked as favorite
