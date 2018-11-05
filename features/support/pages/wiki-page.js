const {Selector} = require('testcafe');

// Selectors

function select(selector) {
    return Selector(selector).with({boundTestRun: testController});
}

exports.selectors = {
    searchBox: function() {
        return select('#searchInput');
    },
    // pageTitle: function() {
    //     return select('#firstHeading');
    // },

    getTitle: function() {
        const title = Selector('#firstHeading.firstHeading').with({boundTestRun: testController});
        return this.getTitle();
      },

    searchButton: function() {
        return select('.pure-button');
    },

    changeLanguage: function() {
        return select('#js-link-box-en')
    },

    welcomeMessage: function() {
        return select('#mp-topbanner > div > div:nth-child(1)')
    }
};