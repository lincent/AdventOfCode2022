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

let partOneStacks = {};
let partTwoStacks = {};
file.on('line', (line) => {
    partOne(line)
    partTwo(line)
});

file.on('close', () => {
    for(prop in partOneStacks){
        partOneScore += partOneStacks[prop].pop();
    }
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partOne = (line) => {
    if (line.length === 0){
        return;
    }

    if (line.includes('move')) {
        const [move, from, to] = decodeInstruction(line)

        for (let i = 0; i < move; i++) {
            let moving = partOneStacks[from].pop();
            partOneStacks[to].push(moving)
        }
        return;
    }
    
    readInStacks(line)
}

const partTwo = (line) => {
    if (line.length === 0){
        return;
    }
    
    if (line.includes('move')) {
        const [move, from, to] = decodeInstruction(line)
        let movingItems = ""
        for (let i = 0; i < move; i++) {
            let moving = partTwoStacks[from].pop();
            movingItems += moving;
        }
    
        let addItems = [...movingItems].reverse().join("")
    
        for (item of addItems) {
            partTwoStacks[to].push(item);
        }
        return;
    }
    
    readInStacks(line)
}

const readInStacks = (line) => {
    for (let i = 1; i < (line.length + 1)/4; i++) {
        let column = 1 + 4 * (i-1)
        if (line[column] === ' ' || numbers.includes(line[column])){
            continue;
        }
        
        if (!partOneStacks[i]){
            partOneStacks[i] = [];
        }
        
        partOneStacks[i].unshift(line[column]);
    }
}

const decodeInstruction = (line) => {
    const match = line.match(/move (\d+) from (\d) to (\d)/);
    return [match[1], match[2], match[3]]
}
