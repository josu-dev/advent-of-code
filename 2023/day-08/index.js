/** @param {string} input  */
function partOne(input) {
    const START_LOCATION = "AAA";
    const END_LOCATION = "ZZZ";
    const network = new Map();

    const lines = input.trim().split("\n");

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        network.set(line.slice(0, 3), [line.slice(7, 10), line.slice(12, 15)]);
    }

    let currentLocation = START_LOCATION;
    /** @type {string} */
    let direction;
    /** @type {number} */
    let directionIndex;
    const directions = lines[0];
    /** @type {number} */
    let steps;
    for (steps = 0; currentLocation !== END_LOCATION; steps++) {
        direction = directions[steps % (directions.length - 1)];
        directionIndex = direction === "L" ? 0 : 1;
        currentLocation = network.get(currentLocation)[directionIndex];
    }

    console.log(steps);
}


/** @param {string} input  */
function partTwo(input) {
    const network = new Map();
    const locations = new Array();

    const lines = input.trim().split("\n");

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const name = line.slice(0, 3);
        if (name.charCodeAt(2) === 65) {
            locations.push(name);
        }
        network.set(name, [line.slice(7, 10), line.slice(12, 15)]);
    }

    const directions = lines[0];

    let minimunSteps = new Array();
    for (let locationIndex = 0; locationIndex < locations.length; locationIndex++) {
        let direction;
        let directionIndex;
        let currentLocation = locations[locationIndex];
        let i;
        for (i = 0; currentLocation.charCodeAt(2) !== 90; i++) {
            direction = directions[i % (directions.length - 1)];
            directionIndex = direction === "L" ? 0 : 1;
            currentLocation = network.get(currentLocation)[directionIndex];
        }
        minimunSteps.push(i);
    }

    // code based on https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/math/least-common-multiple/leastCommonMultiple.js
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function euclideanAlgorithm(a, b) {
        return (b === 0) ? a : euclideanAlgorithm(b, a % b);
    }
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function leastCommonMultiple(a, b) {
        return ((a === 0) || (b === 0)) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
    }

    let steps = minimunSteps[0];
    for (let i = 1; i < minimunSteps.length; i++) {
        steps = leastCommonMultiple(steps, minimunSteps[i]);
    }

    console.log(steps);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
