/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    const ROUNDED = 0;
    const CUBEB = 1;
    const EMPTY = 2;

    /** @type {number[][]} */
    const platform = new Array(SIZE);
    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        platform[rowIndex] = new Array(SIZE);
    }

    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        const rawRow = lines[rowIndex].split("");
        for (let i = 0; i < SIZE; i++) {
            if (rawRow[i] === ".") {
                platform[i][rowIndex] = EMPTY;
            }
            else if (rawRow[i] === "#") {
                platform[i][rowIndex] = CUBEB;
            }
            else {
                platform[i][rowIndex] = ROUNDED;
            }
        }
    }

    let total = 0;
    for (let colIndex = 0; colIndex < SIZE; colIndex++) {
        for (let y = 0; y < SIZE; y++) {
            if (platform[colIndex][y] !== ROUNDED) {
                continue;
            }

            let offset = y;
            while ((offset - 1) >= 0 && platform[colIndex][offset - 1] === EMPTY) {
                offset--;
            }
            if (offset > -1 && offset !== y) {
                platform[colIndex][y] = EMPTY;
                platform[colIndex][offset] = ROUNDED;
            }
            total += SIZE - offset;
        }
    }

    console.log(total);
}

/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    const TOTAL_CYCLES = 1000000000;

    const ROUNDED = 0;
    const CUBEB = 1;
    const EMPTY = 2;

    /** @type {number[][]} */
    const platform = new Array(SIZE);
    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        platform[rowIndex] = new Array(SIZE);
    }

    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        const rawRow = lines[rowIndex].split("");
        for (let i = 0; i < SIZE; i++) {
            if (rawRow[i] === ".") {
                platform[i][rowIndex] = EMPTY;
            }
            else if (rawRow[i] === "#") {
                platform[i][rowIndex] = CUBEB;
            }
            else {
                platform[i][rowIndex] = ROUNDED;
            }
        }
    }

    /**
     * @param {number[][]} platform 
     */
    function cycleRocks(platform) {
        for (let colIndex = 0; colIndex < SIZE; colIndex++) {
            for (let y = 0; y < SIZE; y++) {
                if (platform[colIndex][y] !== ROUNDED) {
                    continue;
                }

                let offset = y;
                while ((offset - 1) >= 0 && platform[colIndex][offset - 1] === EMPTY) {
                    offset--;
                }
                if (offset > -1 && offset !== y) {
                    platform[colIndex][y] = EMPTY;
                    platform[colIndex][offset] = ROUNDED;
                }
            }
        }
        for (let y = 0; y < SIZE; y++) {
            for (let colIndex = 0; colIndex < SIZE; colIndex++) {
                if (platform[colIndex][y] !== ROUNDED) {
                    continue;
                }

                let offset = colIndex;
                while ((offset - 1) >= 0 && platform[offset - 1][y] === EMPTY) {
                    offset--;
                }
                if (offset > -1 && offset !== y) {
                    platform[colIndex][y] = EMPTY;
                    platform[offset][y] = ROUNDED;
                }
            }
        }
        for (let colIndex = 0; colIndex < SIZE; colIndex++) {
            for (let y = SIZE - 1; y >= 0; y--) {
                if (platform[colIndex][y] !== ROUNDED) {
                    continue;
                }

                let offset = y;
                while ((offset + 1) < (SIZE) && platform[colIndex][offset + 1] === EMPTY) {
                    offset++;
                }
                if (offset < (SIZE) && offset !== y) {
                    platform[colIndex][y] = EMPTY;
                    platform[colIndex][offset] = ROUNDED;
                }
            }
        }
        for (let y = 0; y < SIZE; y++) {
            for (let colIndex = SIZE - 1; colIndex >= 0; colIndex--) {
                if (platform[colIndex][y] !== ROUNDED) {
                    continue;
                }

                let offset = colIndex;
                while ((offset + 1) < SIZE && platform[offset + 1][y] === EMPTY) {
                    offset++;
                }
                if (offset < SIZE && offset !== colIndex) {
                    platform[colIndex][y] = EMPTY;
                    platform[offset][y] = ROUNDED;
                }
            }
        }
    }

    for (let i = 0; i < TOTAL_CYCLES; i++) {
        cycleRocks(platform);
    }

    let total = 0;
    for (let colIndex = 0; colIndex < SIZE; colIndex++) {
        for (let y = 0; y < SIZE; y++) {
            if (platform[colIndex][y] !== ROUNDED) {
                continue;
            }
            total += SIZE - y;
        }
    }

    console.log(total);
    // 102312 no es
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);


// /**
//  *
//  * @param {number[][]} platform
//  */
// function print(platform) {
//     const res = new Array(SIZE);
//     platform.forEach((col, colIndex) => col.forEach((cell, rowIndex) => {
//         let row = res[rowIndex] ?? (res[rowIndex] = []);
//         if (cell === EMPTY) {
//             row[colIndex] = ".";
//         }
//         else if (cell === CUBEB) {
//             row[colIndex] = "#";
//         }
//         else {
//             row[colIndex] = "O";
//         }
//     }));

//     console.log(res.map(col => col.join("")).join("\n"));
// }
