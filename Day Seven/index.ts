import * as fs from 'fs';
import * as readline from 'readline';

const fileName = process.argv[2];
const file = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
});

console.log("Running with file " + fileName)

let partOneScore = 0;
let partTwoScore = 0;

file.on('line', (line) => {
    partOne(line)
    partTwo(line)
});

file.on('close', () => {
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partOne = (line: string) => {
}

const partTwo = (line: string) => {
}