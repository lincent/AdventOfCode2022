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
let directoryPath: string[] = [];
let directories: {[id: string] : number} = {};

file.on('line', (line) => {
    readIn(line);
});

file.on('close', () => {
    partOne()
    partTwo()
    console.log("Part One: " + partOneScore);
    console.log("Part Two: " + partTwoScore);
})

const partOne = () => {
    Object.values(directories).forEach((size) => {
        if (size <= 100000){
            partOneScore += size
        }
    });
}

const partTwo = () => {
    const maxSpace = 70000000;
    const requiredFreeSpace = 30000000;
    const currentUsage = directories['/'];
    const currentSpace = maxSpace - currentUsage
    const requiredSpace = requiredFreeSpace - currentSpace;

    const sizes = Object.values(directories).sort((a,b) => a - b);

    for (let size of sizes){
        if (size > requiredSpace) {
            partTwoScore = size
            return;
        }
    }
}

const readIn = (line: string) => {
    const goToDirectory = line.match(/\$ cd (\w+)/) || line.match(/\$ cd (\/)/);
    if (goToDirectory){
        const directory = goToDirectory[1] === '/' 
            ? '/'
            : (directoryPath[directoryPath.length-1] + "/" + goToDirectory[1]);
        directoryPath.push(directory);
        directories[directory] = 0;
    }
    
    const upLevel = line.match(/\$ cd \.\./)
    if (upLevel){
        directoryPath.pop()
    }

    const fileListed = line.match(/(\d+) \w[.\w]*/)
    if (fileListed){
        const fileSize = Number(fileListed[1]);
        for (let directory of directoryPath) {
            directories[directory] += fileSize;
        }
    }
}