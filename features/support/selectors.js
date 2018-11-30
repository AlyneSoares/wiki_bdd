const { readdirSync } = require('fs');

const loadSelectors = function(){
    var selectors = {};
    const filesName =  readdirSync(__dirname+"/pages/",function(err, files){
        return files;
    });
    filesName.map(name =>{
        var selectorsInput = require(__dirname+"/pages/"+name);
        Object.assign(selectors,selectorsInput.selectors);
    });

    return selectors;
}

exports.selectors = loadSelectors()

