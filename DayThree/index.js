const fs = require('fs')
const readline = require('readline');

const file = readline.createInterface({
    // input: fs.createReadStream('testData.txt'),
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});

let partOneScore = 0;
let partTwoScore = 0;
let bags = [];

file.on('line', (line) => {
    partOne(line)
    partTwo(line)
});

file.on('close', () => {
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partTwo = (line) => {
    bags.push(line);

    if (bags.length < 3) {
        return;
    }

    let duplicatedItemsInFirstTwoBags = [];
    for (item of bags[0]) {
        if (bags[1].includes(item)){
            duplicatedItemsInFirstTwoBags.push(item);
        }
    }
    
    const duplicatedItem = getDuplicatedItem(duplicatedItemsInFirstTwoBags, bags[2]);
    
    partTwoScore += convertItemToPoints(duplicatedItem);

    bags = [];
}

const partOne = (line) => {
    const lineLength = line.length;
    const compartmentOne = line.substring(0, lineLength / 2);
    const compartmentTwo = line.substring(lineLength / 2);

    const duplicatedItem = getDuplicatedItem(compartmentOne, compartmentTwo);

    partOneScore += convertItemToPoints(duplicatedItem);
}

const getDuplicatedItem = (one, two) => {
    for (item of one) {
        if (two.includes(item)){
            return item;
        }
    }
}

const convertItemToPoints = (letter) => {
    const asciiCode = letter.charCodeAt(0);
    if (asciiCode < 92) {
        return asciiCode - (65 - 27);
    } else {
        return asciiCode - (97 - 1);
    }
}