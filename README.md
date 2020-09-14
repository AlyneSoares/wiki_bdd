# BDD Test Sample(Tescafe & Cucumber integration)

 This regression test is based in [TestCafé](https://github.com/DevExpress/testcafe) with [CucumberJS](https://github.com/cucumber/cucumber-js).

## How to Code the tests
 
 A small model with files and folders organization pre-determined is disposable [here](https://github.com/AlyneSoares/wiki_bdd), as it's presented, you only need to fill the gaps of information and especification of your own project, like selector and features.

# BDD AUTOMATION TEST

This is a functional model.  
to learn how it works, make sure you have testcafe and cucumber installed.  

### **SETTING UP - LINUX USERS**

**1 -  Install npm**
> `$ npm install n -g`

  * Validate npm version:
> `$ npm -v`

  * In a terminal you open the root folder of the model and run
> `$ node index.js`  

   So it creates a new folder **"node_modules"**. You also may chose the environment/url and the feature to run:  
  
> `$ npm test -- --env=test featureName.feature`


**2 - Install Node**

  * Download Node.js from Node download page, extract the files and copy {bin,include,lib,share} folders to 
  > `/usr/.cp -a node-v8.11.3-linux-x64/ {bin,include,lib,share} /usr/`

  * Validate Node.js version:
   > `$ node -v`

**3 Install TestCafe**
  * Install testcafe globaly:
  > `$ npm install -g testcafe`

  * Validate TestCafe browsers status and version:

 > `$ testcafe -b`   
 > `$ testcafe -v`

  * Install TestCafe in the QA local main directory by opening the proper 'Testcases' folder and running the bellow script on terminal:
  > `$ npm install testcafe`

**4) Install Cucumber**
 * Install cucumber globaly:
 > `$ npm install -g cucumber`
 
   * Validate Cucumber version:
   > `$ cucumber -v`
   
I strongly recomend extensions (if you're using VScode) like  "vscode-icons", to better visualization os different files and "Cucumber (Gherkin) Full Support", to better usage os the language and enable the steps auto-complete in the settings.

_Shazam!_
 
 ### The Project Structure:
 The structure of the folders is the Ghenkis engine format, so the folder's names and ordination are fixed:

There are two .json files to read and edit, if you need:  
* *package.json* - It has the commands to run the test in different browsers, commands to play part of them and to run in different enviroments;  
* *env.json* - It's where you determine the urls to play your tests  

The folders of the package:  
* features - *Here is where the features files will be*
  * step_definitions - *You will find the file generalSteps.js where most general actions of navigations can be found. You can also create and edit as you want.*
  * support - *Where the support files to cucumber run, and the folder pages stay*
    * pages - *Where the files with the page elements are*
* reports - *Where the files to automation report and the folder to save the screenshots stay*

The files **".features"** you will save the scenarios and test cases.

## **Running the tests**
1. Make sure TestCafe and Cucumber are installed in your machine
2. Run the command:  
 - `$ npm install`
3. Run the test:  
   - All tests:  
     - `$ node index.js`
   - Specific tests:
     - -e or --env, to chose the environment (eg `--env=stage`)
     - -h or --headless, to run headless tests (eg `--headless`)
     - -b or --browser, to chose the browser (eg `--browser=firefox`)
     - -s or --speed, to change the test speed between 0.1 and 1 (slower to faster) (eg `--speed=0.3`)
     - -t or --timeout, to change deafult 400000 miliseconds (eg `-timeout=10000`)
     - to run specific feature, use chosenFeature.feature (eg. `login.feature` )  
     - to run specific scenario, use chosenFeature.feature:XX XX = the code line of the scenario (eg: `login.feature:44`) 
     - awalys start with `$ npm test --`
  
  Example:
> `$ npm test -- --env=test -b=firefox -h --speed=0.3 login.feature `

Terminal script for a Help:  
>  `$ npm test -- --help`

### **A little reading about BDD**
BDD means Behavior Driven Development, so as the name says, it's a method of development.  
The stories are written under a role view, like a visitor, a user, the administrator.  
The stories tell whats the context, the actions and whats expected, divided by "Given/ When/ Then" commands.

**Given** is the statement to the situation:  
> _**Given** I logged in;_  
> _**Given** I have a banana in my cart_

It means that the user context is that the account is valid and it is logged; also that the user has a banana in the cart; so when the test run we understand that this is the situation to beginthe test.

**When** is the action:
> _**When** I 'increase the product'_  
> _**When** I click 'the logout button'_

Those are steps of actions. This is how the cucumber knows what is the sequences that reproduce the story/ test case. 

**Then** is the result:
> _**Then** I should see the 'spinner'_  
> _**Then** I should see 'welcome' in the page title_

This is what you are expecting to happen.


### **This repo versions**
<table>
<tr>
    <td>TestCafé</td>
    <td>0.22.0</td>
</tr>
<tr>
    <td>CucumberJS</td>
    <td>4.2.1</td>
</tr>
</table>


### **TESTCAFE/CUCUMBER RELATED DOCS**
 * [TestCafé](https://github.com/DevExpress/testcafe)
 * [CucumberJS](https://github.com/cucumber/cucumber-js)
 * [Initial Setup](https://github.com/rquellh/testcafe-cucumber/wiki/Initial-Setup)
 * [Debuging in VSCode](https://github.com/rquellh/testcafe-cucumber/wiki/Debugging-in-VSCode) 
 * [Using TestCafé](https://github.com/rquellh/testcafe-cucumber/wiki/Using-TestCafe)
 * [Creating your first test](https://github.com/rquellh/testcafe-cucumber/wiki/Creating-your-first-test)
 * [Selectors](https://github.com/rquellh/testcafe-cucumber/wiki/Selectors)
 * [Actions](https://github.com/rquellh/testcafe-cucumber/wiki/Actions)
 * [Assertions](https://github.com/rquellh/testcafe-cucumber/wiki/Assertions)
 * [TestCafé & CucumberJS](https://github.com/rquellh/testcafe-cucumber/wiki/TestCafe-&-CucumberJS)
 * [Helpful VSCode Setup](https://github.com/rquellh/testcafe-cucumber/wiki/Helpful-VSCode-Setup)
 * [Creating Features](https://github.com/rquellh/testcafe-cucumber/wiki/Creating-Features)
 * [Creating Step Definitions](https://github.com/rquellh/testcafe-cucumber/wiki/Creating-Step-Definitions)
 * [Adding TestCafé Functionality to Cucumber steps](https://github.com/rquellh/testcafe-cucumber/wiki/Adding-TestCafe-Functionality-to-Cucumber-steps)
 * [Harnessing Cucumber's Power](https://github.com/rquellh/testcafe-cucumber/wiki/Harnessing-Cucumber's-Power)
 * [Page Object](https://github.com/rquellh/testcafe-cucumber/wiki/Page-Object)
 * [Running Tests](https://github.com/rquellh/testcafe-cucumber/wiki/Running-Tests)
 * [Reporting and Taking Screenshots](https://github.com/rquellh/testcafe-cucumber/wiki/Reporting-and-Taking-Screenshots)

Depreciation Notice - [There are talks to officially support the Gherkin syntax in TestCafé](https://github.com/DevExpress/testcafe/issues/1373#issuecomment-291526857). Be aware of it.
## **Now, go work the magic and good tests!**
