const { readdirSync } = require('fs');
const { Selector } = require('testcafe');


function select(selector) {
  return Selector(selector).with({ boundTestRun: testController });
}
function seletor(s){
  var seletor = s;
  return function(){
    return select(seletor);
  }
}
const loadSelectors = function(){
    var selectors = {};
    const filesName =  readdirSync(__dirname+"/../pages/",function(err, files){
        return files
    });

    filesName.map((name) =>{
      var t = name.split(".");
      var type = t[t.length -1];
      var selectorsInput = require(__dirname+"/../pages/"+name);
      if(type == "js"){
        Object.assign(selectors,selectorsInput.selectors);
      }else if(type == "json"){
        var keys = Object.keys(selectorsInput);
        var selec = {};
        for(var i = 0; i < keys.length; i++){
          selec[keys[i]+""] = seletor(selectorsInput[keys[i]]);
        }
      }
        Object.assign(selectors,selec);
    });
    return selectors;
}

exports.selectors = loadSelectors();

