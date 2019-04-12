const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');
var initialPrice = 0;
var comparisonPrice = 0;
var initialString = "";
var comparisonString = "";

// Price validation steps:

//Get the price/ numeric value from a selector
Then('I should get the value of {string}', async function (keySelector) {
    this.consoleToReport('Then', 'I should get the value of {string}', keySelector);
    var intValor = await selectors[keySelector]().innerText;
    initialPrice = parseFloat(intValor.replace(/[^0-9-.]/g, ''));
    await this.addScreenshotToReport();
});

//Compares the price/ numeric value from a previous selector
Then('I should check the {string} is correct', async function (keySelector) {
    this.consoleToReport('When', 'I should check the {string} is correct', keySelector);
    var totalCheckout = await selectors[keySelector]().innerText;
    comparisonPrice = parseFloat(totalCheckout.replace(/[^0-9-.]/g, ''));
    await testController.expect(comparisonPrice).eql(initialPrice);
    await this.addScreenshotToReport();
});

//Comparsion of strings into selectors
//Get the texts from a selector
Then('I should see the text in {string}', async function (keySelector) { 
    this.consoleToReport('Then', ' I validate initialString in the {string}', keySelector); 
    initialString = await selectors[keySelector]().innerText;
    this.consoleToReport('initial element text', initialString); 
    await this.addScreenshotToReport();
}); 

//Compares the texts from a previous selector
Then('I should check the text in {string} is correct', async function (keySelector) { 
    this.consoleToReport('Then', ' I validate comparisonString in the {string}', keySelector); 
    comparisonString = await selectors[keySelector]().innerText; 
    await testController.expect(initialString).contains(comparisonString);
    await this.addScreenshotToReport();
 });