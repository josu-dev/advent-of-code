/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    /** @type {string[][]} */
    const universe = new Array(SIZE);
    /** @type {{id: number, x: number, y:number}[]} */
    const points = new Array();

    let id = 1;
    for (let y = 0; y < (SIZE); y++) {
        const line = lines[y];
        /** @type {string[]} */
        const tiles = new Array(SIZE);
        for (let x = 0; x < (SIZE); x++) {
            const tile = line[x];
            tiles[x] = tile;
            if (tile === "#") {
                points.push({ id: id++, x, y });
            }
        }
        universe[y] = tiles;
    }

    for (let y = SIZE - 1; y >= 0; y--) {
        let x;
        for (x = 0; x < SIZE; x++) {
            if (universe[y][x] === "#") {
                break;
            }
        }
        if (x === SIZE) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                if (point.y > y) {
                    point.y += 1;
                }
            }
        }
    }
    for (let x = SIZE - 1; x >= 0; x--) {
        let y;
        for (y = 0; y < SIZE; y++) {
            if (universe[y][x] === "#") {
                break;
            }
        }
        if (y === SIZE) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                if (point.x > x) {
                    point.x += 1;
                }
            }
        }
    }

    let distances = 0;
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const other = points[j];
            distances += Math.abs(point.x - other.x) + Math.abs(point.y - other.y);
        }
    }

    console.log(distances);
}


/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    /** @type {string[][]} */
    const universe = new Array(SIZE);
    /** @type {{id: number, x: number, y:number}[]} */
    const points = new Array();

    let id = 1;
    for (let y = 0; y < (SIZE); y++) {
        const line = lines[y];
        /** @type {string[]} */
        const tiles = new Array(SIZE);
        for (let x = 0; x < (SIZE); x++) {
            const tile = line[x];
            tiles[x] = tile;
            if (tile === "#") {
                points.push({ id: id++, x, y });
            }
        }
        universe[y] = tiles;
    }

    for (let y = SIZE - 1; y >= 0; y--) {
        let x;
        for (x = 0; x < SIZE; x++) {
            const tile = universe[y][x];
            if (tile === "#") {
                break;
            }
        }
        if (x === SIZE) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                if (point.y > y) {
                    point.y += 999999;
                }
            }
        }
    }
    for (let x = SIZE - 1; x >= 0; x--) {
        let y;
        for (y = 0; y < SIZE; y++) {
            const tile = universe[y][x];
            if (tile === "#") {
                break;
            }
        }
        if (y === SIZE) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                if (point.x > x) {
                    point.x += 999999;
                }
            }
        }
    }

    let distances = 0;
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const other = points[j];
            distances += Math.abs(point.x - other.x) + Math.abs(point.y - other.y);
        }
    }

    console.log(distances);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
