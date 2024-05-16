Feature: View mode management

    Background:
        Given one has navigated to the COOKBOOK app page "search"

    Scenario: One changes the viewing mode to see different recipe representations
        When one toggles the toggle for tool "select mode"
        When one selects recipes view mode "titles"
        Then recipes are displayed as "titles" elements
        When one selects recipes view mode "summaries"
        Then recipes are displayed as "summaries" elements
        When one selects recipes view mode "photos"
        Then recipes are displayed as "photos" elements



