import * as fs from 'fs';
import * as readline from 'readline';

const fileName = process.argv[2];
const file = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
});

console.log("Running with file " + fileName)

let treeRows: string[] = [];

file.on('line', (line) => {
    readIn(line);
});

file.on('close', () => {
    console.log("Part One: " + partOne());
    console.log("Part Two: " + partTwo());
})

const partOne = (): number => {
    let visibleTrees = (treeRows.length * 2) + ((treeRows[0].length - 2) * 2);
    for (let i = 1; i < treeRows.length - 1; i++){
        for (let j = 1; j < treeRows[i].length - 1; j++) {
            const treeHeight = Number(treeRows[i][j]);
            const column = [];
            treeRows.forEach((row) => {column.push(row[j])})
            
            const up = column.slice(0, i)
            if (isVisible(up, treeHeight)) {
                visibleTrees++
                continue;
            }
            
            const right = [...treeRows[i].substring(j + 1)];
            if (isVisible(right, treeHeight)) {
                visibleTrees++
                continue;
            }

            const down = column.slice(i + 1)
            if (isVisible(down, treeHeight)) {
                visibleTrees++
                continue;
            }
            const left = [...treeRows[i].substring(0, j)];
            if (isVisible(left, treeHeight)) {
                visibleTrees++
                continue;
            }
        }
    }
    return visibleTrees;
}

const partTwo = (): number => {
    let scores: number[] = []
    for (let i = 1; i < treeRows.length - 1; i++){
        for (let j = 1; j < treeRows[i].length - 1; j++) {
            const treeHeight = Number(treeRows[i][j]);
            const column = [];
            treeRows.forEach((row) => {column.push(row[j])})
            
            const up = column.slice(0, i).reverse()
            const upScore = getDistance(up, treeHeight)

            const right = [...treeRows[i].substring(j + 1)];
            const rightScore = getDistance(right, treeHeight)
            
            const down = column.slice(i + 1)
            const downScore = getDistance(down, treeHeight)
            
            const left = [...treeRows[i].substring(0, j)].reverse();
            const leftScore = getDistance(left, treeHeight)

            scores.push(upScore * rightScore * downScore * leftScore);
        }
    }

    return Math.max(...scores)
}

const isVisible = (trees: string[], referenceHeight: number): boolean => {
    return trees.every((tree) => Number(tree) < referenceHeight)
}

const getDistance = (trees: string[], referenceHeight: number): number => {
    let score = trees.findIndex((tree) => Number(tree) >= referenceHeight);
    return score >= 0 ? score + 1 : trees.length 
}

const readIn = (line: string) => {
    treeRows.push(line);
}