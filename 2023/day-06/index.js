/** @param {string} input  */
function partOne(input) {
    const INPUT_SIZE = input.length;
    let charCode = 0;
    let inputIndex = 0;
    let lastNumber = 0;
    let numberIndex = 0;

    const RACES_COUNT = 4;
    const races = new Array(RACES_COUNT * 2);

    while (inputIndex < INPUT_SIZE) {
        charCode = input.charCodeAt(inputIndex);
        if (charCode > 47 && charCode < 58) {
            lastNumber = lastNumber * 10 + (charCode - 48);
        }
        else if (lastNumber > 0) {
            races[numberIndex] = lastNumber;
            numberIndex += 1;
            lastNumber = 0;
        }

        inputIndex += 1;
    }

    let combinationsSummary = 1;
    for (let i = 0; i < RACES_COUNT; i++) {
        const time = races[i];
        const distance = races[i + 4];
        let combinations = 0;
        let miliseconds = 1;
        while (miliseconds < time) {
            // @ts-expect-error
            combinations += miliseconds * (time - miliseconds) >= distance;
            miliseconds += 1;
        }
        combinationsSummary *= combinations;
    }

    console.log(combinationsSummary)
}


/** @param {string} input  */
function partTwo(input) {
    const INPUT_SIZE = input.length;
    let charCode = 0;
    let inputIndex = 0;
    let lastNumber = 0;
    let numberIndex = 0;

    const races = new Array(2);

    while (inputIndex < INPUT_SIZE) {
        charCode = input.charCodeAt(inputIndex);
        if (charCode > 47 && charCode < 58) {
            lastNumber = lastNumber * 10 + (charCode - 48);
        }
        else if (charCode === 10) {
            races[numberIndex % 2] = lastNumber;
            numberIndex += 1;
            lastNumber = 0;
        }

        inputIndex += 1;
    }

    const time = races[0];
    const distance = races[1];
    let combinations = 0;
    let miliseconds = 1;

    while (miliseconds < time) {
        // @ts-expect-error
        combinations += miliseconds * (time - miliseconds) >= distance;
        miliseconds += 1;
    }

    console.log(combinations)
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
