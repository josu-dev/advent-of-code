const direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}
/**
 * @typedef {typeof direction[keyof typeof direction]} Direction
 */


class Grid {
    /**
     * @param {number[][]} matrix
     */
    constructor(matrix) {
        this.matrix = matrix
        this.width = matrix[0].length
        this.height = matrix.length
        this.size = this.width * this.height
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Direction} dir
     */
    getMovements(x, y, dir) {
        /** @type {[[number, number], number][]} */
        const movements = []
        if (dir === direction.UP) {
            for (let i = y - 1; i >= Math.max(0, y - 3); i--) {
                movements.push([[x, i], direction.UP])
            }
            return movements
        }

        if (dir === direction.RIGHT) {
            for (let i = x + 1; i <= Math.min(this.width - 1, x + 3); i++) {
                movements.push([[i, y], direction.RIGHT])
            }
            return movements
        }

        if (dir === direction.DOWN) {
            for (let i = y + 1; i <= Math.min(this.height - 1, y + 3); i++) {
                movements.push([[x, i], direction.DOWN])
            }
            return movements
        }

        for (let i = x - 1; i >= Math.max(0, x - 3); i--) {
            movements.push([[i, y], direction.LEFT])
        }
        return movements
    }
}

/**
     * @typedef {{
*    current: Item,
*   currentWeight: number,
*  visited: Set<string>,
* parent: Item | null,
* }} QueueItem
*/

class Item {
    /**
     * @param {[number, number]} pos
     * @param {Direction} dir
     * @param {number} weight
     * @param {Item | null} parent
     * @param {QueueItem[]} caches
     */
    constructor(pos, dir, weight, parent, caches) {
        this.pos = pos
        this.dir = dir
        this.weight = weight
        this.id = `${pos[0]}-${pos[1]}`
        this.parent = parent
        this.cacheds = caches || []
    }

    /**
     * @param {Item} other
     */
    equals(other) {
        return this.pos[0] === other.pos[0] && this.pos[1] === other.pos[1];
    }
}

/** @type {Map<string, QueueItem>} */
let cache = new Map();
/**
 * @param {Grid} grid
 * @param {Item} startItem
 * @param {Item} endItem
 * @param {Set<string>} visited
 * @param {Item[]} path
 * @param {number} startWeight 
 * @return {number}
 */
function scanPaths(grid, startItem, endItem, visited, path, startWeight) {
    
    /** @type {QueueItem[]} */
    const queue = [];

    queue.push({
        current: startItem,
        currentWeight: startWeight + startItem.weight,
        visited,
        parent:null,
    });

    let minimunWeight = Infinity;
    /** @type {[[number, number], number][][]} */
    while (queue.length) {
        const { current, currentWeight, visited } = /** @type {QueueItem}*/(queue.shift());
        if (current.equals(endItem)) {
            if (currentWeight < minimunWeight) {
                minimunWeight = currentWeight
                console.log(minimunWeight)
            }
            let item = current.parent
            let weight = item?.weight || 0;
            while (item) {
                weight += item.weight
                for (const cache of item.cacheds) {
                    if (cache.currentWeight + weight < minimunWeight) {
                        minimunWeight = cache.currentWeight + weight
                        console.log(minimunWeight)
                    }
                }
                item = item.parent
            }

            continue;
        }

        let movements = []
        if (current.dir === direction.UP || current.dir === direction.DOWN) {
            movements.push(grid.getMovements(current.pos[0], current.pos[1], direction.RIGHT))
            movements.push(grid.getMovements(current.pos[0], current.pos[1], direction.LEFT))
        } else {
            movements.push(grid.getMovements(current.pos[0], current.pos[1], direction.UP))
            movements.push(grid.getMovements(current.pos[0], current.pos[1], direction.DOWN))
        }

        for (let movementSet = 0; movementSet < movements.length; movementSet++) {
            let nextWeight = currentWeight;
            let parent = current
            for (const [pos, dir] of movements[movementSet]) {
                const item = new Item(pos, dir, grid.matrix[pos[1]][pos[0]], parent, [])
                nextWeight += item.weight
                if (visited.has(item.id)) {
                    break;
                }

                let cacheKey = `${current.pos[0]}-${current.pos[1]}-${current.dir}-${item.pos[0]}-${item.pos[1]}-${item.dir}`
                const cached = cache.get(cacheKey)
                if (!cached) {
                    let nextVisited = new Set(visited)
                    nextVisited.add(item.id)
                    const item2 = {
                        current: item,
                        currentWeight: nextWeight,
                        visited: nextVisited,
                        parent,
                    }
                    
                    queue.push(item2);
                    cache.set(cacheKey, item2)
                }
                else {
                    cached.current.cacheds.push({
                        current: item,
                        currentWeight: nextWeight,
                        visited: visited,
                        parent,
                    })
                }
                parent = item
            }
        }
    }


    return minimunWeight
}



function findPath(matrix, end) {
    const grid = new Grid(matrix)
    const visited = new Set()
    const startRight = new Item([-1, 0], direction.UP, matrix[0][0], null, [])
    const startBottom = new Item([0, -1], direction.RIGHT, matrix[0][0], null, [])
    const endItem = new Item(end, direction.LEFT, matrix[end[1]][end[0]], null, [])
    let resRight = scanPaths(grid, startRight, endItem, visited.add(startRight.id), [startRight], -2)
    visited.clear()
    let resBottom = scanPaths(grid, startBottom, endItem, visited.add(startBottom.id), [startBottom], -2)
    return Math.min(resRight, resBottom)
}


/** @param {string} input  */
function partOne(input) {
    const matrix = input
        .trim()
        .split("\r\n")
        .map(line => line.split("").map(char => parseInt(char)))

    const SIZE = matrix.length

    console.log(findPath(matrix, [SIZE - 1, SIZE - 1]))
}


/** @param {string} input  */
function partTwo(input) {
}


import fs from "node:fs"
import path from 'node:path'
import url from 'node:url'

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

// const input = await Deno.readTextFile("./input.txt");

partOne(input);

partTwo(input);
