const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

When('I type my user email', async function () {
    this.consoleToReport('When', 'I type my user email');
    await testController.typeText(selectors.emailFormField(), env.getUser());
});
When('I type my password', async function () {
    this.consoleToReport("When", 'I type my password');
    await testController.typeText(selectors.passwordFormField(), env.getPassword());
});
When('I type my password in the {string}', async function (keySelector) {
  this.consoleToReport('Then', 'I type my password in the {string}', keySelector);
  await testController.typeText(selectors[keySelector](), env.getPassword());
});

When('I type {string} in the {string} for new contact', async function (text, keySelector) {
  email = text + new Date().getTime() + "@email.com";
  this.consoleToReport('When', ' I type {string} in the {string}', email, keySelector);
  await testController.typeText(selectors[keySelector](), email);
});