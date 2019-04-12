const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

//Action steps: click buttons, type text, select elements, press key, scroll
When('I click the {string}', async function (keySelector) {
  this.consoleToReport('When', 'I click the {string}', keySelector);
  await testController.click(selectors[keySelector]());
});

When('I hover on {string}', async function (keySelector) {
  this.consoleToReport('When', 'I hover on {string}', keySelector);
  await testController.hover(selectors[keySelector]());
});

When('I scroll on {string}', async function (keySelector) {
  this.consoleToReport('When', 'I scroll on {string}', keySelector);
  await testController.hover(selectors[keySelector]());
});

When('I type {string} in the {string}', async function (text, keySelector) {
  this.consoleToReport('When', 'I type {string} in the {string}', text, keySelector);
  await testController.typeText(selectors[keySelector](), text);
});

When('I wait {string} seconds', async function (text) {
  this.consoleToReport('When', 'I wait {string} seconds', text);
  const sec = parseInt(text) * 1000;
  await testController.wait(sec);
});

When('I double click the {string}', async function (keySelector) {
  this.consoleToReport('When', 'I double click in the {string}', keySelector);
  await testController.doubleClick(selectors[keySelector]());
});

When('I press the {string} key', async function (key) {
  this.consoleToReport('When', 'I press the {string} key', key);
  // https://devexpress.github.io/testcafe/documentation/test-api/actions/press-key.html
  await testController.pressKey(key);
});

//All pages: get URL
Then('I should see {string} in the url', async function (text) {
  this.consoleToReport('Then', 'I should see {string} in the url', text);
  const url = await env.getPageUrl(testController);
  await testController.expect(url).contains(text);
  await this.addScreenshotToReport();
});

//step to confirm messages and screenshot
Then('I should see {string} in the {string}', async function (text, keySelector) {
  this.consoleToReport('Then', 'I should see {string} in the {string}', text, keySelector);
  await testController.expect(selectors[keySelector]().innerText).contains(text);
  await this.addScreenshotToReport();
});

//Step to confirm if the element appears
Then('I should see the {string}', async function (keySelector) {
  this.consoleToReport('Then', 'I should see the {string}', keySelector);
  await testController.expect(selectors[keySelector]().exists).ok();
  await this.addScreenshotToReport();
});

//Step to debugger
Then('I debuggin', async function () {
  this.consoleToReport('Then', 'I debuggin');
  await testController.debug();
});

// data for table

When(/I type the data:$/, async function (table) {
  this.consoleToReport('When', 'I type the data:{string}', table.rawTable.toString());
  var data = table.rawTable;
  for (let i = 1; i < data.length; i++) {
    let value = data[i][1];
    if (value.includes('date()')) {
      value = value.replace(/date\(\)/, (new Date()).getTime());
    }
    await testController.typeText(selectors[data[i][0]](), value);
  }
});

//compare values
Then('I should see {string} is the same as {string}', async function (keySelector1, keySelector2) {
  var data1 = await selectors[keySelector1]().innerText;
  var data2 = await selectors[keySelector2]().innerText;
  await testController.expect(data2).contains(data1);
  this.consoleToReport('Then', 'I should see {string} is the same as {string}', keySelector1, keySelector2);
  await this.addScreenshotToReport();
});

Then('I should see {string} in the input {string}',async function (text, keySelector){
  this.consoleToReport('Then', 'I should see {string} in the input {string}', text, keySelector);
  await testController.expect(selectors[keySelector]().value).contains(text);
});
