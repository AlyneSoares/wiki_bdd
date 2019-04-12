const args = require('minimist')(process.argv.slice(2));
const spawn = require('child_process').spawn;
const util = require('util');
const os = require('os');
const path = require('path');
const environmentSettings = require('./env.json');
const help = require('./features/support/help');
const fs = require('fs');
const moment = require('moment');
const report = require('multiple-cucumber-html-reporter');
const options = require('./reporter-settings.json');
const {generateFooter} = require('./features/support/pageFooter');
const {generate64Image} = require('./features/support/generateBase64Image');

let startTime = new moment();
let browser = environmentSettings.browser || 'chrome';
let environment = environmentSettings.defaultEnvironment || 'test';
let reportsFolder = path.join(__dirname, 'reports');
let reportFile = path.join(__dirname, 'reports', 'report.json');
let features = '';
let timeout = environmentSettings.timeout || 40000;
let verbose = environmentSettings.verbose || false;

//testcafe runner options(https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run)
let speed = environmentSettings.speed || 1;
let stopOnFirstFail =  environmentSettings.stopOnFirstFail || false;
let pageLoadTimeout =  environmentSettings.pageLoadTimeout || 10000;
let assertionTimeout =  environmentSettings.assertionTimeout || 5000;
let selectorTimeout =  environmentSettings.selectorTimeout || 10000;
let skipJsErrors =  environmentSettings.skipJsErrors || false;
let skipUncaughtErrors =  environmentSettings.skipUncaughtErrors || false;
let userAgent =  environmentSettings.userAgent || false;

let port = undefined;

const allowesdOptions = ['_', 'b', 'browser', 'h', 'headless', 'e', 'env', 's', 'speed', 't', 'timeout','help', 'v', 'verbose', 'port'];
const allowedEnvironments = ['test', 'stage', 'prod'];
const allowedBrowsers = ['chrome', 'ie', 'edge', 'firefox', 'opera', 'safari'];
const headlessBrowsers = ['chrome', 'firefox'];

Object.keys(args).forEach(arg => {
  if (!allowesdOptions.includes(arg)) {
    throw new Error('Command options ' + arg + ' not allowed');
  }
});

if(args.hasOwnProperty('help')){
  help.help();
  return;
}

if (args.hasOwnProperty('b') || args.hasOwnProperty('browser')) {
  if (args.hasOwnProperty('b') && args.hasOwnProperty('browser')) {
    throw new Error('You cannot specify options -b and --browser at the same time');
  } else {
    browser = args.b || args.browser;
  }
}

if (!allowedBrowsers.includes(browser)) {
  throw new Error('The selected browser is not available. Available options: ' + allowedBrowsers.join(', ') );
}

if (args.hasOwnProperty('h') || args.hasOwnProperty('headless') || environmentSettings.headless) {
  if (!headlessBrowsers.includes(browser)) {
    throw new Error('The ' + browser + ' does not allow to run as headless');
  } else {
    browser = browser + ':headless';
  }
}

if(userAgent) {
  browser = browser + ' --user-agent=' + JSON.stringify(userAgent);
}

if (args.hasOwnProperty('e') || args.hasOwnProperty('env')) {
  if (args.hasOwnProperty('e') && args.hasOwnProperty('env')) {
    throw new Error('You cannot specify options -e and --env at the same time');
  } else {
    environment = args.e || args.env;
  }
}

if(args.hasOwnProperty('s') || args.hasOwnProperty('speed')){
  speed = args.s || args.speed;
}

if(args.hasOwnProperty('t') || args.hasOwnProperty('timeout')){
  timeout = args.t || args.timeout;
}

if(args.hasOwnProperty('v') || args.hasOwnProperty('verbose')){
  verbose = true;
}

if(args.hasOwnProperty('port')){
  port = args.port;
}

if (!allowedEnvironments.includes(environment)) {
  throw new Error('The selected environment is not available. Available options: ' + allowedEnvironments.join(', ') );
}
if ((args.hasOwnProperty('_') && args._.length > 0) || (args.hasOwnProperty('features') && args.features.length > 0) ) {
    features = 'features/features/'+args._[0];
}

const params = {
  env: environment,
  browser,
  speed,
  timeout,
  verbose,
  stopOnFirstFail,
  pageLoadTimeout,
  assertionTimeout,
  selectorTimeout,
  port,
  skipJsErrors,
  skipUncaughtErrors
};
var optionsCommand = [
  features,
  '--format', util.format('json:%s', reportFile),
  '--world-parameters', JSON.stringify(JSON.stringify(params))
];

const commandExec  = spawn(
  path.join(__dirname, 'node_modules', '.bin', 'cucumber-js'),
  optionsCommand,
  { shell: true, stdio: "inherit" }
);

commandExec.on('exit', function (code) {
  let browserName = browser.indexOf(':') == -1 ?  browser : browser.split(':')[0];
  let browserVersion = browser.indexOf(':') == -1 ? '' : 'headless';
  let endTime = new moment();
  let logo = `<img src="${generate64Image()}" alt="logo" style="height: 30px"/>`;

  report.generate({
    jsonDir: reportsFolder,
    reportPath: reportsFolder,
    pageTitle: `${options.project} test report`,
    reportName: logo,
    displayDuration: options.displayDuration || true,
    pageFooter: generateFooter('v0.0.2', '02/2019'),
    metadata: {
      browser: {
        name: browserName,
        version: browserVersion
      },
      device: os.hostname() || 'Local test machine',
      platform: {
        name: os.type(),
        version: os.release()
      }
    },
    customData: {
      title: 'Run info',
      data: [
        { label: 'Project', value: options.project },
        { label: 'Release', value: options.release },
        { label: 'Environment', value: environment},
        { label: 'Execution Time', value:  `${endTime.diff(startTime,'minutes')} minutes`},
        { label: 'Execution Start Time', value: startTime.format('MMMM Do YYYY, h:mm:ss a') },
        { label: 'Execution End Time', value: endTime.format('MMMM Do YYYY, h:mm:ss a') },
        ...options.customData
      ]
    }
  });
});
