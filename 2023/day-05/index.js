/** @param {string} input  */
function partOne(input) {
    const entries = input.split("map:");

    const seeds = [];
    const rawSeeds = entries[0].split("\n")[0].split(" ");
    for (let i = 1; i < rawSeeds.length; i++) {
        seeds[i] = parseInt(rawSeeds[i]);
    }

    /** @type {number[][][]} */
    const tables = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    for (let i = 1; i < entries.length; i++) {
        const table = tables[i - 1];
        const lines = entries[i].split("\n");
        for (const line of lines.slice(1, i === 7 ? -1 : -2)) {
            /** @type {any[]} */
            const numbers = line.split(" ")
            for (let i = 0; i < numbers.length; i++) {
                numbers[i] = parseInt(numbers[i]);
            }
            table.push(numbers)
        }
    }

    /**
     * @param {number[][][]} tables 
     * @param {number} tableIndex 
     * @param {number} value 
     * @returns {number}
     */
    function visit(tables, tableIndex, value) {
        const table = tables[tableIndex];
        if (tableIndex === 6) {
            for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
                const lrow = table[rowIndex];
                const offset = value - lrow[1];
                if (offset < 0 || offset >= lrow[2]) {
                    continue;
                }

                return lrow[0] + offset;
            }

            return value;
        }

        for (let rowIndex = 1; rowIndex < table.length; rowIndex++) {
            const lrow = table[rowIndex];
            const offset = value - lrow[1];
            if (offset < 0 || offset >= lrow[2]) {
                continue;
            }

            const nextValue = lrow[0] + offset;
            return visit(tables, tableIndex + 1, nextValue);
        }

        return visit(tables, tableIndex + 1, value);
    }

    let min = Number.MAX_SAFE_INTEGER;

    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
        const found = visit(tables, 0, seeds[seedIndex]);
        if (found < min) {
            min = found;
        }
    }

    console.log(min)
}


/** @param {string} input  */
function partTwo(input) {
    const entries = input.split("map:");

    const seeds = [];
    const rawSeeds = entries[0].split("\n")[0].split(" ");
    for (let i = 1; i < rawSeeds.length; i++) {
        seeds[i] = parseInt(rawSeeds[i]);
    }

    /** @type {number[][][]} */
    const tables = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    for (let i = 1; i < entries.length; i++) {
        const table = tables[i - 1];
        const lines = entries[i].split("\n");
        for (const line of lines.slice(1, i === 7 ? -1 : -2)) {
            /** @type {any[]} */
            const numbers = line.split(" ")
            for (let i = 0; i < numbers.length; i++) {
                numbers[i] = parseInt(numbers[i]);
            }
            table.push(numbers)
        }
    }

    /**
     * @param {number[][][]} tables 
     * @param {number} tableIndex 
     * @param {number} value 
     * @returns {number}
     */
    function visit(tables, tableIndex, value) {
        const table = tables[tableIndex];
        if (tableIndex === 6) {
            for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
                const lrow = table[rowIndex];
                const offset = value - lrow[1];
                if (offset < 0 || offset >= lrow[2]) {
                    continue;
                }

                return lrow[0] + offset;
            }

            return value;
        }

        for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
            const lrow = table[rowIndex];
            const offset = value - lrow[1];
            if (offset < 0 || offset >= lrow[2]) {
                continue;
            }

            const nextValue = lrow[0] + offset;
            return visit(tables, tableIndex + 1, nextValue);
        }

        return visit(tables, tableIndex + 1, value);
    }

    let min = Number.MAX_SAFE_INTEGER;

    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex += 2) {
        const seed = seeds[seedIndex];
        const totalOffset = seeds[seedIndex + 1];

        for (let offset = 0; offset < totalOffset; offset++) {
            const found = visit(tables, 0, seed + offset);
            if (found < min) {
                min = found;
            }
        }
    }

    console.log(min);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
