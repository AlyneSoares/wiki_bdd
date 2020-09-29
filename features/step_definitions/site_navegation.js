const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');

Given('I open the page', async function () {
  this.consoleToReport('Given', 'I open the page');
  await testController.navigateTo(env.getUrl()).wait(10000);
});

When('I navigate back to {string}', async function (keySelector) {
  this.consoleToReport('When', 'I navigate to');
  await testController.navigateTo(keySelector).wait(3000);
});
