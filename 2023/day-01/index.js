/** @param {string} input  */
function partOne(input) {
    let firstNumber = 0;
    let lastNumber = 0;

    let totalWeight = 0;

    for (let index = 0; index < input.length; index++) {
        const charCode = input.charCodeAt(index);
        if (charCode > 48 && charCode < 58) {
            if (firstNumber < 1) {
                lastNumber = charCode - 48
                firstNumber = lastNumber * 10
            }
            else {
                lastNumber = charCode - 48
            }
            continue
        }

        if (charCode === 10) {
            if (firstNumber < 1) {
                continue
            }
            totalWeight += firstNumber + lastNumber;
            firstNumber = 0;
            lastNumber = 0;
        }
    }

    if (firstNumber > 0) {
        totalWeight += firstNumber + lastNumber;
    }

    console.log(totalWeight);
}


/** @param {string} input  */
function partTwo(input) {
    let firstNumber = 0;
    let lastNumber = 0;

    let totalWeight = 0;

    /** @type {[number, number[]][]} */
    const numbersCharCodes = [
        [3, [111, 110, 101]],
        [3, [116, 119, 111]],
        [5, [116, 104, 114, 101, 101]],
        [4, [102, 111, 117, 114]],
        [4, [102, 105, 118, 101]],
        [3, [115, 105, 120]],
        [5, [115, 101, 118, 101, 110]],
        [5, [101, 105, 103, 104, 116]],
        [4, [110, 105, 110, 101]]
    ]

    for (let index = 0; index < input.length; index++) {
        const charCode = input.charCodeAt(index);
        if (charCode > 48 && charCode < 58) {
            if (firstNumber < 1) {
                lastNumber = charCode - 48
                firstNumber = lastNumber * 10
            }
            else {
                lastNumber = charCode - 48
            }
            continue
        }
        else if (charCode !== 10) {
            let number = 0;
            let matched = true;
            for (let ni = 0; ni < 9 && (index + ni) < (input.length - 1); ni++) {
                matched = true;
                for (let ci = 0; ci < numbersCharCodes[ni][0]; ci++) {
                    if (input.charCodeAt(index + ci) !== numbersCharCodes[ni][1][ci]) {
                        matched = false;
                        break;
                    }
                }

                if (matched) {
                    number = ni + 1;
                    break;
                }
            }
            if (number < 1) {
                continue;
            }

            if (firstNumber < 1) {
                firstNumber = number * 10
                lastNumber = number
            }
            else {
                lastNumber = number
            }
        }
        else {
            if (firstNumber < 1) {
                continue
            }
            totalWeight += firstNumber + lastNumber;
            firstNumber = 0;
            lastNumber = 0;
        }
    }

    if (firstNumber > 0) {
        totalWeight += firstNumber + lastNumber;
    }

    console.log(totalWeight);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
