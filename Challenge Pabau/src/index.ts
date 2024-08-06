/**
 * Awesome challenge I like it took me a night to think about it but I was able to figure it out.
 * I have a few explanations here. I don't know if it's part of the challenge, but there was no '+' at the letter 'C',
 * so the output is different.
 * 
 * I added 2 more arrays so it can be from point A to point B or from '>' to 's' :D
 * Have a nice day and happy coding :D
 * 
 * Martin
 */

// Define the matrix type as an array of arrays of strings
type Matrix = string[][];

const matrix: Matrix = [
    ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    [' ', '+', '-', 'U', '-', '+', ' ', ' ', 'C'],
    [' ', '|', ' ', ' ', ' ', '|', ' ', ' ', '|'],
    [' ', 's', ' ', ' ', ' ', 'C', '-', '-', '+'],
];

// Uncomment one of the following matrices if needed
// const matrix: Matrix = [
//     ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//     [' ', '+', '-', 'U', '-', '+', ' ', ' ', 'C'],
//     [' ', '|', ' ', ' ', ' ', '|', ' ', ' ', '|'],
//     [' ', '|', ' ', ' ', ' ', 'C', ' ', ' ', '|'],
//     [' ', '|', ' ', ' ', ' ', '|', ' ', ' ', '|'],
//     [' ', 's', ' ', ' ', ' ', '+', '-', '-', '+'],
// ];

// const matrix: Matrix = [
//     ['>', '-', '-', '-', 'P', '-', '@', '-', '+'],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//     [' ', '+', '-', 'A', '-', '+', ' ', ' ', 'A'],
//     [' ', '|', ' ', ' ', ' ', '|', ' ', ' ', '|'],
//     [' ', 'U', ' ', ' ', ' ', 'B', ' ', ' ', '|'],
//     [' ', '|', ' ', ' ', ' ', '|', ' ', ' ', '|'],
//     [' ', 's', ' ', ' ', ' ', '+', '-', '-', '+'],
// ];

let path: string = '';
let letters: string = '';

type Directions = {
    [key: string]: [number, number];
};

const directions: Directions = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
};

// Function to find the starting point and begin traversal
function findStart(matrix: Matrix): [number, number] | null {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '>') {
                return [i, j];
            }
        }
    }
    return null;
}

// Function to traverse the matrix
function traverseMatrix(matrix: Matrix): void {
    const start = findStart(matrix);
    if (!start) return;

    let [row, col] = start;
    let direction = directions.right; // Start direction

    while (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
        let char = matrix[row][col];
        path += char;

        // Add letter if it's an uppercase letter
        if (char >= 'A' && char <= 'Z') {
            letters += char;
        }

        if (char === '+') {
            // Determine new direction at '+' symbol
            if (direction !== directions.right && col > 0 && matrix[row][col - 1] === '-') {
                direction = directions.left;
            } else if (direction !== directions.left && col < matrix[0].length - 1 && matrix[row][col + 1] === '-') {
                direction = directions.right;
            } else if (direction !== directions.down && row > 0 && matrix[row - 1][col] === '|') {
                direction = directions.up;
            } else if (direction !== directions.up && row < matrix.length - 1 && matrix[row + 1][col] === '|') {
                direction = directions.down;
            }
        }

        row += direction[0];
        col += direction[1];

        if (char === '|' || char === '-' || char === ' ') continue;
    }
}

traverseMatrix(matrix);

console.log(`Path: ${path}`);
console.log(`Letters: ${letters}`);
