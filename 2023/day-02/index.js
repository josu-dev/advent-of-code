/** @param {string} input  */
function partOne(input) {
    const MAX_BLUE = 14;
    const MAX_GREEN = 13;
    const MAX_RED = 12;

    let inputIndex = 0;
    let charCode = 0;
    let lastCharcode = 0;
    let lastNumber = 0;

    let idsSum = 0;
    let gameIsValid = true;
    let gameID = 0;

    while (inputIndex < input.length) {
        gameID = 0;
        while (inputIndex < input.length && (charCode = input.charCodeAt(inputIndex)) !== 58) {
            inputIndex += 1;
            if (charCode > 47 && charCode < 58) {
                gameID = gameID * 10 + (charCode - 48);
            }
        }

        gameIsValid = true;
        lastNumber = 0;
        while (inputIndex < input.length && (charCode = input.charCodeAt(inputIndex)) !== 10) {
            inputIndex += 1;

            if (charCode > 47 && charCode < 58) {
                lastNumber = lastNumber * 10 + (charCode - 48);
            }
            else if (charCode === 44 || charCode === 59) {
                lastNumber = 0;
            }
            else if (charCode === 98 && lastCharcode === 32 && lastNumber > MAX_BLUE) {
                gameIsValid = false;
                break;
            }
            else if (charCode === 103 && lastCharcode === 32 && lastNumber > MAX_GREEN) {
                gameIsValid = false;
                break;
            }
            else if (charCode === 114 && lastCharcode === 32 && lastNumber > MAX_RED) {
                gameIsValid = false;
                break;
            }

            lastCharcode = charCode;
        }
        if (!gameIsValid) {
            while (inputIndex < input.length && input.charCodeAt(inputIndex) !== 10) {
                inputIndex += 1;
            }
        }
        else {
            idsSum += gameID;
        }
    }

    console.log(idsSum);
}


/** @param {string} input  */
function partTwo(input) {
    let inputIndex = 0;
    let charCode = 0;
    let lastCharcode = 0;
    let powersSum = 0;
    let lastNumber = 0;
    let maximunBlue = 0;
    let maximunGreen = 0;
    let maximunRed = 0;

    while (inputIndex < input.length) {
        while (inputIndex < input.length && (charCode = input.charCodeAt(inputIndex)) !== 58) {
            inputIndex += 1;
        }

        maximunBlue = 0;
        maximunGreen = 0;
        maximunRed = 0;
        lastNumber = 0;

        while (inputIndex < input.length && (charCode = input.charCodeAt(inputIndex)) !== 10) {
            inputIndex += 1;

            if (charCode > 47 && charCode < 58) {
                lastNumber = lastNumber * 10 + (charCode - 48);
            }
            else if (charCode === 44 || charCode === 59) {
                lastNumber = 0;
            }
            else if (charCode === 98 && lastCharcode === 32 && lastNumber > maximunBlue) {
                maximunBlue = lastNumber;
            }
            else if (charCode === 103 && lastCharcode === 32 && lastNumber > maximunGreen) {
                maximunGreen = lastNumber;
            }
            else if (charCode === 114 && lastCharcode === 32 && lastNumber > maximunRed) {
                maximunRed = lastNumber;
            }

            lastCharcode = charCode;
        }

        if (maximunBlue + maximunGreen + maximunRed) {
            powersSum += (
                (maximunBlue ? maximunBlue : 1)
                * (maximunGreen ? maximunGreen : 1)
                * (maximunRed ? maximunRed : 1)
            );
        }
    }

    console.log(powersSum);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
