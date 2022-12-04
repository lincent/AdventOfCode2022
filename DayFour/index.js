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

file.on('line', (line) => {
    partOne(line)
    partTwo(line)
});

file.on('close', () => {
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partOne = (line) => {
    const [ElfOneStart, ElfOneEnd, ElfTwoStart, ElfTwoEnd] = getElvesSections(line);

    if ((ElfOneStart <= ElfTwoStart && ElfTwoEnd <= ElfOneEnd) 
        || (ElfTwoStart <= ElfOneStart && ElfOneEnd <= ElfTwoEnd)) {
        partOneScore += 1;
    }
}

const partTwo = (line) => {
    const [ElfOneStart, ElfOneEnd, ElfTwoStart, ElfTwoEnd] = getElvesSections(line);

    if ((ElfOneStart <= ElfTwoStart && ElfTwoStart <= ElfOneEnd) 
        || (ElfTwoStart <= ElfOneStart && ElfOneStart <= ElfTwoEnd)) {
        partTwoScore += 1;
    }
}

const getElvesSections = (line) => {
    const pair = line.split(',');
    const ElfOne = pair[0].split('-');
    const ElfTwo = pair[1].split('-');

    return [Number(ElfOne[0]), Number(ElfOne[1]), Number(ElfTwo[0]), Number(ElfTwo[1])];
}