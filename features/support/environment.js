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
        _instance.url = 'https://www.wikipedia.org/';
        _instance.user = 'adriano.zanette@objectedge.com';
        _instance.password = '124124124';
      break;

      case this.STAGE:
        _instance.url = 'https://ccstore-stage-zd9a.oracleoutsourcing.com/';
        _instance.user = 'adriano.zanette@objectedge.com';
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

