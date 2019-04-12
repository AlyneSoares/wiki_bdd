const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

//Action steps: click buttons, type text, select elements, press key, scroll
When('I click in plan on {string} by title {string}', async function (keySelector,title) {
  this.consoleToReport('When', 'I click in plan on {string} by title {string}', keySelector, title);
  await testController.click( await selectors[keySelector]().withText(title).find('button'));
});

When('I click in plan on {string} by index {string}', async function (keySelector,index) {
  this.consoleToReport('When', 'I click in plan on {string} by title {string}', keySelector, index);
  await testController.click( await selectors[keySelector]().nth(index).find('button'));
});

When('I add in the cart the by title {string}', async function (title) {
  this.consoleToReport('When', 'I add in the cart the by title {string}',title);
  var plan = await selectors.getByQuery('.wave-plan-box').withText(title).filterVisible();
  var button = await plan.find('button').filter('#cc-planDetailsConfigure');
  var link = await plan.find('a').filter('.btn.btn-secondary.rounded');

  if(await button.exists && await button.visible){
    await testController.click(button);
  }else if(await link.exists && await link.visible){
    await testController.click(link);
  }
});

When('I add in the cart the plan', async function () {
  this.consoleToReport('When', 'I add the plan in the cart');
  await testController.click( await selectors['plansAddToCart']().filterVisible());
});

