Feature: Picked recipes management

    Background:
        Given one has navigated to the COOKBOOK app page "recipes"

    Scenario: One views the picked recipes and changes the picked recipes
        When one toggles the toggle for tool "picked recipes"
        Then the number of picked recipes shown in toggle badge is "0"
        Then the number of picked recipes shown in tool is "0"

        When one clicks the displayed recipe at index "0"
        Then the number of picked recipes shown in toggle badge is "1"
        Then the number of picked recipes shown in tool is "1"
        Then the selected title is the same in the tool and the display

        When one clicks the displayed recipe at index "1"
        When one clicks the displayed recipe at index "2"
        When one clicks the displayed recipe at index "3"
        Then the number of picked recipes shown in toggle badge is "4"
        Then the number of picked recipes shown in tool is "4"

        When one clicks the displayed recipe at index "0"
        Then the number of picked recipes shown in toggle badge is "3"
        Then the number of picked recipes shown in tool is "3"

        When one clicks the picked recipe in the tool at index "0"
        Then the number of picked recipes shown in toggle badge is "2"
        Then the number of picked recipes shown in tool is "2"


