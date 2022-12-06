const fs = require('fs')
const readline = require('readline');

const file = readline.createInterface({
    // input: fs.createReadStream('testData.txt'),
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});

let partOneScore = '';
let partTwoScore = '';

const numbers = '123456789';
file.on('line', (line) => {
    partOne(line)
    partTwo(line)
});

file.on('close', () => {
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partOne = (line) => {
    partOneScore = calculate(line, 4);
}

const partTwo = (line) => {
    partTwoScore = calculate(line, 14);
}

const calculate = (line, bufferLength) => {
    for (let i = 0; i + bufferLength < line.length; i++) {
        const bufferedCode = line.substring(i, i + bufferLength); 
        
        let set = new Set();
        [...bufferedCode].map(x => set.add(x));

        if (set.size === bufferLength) {
           return i + bufferLength;
        }
   }
}
