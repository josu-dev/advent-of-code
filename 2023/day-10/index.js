/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\n");
    const HEIGHT = lines.length;
    const WIDTH = lines[0].length;

    const grid = new Array(HEIGHT);
    const start = { x: -1, y: -1 };

    for (let y = 0; y < HEIGHT; y++) {
        const line = lines[y];
        const tiles = new Array(WIDTH);
        for (let x = 0; x < WIDTH; x++) {
            const tile = line[x];
            tiles[x] = tile;
            if (tile === "S") {
                start.x = x;
                start.y = y;
            }
        }
        grid[y] = tiles;
    }
    if (start.x === -1) {
        console.log("no 'S' provided as starting location");
        return;
    }

    /**
     * @param {string[][]} grid 
     * @param {{x: number, y: number}} location 
     * @param {{x: number, y: number}} direction 
     * @returns {string | false}
     */
    function nextTile(grid, location, direction) {
        const x = location.x + direction.x;
        const y = location.y + direction.y;
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
            return false;
        }
        const nextTile = grid[y][x];
        if (direction.x === 1) {
            if (nextTile === "7") {
                direction.x = 0;
                direction.y = 1;
            }
            else if (nextTile === "J") {
                direction.x = 0;
                direction.y = -1;
            }
            else if (nextTile === "-") {
                direction.x = 1;
                direction.y = 0;
            }
            else {
                return false;
            }
        }
        else if (direction.x === -1) {
            if (nextTile === "F") {
                direction.x = 0;
                direction.y = 1;
            }
            else if (nextTile === "L") {
                direction.x = 0;
                direction.y = -1;
            }
            else if (nextTile === "-") {
                direction.x = -1;
                direction.y = 0;
            }
            else {
                return false;
            }
        }
        else if (direction.y === -1) {
            if (nextTile === "F") {
                direction.x = 1;
                direction.y = 0;
            }
            else if (nextTile === "7") {
                direction.x = -1;
                direction.y = 0;
            }
            else if (nextTile === "|") {
                direction.x = 0;
                direction.y = -1;
            }
            else {
                return false;
            }
        }
        else if (direction.y === 1) {
            if (nextTile === "J") {
                direction.x = -1;
                direction.y = 0;
            }
            else if (nextTile === "L") {
                direction.x = 1;
                direction.y = 0;
            }
            else if (nextTile === "|") {
                direction.x = 0;
                direction.y = 1;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        location.x = x;
        location.y = y;
        return nextTile;
    }

    const location = { x: start.x, y: start.y };
    const direction = { x: 0, y: -1 };
    if (nextTile(grid, location, { x: 0, y: -1 })) {
        direction.x = 0;
        direction.y = -1;
    }
    else if (nextTile(grid, location, { x: 0, y: 1 })) {
        direction.x = 0;
        direction.y = 1;
    }
    else if (nextTile(grid, location, { x: 1, y: 0 })) {
        direction.x = 1;
        direction.y = 0;
    }
    else if (nextTile(grid, location, { x: -1, y: 0 })) {
        direction.x = -1;
        direction.y = 0;
    }

    location.x = start.x;
    location.y = start.y;

    let steps = 0;
    do {
        steps += 1;
    }
    while (nextTile(grid, location, direction));

    console.log(steps / 2);
}


