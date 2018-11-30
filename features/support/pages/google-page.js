const {Selector} = require('testcafe');

// Selectors

function select(selector) {
    return Selector(selector).with({boundTestRun: testController});
}

exports.selectors = {
    searchBoxGoogle: function() {
        return select('#tsf > div:nth-child(2) > div > div.RNNXgb');
    },
    searchButtonGoogle: function(){
        return select('#tsf > div:nth-child(2) > div > div.UUbT9 > div.aajZCb > div > center > input[type="submit"]:nth-child(1)')
    },

    searchResult: function() {
        return select('#rso > div:nth-child(1) > div > div:nth-child(1) > div > div > div.r > a');
      },

};
