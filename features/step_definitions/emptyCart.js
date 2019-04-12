const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

Given('I have no products in my cart', async function () {
    this.consoleToReport('Given', 'I have no products in my cart');
    var emptyCart = await selectors.emptyCartIcon().exists;
    while (emptyCart != true) {
        await testController.click(selectors.deleteProductInMinicart());
    }
});