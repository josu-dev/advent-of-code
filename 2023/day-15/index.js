/** @param {string} input  */
function partOne(input) {
    const total = input
        .trim()
        .split(",")
        .reduce((acc, crr) => (
            acc + crr.split("").reduce(
                (acc, char) => ((acc + char.charCodeAt(0)) * 17) % 256, 0
            )),
            0
        )

    console.log(total)
}


/** @param {string} input  */
function partTwo(input) {
    /** @type {string} */
    let auxLabel;
    /** @type {boolean} */
    let auxOpRemoves;
    /** @type {number} */
    let auxIndex;

    /**
     * @typedef {{label:string,removes:boolean,hash:Number,focalLength:number}} Item
     */

    const total = input
        .trim()
        .split(",")
        .map((sequence) => ({
            removes: auxOpRemoves = sequence.endsWith("-"),
            label: auxLabel = (
                auxOpRemoves
                    ? sequence.slice(0, -1)
                    : sequence.slice(0, -2)
            ),
            hash: auxLabel
                .split("")
                .reduce((acc, char) =>
                    ((acc + char.charCodeAt(0)) * 17) % 256
                    , 0
                ),
            focalLength: parseInt(sequence.charAt(sequence.length - 1))
        }))
        .reduce(
            (acc, crr) => (crr.removes)
                ? (
                    (auxIndex = acc[crr.hash].findIndex(item => item.label === crr.label)) > -1
                        ? (acc[crr.hash].splice(auxIndex, 1), acc)
                        : acc
                )
                : (
                    (auxIndex = acc[crr.hash].findIndex(item => item.label === crr.label)) > -1
                        ? (acc[crr.hash].splice(auxIndex, 1, crr), acc)
                        : (acc[crr.hash].push(crr), acc)
                ),
            new Array(256).fill(0).map(() => /** @type {Item[]} */([]))
        )
        .reduce(
            (acc, crr, boxIndex) => acc + crr.reduce(
                (acc, item, slot) => (
                    acc + (boxIndex + 1) * (slot + 1) * item.focalLength
                ),
                0
            ),
            0
        )

    console.log(total)
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
