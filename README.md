# BDD AUTOMATION TEST

This is a functional model.  
to learn how it works, make sure you have [TestCafé](https://github.com/DevExpress/testcafe) with [CucumberJS](https://github.com/cucumber/cucumber-js) installed.  

In a terminal you open the root folder of the model and run  
> & npm install

So it creates a new folder **"node_modules"**. 
Then run   
> $ npm test

_Shazam!_

## How to Code the tests 
Within [this repo](https://github.com/AlyneSoares/wiki_bdd) as it's presented, you only need to fill the gaps of information and especification of your own project, like selectors and features to make a new one and run.
 
 ### The Project Structure:
 The structure of the folders is the Ghenkis engine format, so the folder's names and ordination are fixed.

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


## How to Run the tests
1. Make sure TestCafe and Cucumber are installed in your machine
2. Use the command: npm install
3. Run the test: npm test (or use the commands in package.json to change browser, environment and chose the feature you want to run)

### A little reading about BDD
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


## This repo versions
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

## Now, go work the magic and good tests!
