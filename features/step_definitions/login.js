const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

//Login Step by Step
Given('I open the page', async function () {
    this.consoleToReport('Given', 'I open the page');
    await testController.navigateTo(env.getUrl()).wait(10000);
});
When('I type my user email', async function () {
    this.consoleToReport('When', 'I type my user email');
    await testController.typeText(selectors.emailFormField(), env.getUser());
});
When('I type my password', async function () {
    this.consoleToReport("When", 'I type my password');
    await testController.typeText(selectors.passwordFormField(), env.getPassword());
});