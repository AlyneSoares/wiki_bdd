const args = require('minimist')(process.argv.slice(2));
const spawn = require('child_process').spawn;
const util = require('util');
const reporter = require('cucumber-html-reporter');
const os = require('os');
const path = require('path');
const environmentSettings = require('./env.json');
const help = require('./features/support/help');
const fs = require('fs');


let browser = environmentSettings.browser || 'chrome';
let environment = environmentSettings.defaultEnvironment || 'default';
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
let debugMode = environmentSettings.debugMode || false;
let developerMode = environmentSettings.developer || false;

let port = undefined;
let parallel = null;

const allowesdOptions = ['_', 'b', 'browser', 'h', 'headless', 'e', 'env', 's', 'speed', 't', 'timeout','help', 'v', 'verbose', 'port', 'p', 'parallel'];
const allowedEnvironments = ['default', 'wiki'];
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

if(developerMode){
  if(args.hasOwnProperty('p') || args.hasOwnProperty('parallel')){
    parallel = args.p || args.parallel;
  }
}

if (!allowedEnvironments.includes(environment)) {
  throw new Error('The selected environment is not available. Available options: ' + allowedEnvironments.join(', ') );
}
if ((args.hasOwnProperty('_') && args._.length > 0) || (args.hasOwnProperty('features') && args.features.length > 0) ) {
    features = 'features/'+args._[0];
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
  debugMode,
  port,
  variables: environmentSettings.environment[environment].variables
};
var optionsCommand = [
  features,
  '--format', util.format('json:%s', reportFile),
  '--world-parameters', JSON.stringify(JSON.stringify(params))
];
  if(parallel){
    optionsCommand.push('--parallel');
    optionsCommand.push(parallel);
  }
const commandExec  = spawn(
  path.join(__dirname, 'node_modules', '.bin', 'cucumber-js'),
  optionsCommand,
  { shell: true, stdio: "inherit" }
);

commandExec.on('exit', function (code) {

  const name = '<img src="data:image/png;base64,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">';
  const brandTitle = '<img src="data:image/png;base64,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">';

  var options = {
    theme: 'bootstrap',
    jsonFile: reportFile,
    output: path.join(reportsFolder, 'cucumber_report.html'),
    reportSuiteAsScenarios: true,
    name: name,
    brandTitle: brandTitle,
    metadata: {
        'Test Environment': environment,
        'Browser': browser,
        'Platform': os.type() + ' ' + os.release(),
        'Executed': 'Remote'
    }
  };

  reporter.generate(options);
});

