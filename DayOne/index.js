const fs = require('fs')
const readline = require('readline');


const file = readline.createInterface({
    input: fs.createReadStream('testData.txt'),
    output: process.stdout,
    terminal: false
});

let elfCalories = 0;
let elfArray = [];
file.on('line', (line) => {
    if (!line){
        elfArray.push(elfCalories);
        elfCalories = 0;
        
    } else {
        elfCalories += Number(line);
    }
});

file.on('close', () => {
    elfArray.sort((a, b) => b - a)
    let total = elfArray[0] + elfArray[1] + elfArray[2]
    console.log(elfArray)
    console.log(total)
})
