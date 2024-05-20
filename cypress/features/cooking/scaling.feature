Feature: Cooking: scaling recipe

    Background:
        Given one has navigated to the COOKBOOK app page "cook/1.2.3"
        Given one has toggled to view "2" recipes at the same time

    Scenario: Recipe ingredient amounts can be scaled on and off using preset values
        When one toggles is scaling recipe "1"
        Then scaling options "are" visible for recipe "1"
        When one toggles the preset scale by "1.5" X for recipe "1"
        Then scaling options "are not" visible for recipe "1"
        Then the set multiplier of "1.5" "is" visible for recipe "1"

        When one toggles is scaling recipe "1"
        When one toggles the preset scale by "1.5" X for recipe "1"
        Then the set multiplier of "1.5" "is not" visible for recipe "1"
