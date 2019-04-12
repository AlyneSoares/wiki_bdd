const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');
const {AfterAll, setDefaultTimeout, Before, After, Status} = require('cucumber');
const errorHandling = require('../support/errorHandling');
const envConfig = require('../../env.json');

let isTestCafeError = false;
let attachScreenshotToReport = true;
let cafeRunner = null;
let n = 0;
let scenarioCounter = 1;
setDefaultTimeout(40000);

function createTestFile() {
    fs.writeFileSync('test.js',
        'import errorHandling from "./features/support/errorHandling.js";\n' +
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +
        '.httpAuth({username: "admin", password: "admin"})\n' +
        'test\n' +
        '("test", testControllerHolder.capture)\n' +
        '.after(async t => {await errorHandling.ifErrorTakeScreenshot(t)})');
}

function runTest(options,{port1,port2,browser},iteration) {
    createTestCafe('localhost', port1  + iteration, port2 + iteration)
        .then(function(tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();

            return runner
                .src('./test.js')
                .screenshots('reports/screenshots/', true)
                .browsers(browser)
                .run(options)
                .catch(function(error) {
                    console.error(error);
                });
        })
        .then(function(report) {
        });
}


Before(function(testCase) {

    if(this.verbose){
      var blue = '\033[0;34m',yellow = '\033[0;93m', nc = '\033[0m', bold = '\033[1m';
      var date = new Date();
      console.log(`\n${blue}${bold}run scenario: (${yellow}${scenarioCounter}${blue})${nc}${testCase.pickle.name}${nc} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      scenarioCounter++;
    }
    setDefaultTimeout(this.setTimeout());
    runTest(this.getOptions(), this.getSettings(), n);
    createTestFile();
    n++
    return this.waitForTestController.then(function(testController) {
        return testController.maximizeWindow();
    });
});

After(function() {
    testControllerHolder.free();
    try {
      if (fs.existsSync('test.js')) {
        fs.unlinkSync('test.js');
      }
    } catch(err) {
    }
});

After(function(testCase) {
    const world = this;
    if (testCase.result.status === Status.FAILED) {
        isTestCafeError = true;
        attachScreenshotToReport = world.attachScreenshotToReport;
        errorHandling.addErrorToController();
    }
});

AfterAll(function() {
    let intervalId = null;

    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 100);
    }

    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
            clearInterval(intervalId);
        }
    }

    waitForTestCafe();
});

const getIsTestCafeError = function() {
    return isTestCafeError;
};

const getAttachScreenshotToReport = function() {
    return attachScreenshotToReport;
};

exports.getIsTestCafeError = getIsTestCafeError;
exports.getAttachScreenshotToReport = getAttachScreenshotToReport;
