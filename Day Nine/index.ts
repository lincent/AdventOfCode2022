import * as fs from 'fs';
import * as readline from 'readline';

type ord = { x: number, y: number} 

const fileName = process.argv[2];
const file = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
});

console.log("Running with file " + fileName)

let data: string[] = [];

file.on('line', (line) => {
    readIn(line);
});

file.on('close', () => {
    console.log("Part One: " + processData(1));
    console.log("Part Two: " + processData(9));
})

const processData = (knots: number): number => {
    let knotPositions: ord[] = [];
    for (let a=0; a < knots+1; a++){
        knotPositions.push({ x: 0, y: 0 })
    }
    
    let uniqueTailPositions = new Set();
    
    for (let row of data) {
        const command = row.match(/([URLD]) (\d+)/)
        for (let i = 0; i < Number(command[2]); i++){
            switch(command[1]){
                case 'U':
                    knotPositions[0].y++
                    break;
                case 'R':
                    knotPositions[0].x++
                    break;
                case 'D':
                    knotPositions[0].y--
                    break;
                case 'L':
                    knotPositions[0].x--
                    break;
            }

            for (let movingKnot = 1; movingKnot < knotPositions.length; movingKnot++){
                knotPositions[movingKnot] = moveFollowingKnot(knotPositions[movingKnot-1], knotPositions[movingKnot])
            }

            uniqueTailPositions.add(`${knotPositions[knotPositions.length-1].x},${knotPositions[knotPositions.length-1].y}`)
        }
    }
    return uniqueTailPositions.size
}

const moveFollowingKnot = (leader: ord, follower: ord): ord => {
    const xDifference = leader.x - follower.x;
    const yDifference = leader.y - follower.y;
    const difference = `${xDifference},${yDifference}`

    switch(difference){
        case '2,0':
            follower.x++
            break;
        case '0,2':
            follower.y++
            break;
        case '0,-2':
            follower.y--
            break;
        case '-2,0':
            follower.x--
            break;
        case '2,1':
        case '1,2':
        case '2,2':
            follower.x++
            follower.y++
            break;
        case '-2,1':
        case '-1,2':
        case '-2,2':
            follower.x--
            follower.y++
            break;
        case '1,-2':
        case '2,-1':
        case '2,-2':
            follower.x++
            follower.y--
            break;
        case '-1,-2':
        case '-2,-1':
        case '-2,-2':
            follower.x--
            follower.y--
            break;
    }

    return follower;
}

const readIn = (line: string) => {
    data.push(line);
}