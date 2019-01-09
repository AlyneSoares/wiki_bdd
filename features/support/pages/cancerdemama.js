const {Selector} = require('testcafe');

// Selectors

function select(selector) {
    return Selector(selector).with({boundTestRun: testController});
}

exports.selectors = {

banner: function(){
    return select('.img-responsive');
},

};