/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\n");
    const HEIGHT = lines.length
    const WIDTH = lines[0].length

    const grid = new Array(HEIGHT);
    const start = { x: -1, y: -1 };

    for (let y = 0; y < HEIGHT; y++) {
        const line = lines[y];
        const tiles = new Array(WIDTH);
        for (let x = 0; x < WIDTH; x++) {
            const tile = line[x];
            tiles[x] = tile;
            if (tile === "S") {
                start.x = x;
                start.y = y;
            }
        }
        grid[y] = tiles;
    }
    if (start.x === -1) {
        console.log("no 'S' provided as starting location");
        return;
    }

    /**
     * @param {string[][]} grid 
     * @param {{x: number, y: number}} location 
     * @param {{x: number, y: number}} direction 
     * @returns {string | false}
     */
    function nextTile(grid, location, direction) {
        const x = location.x + direction.x;
        const y = location.y + direction.y;
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
            return false;
        }
        const nextTile = grid[y][x];
        if (direction.x === 1) {
            if (nextTile === "7") {
                direction.x = 0;
                direction.y = 1;
            }
            else if (nextTile === "J") {
                direction.x = 0;
                direction.y = -1;
            }
            else if (nextTile === "-") {
                direction.x = 1;
                direction.y = 0;
            }
            else {
                return false;
            }
        }
        else if (direction.x === -1) {
            if (nextTile === "F") {
                direction.x = 0;
                direction.y = 1;
            }
            else if (nextTile === "L") {
                direction.x = 0;
                direction.y = -1;
            }
            else if (nextTile === "-") {
                direction.x = -1;
                direction.y = 0;
            }
            else {
                return false;
            }
        }
        else if (direction.y === -1) {
            if (nextTile === "F") {
                direction.x = 1;
                direction.y = 0;
            }
            else if (nextTile === "7") {
                direction.x = -1;
                direction.y = 0;
            }
            else if (nextTile === "|") {
                direction.x = 0;
                direction.y = -1;
            }
            else {
                return false;
            }
        }
        else if (direction.y === 1) {
            if (nextTile === "J") {
                direction.x = -1;
                direction.y = 0;
            }
            else if (nextTile === "L") {
                direction.x = 1;
                direction.y = 0;
            }
            else if (nextTile === "|") {
                direction.x = 0;
                direction.y = 1;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        location.x = x;
        location.y = y;
        return nextTile;
    }

    const location = { x: start.x, y: start.y };
    const direction = { x: 0, y: -1 };
    if (nextTile(grid, location, { x: 0, y: -1 })) {
        direction.x = 0;
        direction.y = -1;
    }
    else if (nextTile(grid, location, { x: 0, y: 1 })) {
        direction.x = 0;
        direction.y = 1;
    }
    else if (nextTile(grid, location, { x: 1, y: 0 })) {
        direction.x = 1;
        direction.y = 0;
    }
    else if (nextTile(grid, location, { x: -1, y: 0 })) {
        direction.x = -1;
        direction.y = 0;
    }

    location.x = start.x;
    location.y = start.y;

    /**
     * @param {string[][]} grid 
     * @param {{x: number, y: number}} location 
     * @param {{x: number, y: number}} direction
     * @param {Set<string>} visited
     * @returns {void}
     */
    function visitLoop(grid, location, direction, visited) {
        do {
            visited.add(`${location.x},${location.y}`);
        }
        while (nextTile(grid, location, direction));
    }

    /**
     * @param {string[][]} grid 
     * @param {{x: number, y: number}} location 
     * @param {{x: number, y: number}} direction
     * @param {Set<string>} visited
     * @returns {void}
     */
    function markTilesEnclosed(grid, location, direction, visited) {
        do {
            if (direction.x === 1) {
                if (!visited.has(`${location.x},${location.y + 1}`)) {
                    grid[location.y + 1][location.x] = "#";
                }
                if (!visited.has(`${location.x + 1},${location.y + 1}`)) {
                    grid[location.y + 1][location.x + 1] = "#";
                }
            }
            else if (direction.x === -1) {
                if (!visited.has(`${location.x},${location.y - 1}`)) {
                    grid[location.y - 1][location.x] = "#";
                }
                if (!visited.has(`${location.x - 1},${location.y - 1}`)) {
                    grid[location.y - 1][location.x - 1] = "#";
                }
            }
            else if (direction.y === 1) {
                if (!visited.has(`${location.x - 1},${location.y}`)) {
                    grid[location.y][location.x - 1] = "#";
                }
                if (!visited.has(`${location.x - 1},${location.y + 1}`)) {
                    grid[location.y + 1][location.x - 1] = "#";
                }
            }
            else if (direction.y === -1) {
                if (!visited.has(`${location.x + 1},${location.y}`)) {
                    grid[location.y][location.x + 1] = "#";
                }
                if (!visited.has(`${location.x + 1},${location.y - 1}`)) {
                    grid[location.y - 1][location.x + 1] = "#";
                }
            }

            grid[location.y][location.x] = " ";
        }
        while (nextTile(grid, location, direction));

        for (let y = 0; y < HEIGHT; y++) {
            let i = 0;
            while (i < WIDTH) {
                if (grid[y][i] === "#") {
                    let hasStop = false;
                    i += 1;
                    let j = i;
                    while (j < WIDTH && grid[y][j] !== " ") {
                        if (grid[y][j] === "#") {
                            hasStop = true;
                            break;
                        }
                        j += 1;
                    }
                    if (hasStop) {
                        while (i < WIDTH && grid[y][i] !== "#") {
                            grid[y][i] = "#";
                            i += 1;
                        }
                    }
                }
                else {
                    i += 1;
                }
            }
        }
    }

    const visited = new Set();
    visitLoop(grid, { ...start }, { ...direction }, visited);
    markTilesEnclosed(grid, { ...start }, { ...direction }, visited);

    let tilesInside = 0;
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            // @ts-expect-error
            tilesInside += grid[y][x] === "#"
        }
    }

    console.log(tilesInside);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
