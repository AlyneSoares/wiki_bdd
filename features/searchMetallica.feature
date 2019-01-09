Feature: Search for Metallica
    I want to search and confirm thepage title

    Scenario: Search for Metallica
        Given I open the page
        When I click the "banner"
        Then I should see "http://cancerdemama.com.br/campanha/" in the url

       