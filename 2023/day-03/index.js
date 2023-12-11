/** @param {string} input  */
function partOne(input) {
    const INPUT_SIZE = input.length;
    const LINE_LENGTH = 142;
    let inputIndex = 0;
    let charCode = 0;
    let lastNumber = 0;
    let partsSum = 0;
    let hasAdjacentSymbol = false;

    while (inputIndex < INPUT_SIZE) {
        while (inputIndex < INPUT_SIZE && (charCode = input.charCodeAt(inputIndex)) !== 10) {
            if (charCode > 47 && charCode < 58) {
                lastNumber = lastNumber * 10 + (charCode - 48);

                if (inputIndex - LINE_LENGTH > -1) {
                    const top = input.charCodeAt(inputIndex - LINE_LENGTH);
                    if (top > 22 && top < 46 || top === 47 || top === 61 || top === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex - LINE_LENGTH + 1 > -1) {
                    const topRight = input.charCodeAt(inputIndex - LINE_LENGTH + 1);
                    if (topRight > 22 && topRight < 46 || topRight === 47 || topRight === 61 || topRight === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex + 1 < input.length) {
                    const right = input.charCodeAt(inputIndex + 1);
                    if (right > 22 && right < 46 || right === 47 || right === 61 || right === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex + LINE_LENGTH + 1 < input.length) {
                    const bottomRight = input.charCodeAt(inputIndex + LINE_LENGTH + 1);
                    if (bottomRight > 22 && bottomRight < 46 || bottomRight === 47 || bottomRight === 61 || bottomRight === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex + LINE_LENGTH < input.length) {
                    const bottom = input.charCodeAt(inputIndex + LINE_LENGTH);
                    if (bottom > 22 && bottom < 46 || bottom === 47 || bottom === 61 || bottom === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex + LINE_LENGTH - 1 < input.length) {
                    const bottomLeft = input.charCodeAt(inputIndex + LINE_LENGTH - 1);
                    if (bottomLeft > 22 && bottomLeft < 46 || bottomLeft === 47 || bottomLeft === 61 || bottomLeft === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex - 1 > -1) {
                    const left = input.charCodeAt(inputIndex - 1);
                    if (left > 22 && left < 46 || left === 47 || left === 61 || left === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
                if (inputIndex - LINE_LENGTH - 1 > -1) {
                    const topLeft = input.charCodeAt(inputIndex - LINE_LENGTH - 1);
                    if (topLeft > 22 && topLeft < 46 || topLeft === 47 || topLeft === 61 || topLeft === 64) {
                        hasAdjacentSymbol = true;
                    }
                }
            }
            else {
                if (lastNumber > 0) {
                    if (hasAdjacentSymbol) {
                        partsSum += lastNumber;
                    }
                    lastNumber = 0;
                    hasAdjacentSymbol = false;
                }
            }

            inputIndex += 1;
        }

        inputIndex += 1;
    }

    console.log(partsSum);
}


/** @param {string} input  */
function partTwo(input) {
    const INPUT_SIZE = input.length;
    const LINE_LENGTH = 142;

    const GEARS_FOUND = new Array(INPUT_SIZE)
    for (let i = 0; i < INPUT_SIZE; i++) {
        GEARS_FOUND[i] = [0, 0, 0];
    }

    const NUMBERS_FOUND = new Array(INPUT_SIZE)
    for (let i = 0; i < INPUT_SIZE; i++) {
        NUMBERS_FOUND[i] = 0;
    }

    let inputIndex = 0;
    let charCode = 0;
    let lastNumber = 0;
    let lastNumberStart = 0;
    let foundCount = 0;

    while (inputIndex < INPUT_SIZE) {
        while (inputIndex < INPUT_SIZE && (charCode = input.charCodeAt(inputIndex)) !== 10) {
            if (charCode > 47 && charCode < 58) {
                if (lastNumber === 0) {
                    lastNumberStart = inputIndex;
                }
                lastNumber = lastNumber * 10 + (charCode - 48);

                const topPos = inputIndex - LINE_LENGTH;
                if (topPos > -1 && input.charCodeAt(topPos) === 42) {
                    foundCount = GEARS_FOUND[topPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[topPos][0] += 1;
                        GEARS_FOUND[topPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[topPos][1] !== lastNumberStart) {
                        GEARS_FOUND[topPos][0] += 1;
                        GEARS_FOUND[topPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[topPos][1] !== lastNumberStart && GEARS_FOUND[topPos][2] !== lastNumberStart) {
                        GEARS_FOUND[topPos][0] += 1;
                    }
                }

                const topRightPos = inputIndex - LINE_LENGTH + 1;
                if (topRightPos > -1 && input.charCodeAt(topRightPos) === 42) {
                    foundCount = GEARS_FOUND[topRightPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[topRightPos][0] += 1;
                        GEARS_FOUND[topRightPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[topRightPos][1] !== lastNumberStart) {
                        GEARS_FOUND[topRightPos][0] += 1;
                        GEARS_FOUND[topRightPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[topRightPos][1] !== lastNumberStart && GEARS_FOUND[topRightPos][2] !== lastNumberStart) {
                        GEARS_FOUND[topRightPos][0] += 1;
                    }
                }

                const rightPos = inputIndex + 1;
                if (rightPos < input.length && input.charCodeAt(rightPos) === 42) {
                    foundCount = GEARS_FOUND[rightPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[rightPos][0] += 1;
                        GEARS_FOUND[rightPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[rightPos][1] !== lastNumberStart) {
                        GEARS_FOUND[rightPos][0] += 1;
                        GEARS_FOUND[rightPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[rightPos][1] !== lastNumberStart && GEARS_FOUND[rightPos][2] !== lastNumberStart) {
                        GEARS_FOUND[rightPos][0] += 1;
                    }
                }

                const bottomRightPos = inputIndex + LINE_LENGTH + 1;
                if (bottomRightPos < input.length && input.charCodeAt(bottomRightPos) === 42) {
                    foundCount = GEARS_FOUND[bottomRightPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[bottomRightPos][0] += 1;
                        GEARS_FOUND[bottomRightPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[bottomRightPos][1] !== lastNumberStart) {
                        GEARS_FOUND[bottomRightPos][0] += 1;
                        GEARS_FOUND[bottomRightPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[bottomRightPos][1] !== lastNumberStart && GEARS_FOUND[bottomRightPos][2] !== lastNumberStart) {
                        GEARS_FOUND[bottomRightPos][0] += 1;
                    }
                }

                const bottomPos = inputIndex + LINE_LENGTH;
                if (bottomPos < input.length && input.charCodeAt(bottomPos) === 42) {
                    foundCount = GEARS_FOUND[bottomPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[bottomPos][0] += 1;
                        GEARS_FOUND[bottomPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[bottomPos][1] !== lastNumberStart) {
                        GEARS_FOUND[bottomPos][0] += 1;
                        GEARS_FOUND[bottomPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[bottomPos][1] !== lastNumberStart && GEARS_FOUND[bottomPos][2] !== lastNumberStart) {
                        GEARS_FOUND[bottomPos][0] += 1;
                    }
                }

                const bottomLeftPos = inputIndex + LINE_LENGTH - 1;
                if (bottomLeftPos < input.length && input.charCodeAt(bottomLeftPos) === 42) {
                    foundCount = GEARS_FOUND[bottomLeftPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[bottomLeftPos][0] += 1;
                        GEARS_FOUND[bottomLeftPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[bottomLeftPos][1] !== lastNumberStart) {
                        GEARS_FOUND[bottomLeftPos][0] += 1;
                        GEARS_FOUND[bottomLeftPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[bottomLeftPos][1] !== lastNumberStart && GEARS_FOUND[bottomLeftPos][2] !== lastNumberStart) {
                        GEARS_FOUND[bottomLeftPos][0] += 1;
                    }
                }

                const leftPos = inputIndex - 1;
                if (leftPos > -1 && input.charCodeAt(leftPos) === 42) {
                    foundCount = GEARS_FOUND[leftPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[leftPos][0] += 1;
                        GEARS_FOUND[leftPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[leftPos][1] !== lastNumberStart) {
                        GEARS_FOUND[leftPos][0] += 1;
                        GEARS_FOUND[leftPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[leftPos][1] !== lastNumberStart && GEARS_FOUND[leftPos][2] !== lastNumberStart) {
                        GEARS_FOUND[leftPos][0] += 1;
                    }
                }

                const topLeftPos = inputIndex - LINE_LENGTH - 1;
                if (topLeftPos > -1 && input.charCodeAt(topLeftPos) === 42) {
                    foundCount = GEARS_FOUND[topLeftPos][0];
                    if (foundCount === 0) {
                        GEARS_FOUND[topLeftPos][0] += 1;
                        GEARS_FOUND[topLeftPos][1] = lastNumberStart;
                    }
                    else if (foundCount === 1 && GEARS_FOUND[topLeftPos][1] !== lastNumberStart) {
                        GEARS_FOUND[topLeftPos][0] += 1;
                        GEARS_FOUND[topLeftPos][2] = lastNumberStart;
                    }
                    else if (GEARS_FOUND[topLeftPos][1] !== lastNumberStart && GEARS_FOUND[topLeftPos][2] !== lastNumberStart) {
                        GEARS_FOUND[topLeftPos][0] += 1;
                    }
                }
            }
            else {
                if (lastNumber > 0) {
                    NUMBERS_FOUND[lastNumberStart] = lastNumber;
                    lastNumber = 0;
                }
            }

            inputIndex += 1;
        }

        inputIndex += 1;
    }

    let totalGearRatios = 0;
    /** @type {[number, number, number]} */
    let gear;
    for (let i = 0; i < INPUT_SIZE; i++) {
        gear = GEARS_FOUND[i];
        if (gear[0] === 2) {
            totalGearRatios += NUMBERS_FOUND[gear[1]] * NUMBERS_FOUND[gear[2]];
        }
    }

    console.log(totalGearRatios);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

// symbols #$%&*+-/=@
partOne(input);

partTwo(input);
