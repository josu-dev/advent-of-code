/** @param {string} input  */
function partOne(input) {
    const INPUT_SIZE = input.length;
    let charCode = 0;
    let inputIndex = 0;
    let lastNumber = 0;

    const winningNumbers = new Array(10);
    let winningNumbersCount = 0;

    let points = 0;
    let totalPoints = 0;

    const cardsCount = new Array(217);
    for (let i = 1; i < 217; i++) {
        cardsCount[i] = 1;
    }

    while (inputIndex < INPUT_SIZE) {
        charCode = input.charCodeAt(inputIndex);
        if (charCode > 47 && charCode < 58) {
            lastNumber = lastNumber * 10 + (charCode - 48);
        }
        else if (lastNumber > 0) {
            if (winningNumbersCount < 10) {
                winningNumbers[winningNumbersCount] = lastNumber;
                winningNumbersCount += 1;
            }
            else {
                for (let i = 0; i < 10; i++) {
                    if (winningNumbers[i] === lastNumber) {
                        points += 1
                        break;
                    }
                }
            }

            lastNumber = 0;
        }
        else if (charCode === 10) {
            // @ts-expect-error
            totalPoints += 1 << (points - (points > 0));
            points = 0;
            winningNumbersCount = 0;
        }

        inputIndex += 1;
    }

    console.log(totalPoints);
}


/** @param {string} input  */
function partTwo(input) {
    const INPUT_SIZE = input.length;
    let charCode = 0;
    let inputIndex = 0;
    let lastNumber = 0;
    let cardNumber = 0;

    const winningNumbers = new Array(10);
    let winningNumbersCount = 0;

    let matches = 0;
    let totalCardsCount = 0;

    const cardsCount = new Array(217);
    for (let i = 1; i < 217; i++) {
        cardsCount[i] = 1;
    }

    while (inputIndex < INPUT_SIZE) {
        charCode = input.charCodeAt(inputIndex);
        if (charCode > 47 && charCode < 58) {
            lastNumber = lastNumber * 10 + (charCode - 48);
        }
        else if (lastNumber > 0) {
            if (charCode === 58) {
                cardNumber = lastNumber;
            }
            else if (winningNumbersCount < 10) {
                winningNumbers[winningNumbersCount] = lastNumber;
                winningNumbersCount += 1;
            }
            else {
                for (let i = 0; i < 10; i++) {
                    if (winningNumbers[i] === lastNumber) {
                        matches += 1;
                        break;
                    }
                }
            }

            lastNumber = 0;
        }
        else if (charCode === 10) {
            totalCardsCount += cardsCount[cardNumber];

            for (let i = 1; i <= matches; i++) {
                cardsCount[cardNumber + i] += cardsCount[cardNumber];
            }

            lastNumber = 0;
            matches = 0;
            winningNumbersCount = 0;
        }

        inputIndex += 1;
    }

    console.log(totalCardsCount);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
