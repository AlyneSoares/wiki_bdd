Feature: Search for Metallica
    I want to search and confirm thepage title

    Scenario: Search for Metallica
       
       Given I open the Wikipedia page 
       When I am search for "Metallica"
       When I am pressing search button
       Then I should see that the title page is "Metallica"

    Scenario: Change language
        Given I open the Wikipedia page
        When I click on change language
        Then I should see an "Wellcome to" message
