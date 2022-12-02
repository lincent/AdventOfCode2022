const fs = require('fs')
const readline = require('readline');


const file = readline.createInterface({
    input: fs.createReadStream('testData.txt'),
    output: process.stdout,
    terminal: false
});

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

const partTwo = (line) => {
    const input = line
        .replace('A', '1')
        .replace('B', '2')
        .replace('C', '3')
        .split(' ');

    switch (input[1]) {
        case 'Y': // draw
            partTwoScore += Number(input[0]) + 3
            break;
        case 'Z': // win
            partTwoScore = (input[0] === '3')
                ? partTwoScore += 1
                : partTwoScore += (1 + Number(input[0]));
            partTwoScore += 6
            break;
        default: // lose
            partTwoScore = (input[0] === '1')
                ? partTwoScore += 3
                : partTwoScore += (-1 + Number(input[0]));
    }
}

const partOne = (line) => {
    const input = line
        .replace('A', '1')
        .replace('B', '2')
        .replace('C', '3')
        .replace('X', '1')
        .replace('Y', '2')
        .replace('Z', '3')
        .split(' ');
    
    switch(Number(input[1]) - Number(input[0]))
    {
        case 0:
            partOneScore += 3;
            break;
        case 1:
            partOneScore += 6;
            break;
        case -2:
            partOneScore += 6
            break;
        default: 
            partOneScore += 0
    }
    
    partOneScore += Number(input[1]);
}