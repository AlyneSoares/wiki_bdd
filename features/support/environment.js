const {ClientFunction} = require('testcafe');

let _instance;

const Environment = {

  TEST: 'test',
  STAGE: 'stage',
  PROD: 'prod',

  getInstance: function() {
    if(_instance){
      return _instance;
    }
    _instance = this;
    this.setEnvironment(this.TEST);
  },

  setEnvironment: function(env) {
    _instance.environmentInUse = env;

    switch(env) {
      case this.TEST:
        _instance.url = 'https://www.google.com/';
        _instance.user = ' m';
        _instance.password = '1 ';
      break;

      case this.STAGE:
        _instance.url = 'https://www. .com/';
        _instance.user = ' ';
        _instance.password = '124124124';
      break;

      case this.PROD:
      break;

    }
  },

  getEnvironment: function() { 
    return _instance.environmentInUse; 
  },

  getUrl: function() { 
    return _instance.url; 
  },

  getPageUrl: function(testController) {
    const getPageUrl = ClientFunction(() => window.location.href).with({boundTestRun: testController});
    return getPageUrl();
  },

  getUser: function() { 
    return _instance.user; 
  },
  
  getPassword: function() { 
    return _instance.password; 
  }
};

Environment.getInstance();

module.exports = _instance;

