const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');
const {AfterAll, setDefaultTimeout, Before, After, Status} = require('cucumber');
const errorHandling = require('../support/errorHandling');
const envConfig = require('../../env.json');

var reporter = require('cucumber-html-reporter');
let isTestCafeError = false;
let attachScreenshotToReport = true;
let cafeRunner = null;

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

function runTest(options) {
    var port = undefined;
    createTestCafe('localhost', port , port)
        .then(function(tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./test.js')
                .screenshots('reports/screenshots/', true)
                .browsers(options.browser)
                .run(options)
                .catch(function(error) {
                    console.error(error);
                });
        })
        .then(function(report) {
        });
}


Before(function(testCase) {
    var blue = '\033[0;34m', nc = '\033[0m', bold = '\033[1m';
    var date = new Date();
    console.log(`\n${blue}${bold}run scenario:${nc} ${testCase.pickle.name}${nc} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    setDefaultTimeout(this.setTimeout());
    runTest(this.setOptions());
    createTestFile();
    return this.waitForTestController.then(function(testController) {
        return testController.maximizeWindow();
    });
});

After(function() {
    testControllerHolder.free();
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
        intervalId = setInterval(checkLastResponse, 500);
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
