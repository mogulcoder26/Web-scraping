const fs = require('fs');
const data = {"name":"Soubhik GlON","age":23};

// fs.writeFile("test.json",JSON.stringify(data));
const newData  = fs.readFileSync("test.json","utf-8")

console.log(JSON.parse(newData));