const { Given, When, Then } = require('cucumber');
const env = require('../support/environment').getInstance();
const hooks = require('../support/hooks');
const { selectors } = require('../support/selectors');

// STEP I toggle TestCafe IFrame function ON in the related page element;
// toggle it on and the use other steps for related page elements action, then toggle it off;
// STEP II toggles TestCafe IFrame function OFF in a randon page element.

When('I see the iFrame {string}', async function (keySelector) {
    this.consoleToReport('When', ' I\'m on iframe in the {string}', keySelector);
    await testController.switchToIframe(selectors[keySelector]());
    await this.addScreenshotToReport();
});

When('I leave the iFrame {string}', async function (keySelector) {
    this.consoleToReport('When', ' I off iframe in the {string}', keySelector);
    await testController.switchToMainWindow();
    await this.addScreenshotToReport();
});

When('I see the iFrame {string} and click {string}', async function (keySelector1, keySelector2) {
    this.consoleToReport('When', 'modal and click', keySelector1);
    await testController.switchToIframe(selectors[keySelector1]());
    await testController.click(selectors[keySelector2]())
    await testController.switchToMainWindow();
    await this.addScreenshotToReport();
});
