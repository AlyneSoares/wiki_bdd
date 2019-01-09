const { ClientFunction } = require('testcafe');
const envConfig = require('../../env.json');
let _instance;

const Environment = {
  Default: 'default',

  getInstance: function () {
    if (_instance) {
      return _instance;
    }
    _instance = this;
    this.setEnvironment(this.Default);
  },

  setEnvironment: function (env) {
    _instance.environmentInUse = env;
    _instance.url = envConfig.environment[env].url;
    _instance.user = envConfig.environment[env].user;
    _instance.password = envConfig.environment[env].password;
  },

  getEnvironment: function () {
    return _instance.environmentInUse;
  },

  getUrl: function () {
    return _instance.url;
  },

  getPageUrl: function (testController) {
    const getPageUrl = ClientFunction(() => window.location.href).with({ boundTestRun: testController });
    return getPageUrl();
  },

  getUser: function () {
    return _instance.user;
  },

  getPassword: function () {
    return _instance.password;
  }
};

Environment.getInstance();

module.exports = _instance;