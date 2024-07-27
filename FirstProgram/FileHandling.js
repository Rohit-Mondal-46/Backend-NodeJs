const fs = require("fs")
fs.writeFileSync('./text.txt','hello this is rohit');
const fileData = fs.readFileSync('./text.txt','utf-8');
console.log(fileData);  