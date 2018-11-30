const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');
var totalPrice = 0;

//Login Step by Step
Given('I open the Google page', async function() {
    this.consoleToReport('Given', 'I open the Google page');
    await testController.navigateTo(env.getUrl()).wait(10000);
});

//Action steps: click buttons, type text, select elements
When('I click the {string}', async function (keySelector) {
    this.consoleToReport('When', ' I click the {string}', keySelector);
    await testController.click(selectors[keySelector]())
});

When('I hover on {string}', async function (keySelector) {
    this.consoleToReport('When', 'I hover on {string}', keySelector);
    await testController.hover(selectors[keySelector]());
});

When('I type {string} in the {string}', async function (text, keySelector) {
    this.consoleToReport('When', ' I type {string} in the {string}', text, keySelector);
    await testController.typeText(selectors[keySelector](), text);
});

When('I wait {string} seconds', async function (text) {
    this.consoleToReport('When', ' I wait {string} seconds', text);
    const sec = parseInt(text) * 1000;
    await testController.wait(sec);
});

When('I press key enter', async function(key){
await testController.pressKey('enter');
});


//All pages: get URL
Then('I should see {string} in the url', async function (text) {
    this.consoleToReport('Then', ' I should see {string} in the url', text);
    const url = await env.getPageUrl(testController);
    await testController.expect(url).contains(text);
});

//step to confirm messages
Then('I should see {string} in the {string}', async function (text, keySelector) {
    this.consoleToReport('Then', ' I should see {string} in the {string}', text, keySelector);
    await testController.expect(selectors[keySelector]().innerText).contains(text);
    await this.addScreenshotToReport();
});

//Step to confirm if the element appears
Then('I should see the {string}', async function (keySelector) {
    this.consoleToReport('Then', ' I should see the {string}', keySelector);
    await testController.expect(selectors[keySelector]()).ok();
});

// Price validation steps
Then('I see the total price in checkout', async function () {
    this.consoleToReport('Then', 'I see total price', orderTotal);
    totalPrice = testController.selectors.orderTotal().innerText;
    totalPrice = parseFloat(totalPrice.replace("$", ""));
});

Then('I see the order total is correct in order confirmation', async function () {
    this.consoleToReport('Then', ' I see the order total is correct');
    var totalPriceConfirmation = testController.selectors.orderConfirmationTotal().innerText;
    totalPriceConfirmation = parseFloat(totalPriceConfirmation.replace("$", ""));
    await testController.expect(totalPriceConfirmation).eql(totalPrice);
});

