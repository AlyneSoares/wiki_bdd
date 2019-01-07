const {setWorldConstructor} = require('cucumber');
const testControllerHolder = require('./testControllerHolder');
const base64Img = require('base64-img');
const env = require('./environment').getInstance();

function CustomWorld({attach, parameters}) {
    env.setEnvironment(parameters.env || env.TEST);
    this.waitForTestController = testControllerHolder.get()
        .then(function(tc) {
            return testController = tc;
        });

    this.attach = attach;

    this.setBrowser = function() {
        if (parameters.browser === undefined) {
            return 'chrome';
        } else {
            return parameters.browser;
        }
    };

    this.setOptions = function(){
      var  options = {};
        options.browser = parameters.browser;
        options.speed = parameters.speed;
        options.timeout = parameters.timeout
        options.stopOnFirstFail = parameters.stopOnFirstFail;
        options.pageLoadTimeout = parameters.pageLoadTimeout;
        options.assertionTimeout = parameters.assertionTimeout;
        options.selectorTimeout = parameters.selectorTimeout;
        if(parameters.debugMode){
          options.debugMode = parameters.debugMode;
        }

        return options;
    }

    this.setSpeed = function() {
      if (parameters.speed === undefined) {
          return 1;
      } else {
          return parameters.speed;
      }
    };
    this.setTimeout = function(){
      if(parameters.debugMode){
        return 60*1000;
      }
      if (parameters.timeout === undefined) {
        return 40000;
      } else {
          return parameters.timeout;
      }
    }
    this.addScreenshotToReport = function() {
        if (process.argv.includes('--format') || process.argv.includes('-f') || process.argv.includes('--format-options')) {
            testController.takeScreenshot()
                .then(function(screenshotPath) {
                    const imgInBase64 = base64Img.base64Sync(screenshotPath);
                    const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
                    return attach(imageConvertForCuc, 'image/png');
                })
                .catch(function(error) {
                    console.warn('The screenshot was not attached to the report');
                });
        } else {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
    };

    this.attachScreenshotToReport = function(pathToScreenshot) {
        const imgInBase64 = base64Img.base64Sync(pathToScreenshot);
        const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
        return attach(imageConvertForCuc, 'image/png');
    };

    this.consoleToReport = function (type, testCase, ...string) {
      if(parameters.verbose){
        var blue = '\033[0;34m', yellow = '\033[0;93m',nc = '\033[0m', bold = '\033[1m';
        string.map(function(text){
          testCase = testCase.replace(/({string})/,`"${text}"`);
        });

        console.log(`\n${blue}${bold}run steps: ${nc} ${yellow} [${type.toUpperCase()}]  ${nc} ${testCase}`);
      }
  }

  this.isVariableAndGetValueFromVariables = function(text){
    if(parameters.variables[text] != undefined || parameters.variables[text] != null){
        return parameters.variables[text];
    }
    return text;
  }
}

setWorldConstructor(CustomWorld);
