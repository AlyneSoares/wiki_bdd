const {Given, When, Then} = require('cucumber');
const wikiPage = require('../support/pages/wiki-page');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');

Given ('I open the Wikipedia page', async function() {
    await testController.navigateTo(env.getUrl()).wait(10000);
    await this.addScreenshotToReport();
});

When ('I am search for {string}', async function(text) {
    await testController.typeText(wikiPage.selectors.searchBox(), text);
});

When ('I am pressing search button', async function() {
    await testController.click(wikiPage.selectors.searchButton()).wait(10000);
});

Then ('I should see that the title page is {string}', async function(text) {
    await testController.expect(wikiPage.selectors.getTitle().innerText).contains(text);
});

When ('I click on change language', async function() {
    await testController.click(wikiPage.selectors.changeLanguage()).wait(10000);
});

Then ('I should see an {string} message', async function(text){
    await testController.expect(wikiPage.selectors.welcomeMessage().innerText).contains(text)
})