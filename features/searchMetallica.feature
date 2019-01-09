Feature: Search for Metallica
    I want to search and confirm thepage title

    Scenario: Search for Metallica
        Given I open the page
        When I type "Metallica wiki" in the "searchBoxGoogle"
        When I click the "searchButtonGoogle"
        When I click the "searchResult"
        Then I should see "Metallica" in the "pageTitle"

       