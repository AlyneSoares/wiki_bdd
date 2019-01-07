function help(){
  var commandsAndValues = [
    {
      "command1":"-e",
      "command2":"--env",
      "value": "test, stage, prod"
    },
    {
      "command1":"-b",
      "command2":"--browser",
      "value": "chrome, firefox"
    },
    {
      "command1":"-h",
      "command2":"--headless",
      "value": "run tests in Google Chrome and Mozilla Firefox without any visible UI shell",
    },
    {
      "command1":"-s",
      "command2":"--speed",
      "value": "number between 1 (the fastest) and 0.01 (the slowest)."
    },
    {
      "command1":"-t",
      "command2":"--timeout",
      "value": "default: 40000(milliseconds)"
    },
    {
      "command1":"-v",
      "command2":"--verbose",
      "value": "show current step running "
    },
  ];

  var blue = '\033[0;34m', nc = '\033[0m', bold = '\033[1m';
  console.log(`${bold}Basic command to  run the tests: ${nc}${blue}${bold}npm test${nc}\n`);
  console.log(`options:`);
  commandsAndValues.map(({command1,command2,value})=>{
    console.log(`\t${blue}${bold}${command1}${blue}${nc},${blue}${bold}${command2}${nc}\t${value}`);
    return true;
  });
  console.log(`\t\texample: ${blue}npm test -- --browser firefox -s 0.6${nc}\n`);
  console.log(`${bold}Run specific scenario${nc}`);
  console.log(`\texample: ${blue}npm test -- login.feature${nc}`);
  console.log(`\texample: ${blue}npm test -- --browser firefox login.feature${nc}`);
  console.log(`\n`);

}

exports.help = help;
