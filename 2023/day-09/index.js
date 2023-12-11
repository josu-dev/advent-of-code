/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\n");

    /**
     * @param {number[]} sequence 
     * @returns {number}
     */
    function calculateNextValue(sequence) {
        const nextSequence = new Array(sequence.length - 1);
        let allZeroes = true;
        for (let i = 1; i < sequence.length; i++) {
            const a = sequence[i - 1];
            const b = sequence[i];
            let diference = b - a;
            if (nextSequence[i - 1] = diference) {
                allZeroes = false;
            }
        }
        const currentLast = sequence[sequence.length - 1];
        if (allZeroes) {
            return currentLast;
        }

        const below = calculateNextValue(nextSequence);
        return currentLast + below;
    }

    let totalNextValue = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const sequence = line.split(" ").map(Number);
        const nextValue = calculateNextValue(sequence);
        totalNextValue += nextValue;
    }

    console.log(totalNextValue);
}


/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\n");

    /**
     * @param {number[]} sequence 
     * @returns {number}
     */
    function calculatePreviousValue(sequence) {
        const nextSequence = new Array(sequence.length - 1);
        let allZeroes = true;
        for (let i = 1; i < sequence.length; i++) {
            const a = sequence[i - 1];
            const b = sequence[i];
            let diference = b - a;
            if (nextSequence[i - 1] = diference) {
                allZeroes = false;
            }
        }
        const currentFirst = sequence[0];
        if (allZeroes) {
            return currentFirst;
        }

        const below = calculatePreviousValue(nextSequence);
        return currentFirst - below;
    }

    let totalFirstValue = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const sequence = line.split(" ").map(Number);
        const firstValue = calculatePreviousValue(sequence);
        totalFirstValue += firstValue;
    }

    console.log(totalFirstValue);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
