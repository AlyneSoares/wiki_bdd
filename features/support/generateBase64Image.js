const base64Img = require('base64-img');
const path = require('path');


function generate64Image(){
    return base64Img.base64Sync(path.join(__dirname,"..","..","images","logo.png"));
}

exports.generate64Image = generate64Image;
