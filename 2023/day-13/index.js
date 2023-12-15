/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\r\n\r\n");
    const SIZE = lines.length;
    /**
     * @type {{
     * rows:number[],
     * cols:number[],
     * width:number,
     * height:number
     * }[]}
     */
    const patterns = new Array(SIZE);
    for (let i = 0; i < SIZE; i++) {
        /** @type {number[]} */
        const rows = [];
        const rawRows = lines[i].split("\r\n");
        const width = rawRows[0].length;
        const height = rawRows.length;
        const columns = new Array(width).fill(0);
        const hMLB = 1 << (width - 1);
        const vMLB = 1 << (height - 1);
        for (let j = 0; j < rawRows.length; j++) {
            const rawRow = rawRows[j];
            let value = 0;
            for (let k = 0; k < rawRow.length; k++) {
                const char = rawRow[k];
                if (char === "#") {
                    value += hMLB >> k;
                    columns[k] += vMLB >> j;
                }
            }
            rows.push(value);
        }
        patterns[i] = { rows: rows, cols: columns, width: width, height: height };
    }

    let total = 0;
    for (let patternIndex = 0; patternIndex < SIZE; patternIndex++) {
        const pattern = patterns[patternIndex];
        let rows = pattern.rows;
        let cols = pattern.cols;
        let found = false;
        let colFound = -1;
        let width = pattern.width;

        for (let axis = 0; axis < 2 && !found; axis++) {
            let reversed = false;
            for (let iters = 0; iters < 2 && !found; iters++) {
                for (let offset = 1; offset < (width - 1) && !found; offset++) {
                    if (offset % 2 === 0) {
                        continue;
                    }
                    const limit = (width - offset) / 2 + offset;
                    found = true;
                    for (let x = offset; x < limit && found; x++) {
                        if (cols[x] !== cols[width - x + offset - 1]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        colFound = limit;
                    }
                }
                if (found) {
                    break;
                } else {
                    reversed = !reversed;
                    cols.reverse();
                }
            }
            if (found) {
                if (axis === 0) {
                    if (reversed) {
                        total += width - colFound;
                    } else {
                        total += colFound;
                    }
                }
                else {
                    if (reversed) {
                        total += 100 * (width - colFound);
                    } else {
                        total += 100 * colFound;
                    }
                }
            }
            else {
                cols = rows;
                width = pattern.height;
            }
        }
    }

    console.log(total);
}

/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\r\n\r\n");
    const SIZE = lines.length;
    /**
     * @type {{
     * rows:number[],
     * cols:number[],
     * width:number,
     * height:number
     * }[]}
     */
    const patterns = new Array(SIZE);
    for (let i = 0; i < SIZE; i++) {
        /** @type {number[]} */
        const rows = [];
        const rawRows = lines[i].split("\r\n");
        const width = rawRows[0].length;
        const height = rawRows.length;
        const columns = new Array(width).fill(0);
        const hMLB = 1 << (width - 1);
        const vMLB = 1 << (height - 1);
        for (let j = 0; j < rawRows.length; j++) {
            const rawRow = rawRows[j];
            let value = 0;
            for (let k = 0; k < rawRow.length; k++) {
                const char = rawRow[k];
                if (char === "#") {
                    value += hMLB >> k;
                    columns[k] += vMLB >> j;
                }
            }
            rows.push(value);
        }
        patterns[i] = { rows: rows, cols: columns, width: width, height: height };
    }

    let total = 0;
    for (let patternIndex = 0; patternIndex < SIZE; patternIndex++) {
        const pattern = patterns[patternIndex];
        let lines = pattern.rows;
        let found = false;
        let foundIndex = -1;
        let lineLength = pattern.height;
        for (let axis = 0; axis < 2 && !found; axis++) {
            let reversed = false;
            for (let iters = 0; iters < 2 && !found; iters++) {
                for (let offset = 0; offset < Math.floor((lineLength - 1) / 2) && !found; offset++) {
                    const limit = 2 ** offset;
                    found = true;
                    let fixed = false;
                    for (let x = 0; x < limit && found; x++) {
                        console.log(limit, x, lines[x], offset * 2 - x + 1, lines[offset * 2 - x + 1]);
                        if (lines[x] !== lines[offset * 2 - x + 1]) {
                            if (fixed) {
                                found = false;
                                break;
                            }
                            else {
                                let count = 0;
                                let toCount = lines[x] ^ lines[offset * 2 - x + 1];
                                while (toCount) {
                                    toCount &= toCount - 1;
                                    count++;
                                }
                                if (count > 1) {
                                    found = false;
                                    break;
                                }
                                // console.log("fixed");
                                fixed = true;
                            }
                        }
                    }
                    if (found) {
                        foundIndex = limit + 1;
                    }
                }
                if (found) {
                    break;
                } else {
                    reversed = !reversed;
                    lines.reverse();
                }
            }
            if (found) {
                if (axis === 0) {
                    if (reversed) {
                        total += 100 * (lineLength - foundIndex);
                    } else {
                        total += 100 * foundIndex;
                    }
                }
                else {
                    if (reversed) {
                        total += lineLength - foundIndex;
                    } else {
                        total += foundIndex;
                    }
                }
            }
            else {
                lines = pattern.cols;
                lineLength = pattern.width;
            }
        }
    }

    console.log(total);
    // 30609 es bajo
    // 39000 y algo es bajo
    // 59274 no es
    // 38471 no es
    // 38466 no es
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
