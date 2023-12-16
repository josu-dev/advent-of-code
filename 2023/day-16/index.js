/** @param {string} input  */
function partOne(input) {
    const matrix = input
        .trim()
        .split("\r\n")
        .map(line => line.split(""))

    const SIZE = matrix.length

    const TO_RIGHT = 1
    const TO_BOTTOM = 2
    const TO_LEFT = 4
    const TO_TOP = 8

    /** @type {Map<string, number>} */
    const visited = new Map()

    /**
     * @param {string[][]} matrix
     * @param {number} size
     * @param {{x: number, y: number}} pos
     * @param {number} dir
     * @param {Map<string, number>} visited
     */
    function traceBeam(matrix, size, pos, dir, visited) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (pos.x < 0 || pos.x >= size || pos.y < 0 || pos.y >= size) {
                return
            }
            const key = `${pos.x},${pos.y}`
            const value = visited.get(key)
            if (!value) {
                visited.set(key, dir)
            }
            else if (value & dir) {
                return
            }
            else {
                visited.set(key, value | dir)
            }

            const current = matrix[pos.y][pos.x]
            if (current === "." || ((dir === TO_RIGHT || dir === TO_LEFT) && current === "-") || ((dir === TO_TOP || dir === TO_BOTTOM) && current === "|")) {
                if (dir === TO_RIGHT) {
                    pos.x++
                }
                else if (dir === TO_BOTTOM) {
                    pos.y++
                }
                else if (dir === TO_LEFT) {
                    pos.x--
                }
                else if (dir === TO_TOP) {
                    pos.y--
                }
                continue;
            }

            if (current === "/") {
                if (dir === TO_RIGHT) {
                    dir = TO_TOP
                    pos.y--
                }
                else if (dir === TO_BOTTOM) {
                    dir = TO_LEFT
                    pos.x--
                }
                else if (dir === TO_LEFT) {
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_TOP) {
                    dir = TO_RIGHT
                    pos.x++
                }
                continue;
            }

            if (current === "\\") {
                if (dir === TO_RIGHT) {
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_BOTTOM) {
                    dir = TO_RIGHT
                    pos.x++
                }
                else if (dir === TO_LEFT) {
                    dir = TO_TOP
                    pos.y--
                }
                else if (dir === TO_TOP) {
                    dir = TO_LEFT
                    pos.x--
                }
                continue;
            }

            if (current === "|") {
                if (dir === TO_RIGHT) {
                    traceBeam(matrix, size, { x: pos.x, y: pos.y - 1 }, TO_TOP, visited)
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_LEFT) {
                    traceBeam(matrix, size, { x: pos.x, y: pos.y - 1 }, TO_TOP, visited)
                    dir = TO_BOTTOM
                    pos.y++
                }
                continue;
            }

            if (current === "-") {
                if (dir === TO_TOP) {
                    traceBeam(matrix, size, { x: pos.x - 1, y: pos.y }, TO_LEFT, visited)
                    dir = TO_RIGHT
                    pos.x++
                }
                else if (dir === TO_BOTTOM) {
                    traceBeam(matrix, size, { x: pos.x - 1, y: pos.y }, TO_LEFT, visited)
                    dir = TO_RIGHT
                    pos.x++
                }
                continue;
            }

            return;
        }
    }

    traceBeam(matrix, SIZE, { x: 0, y: 0 }, TO_RIGHT, visited)

    console.log(visited.size)
}


/** @param {string} input  */
function partTwo(input) {
    const matrix = input
        .trim()
        .split("\r\n")
        .map(line => line.split(""))

    const SIZE = matrix.length

    const TO_RIGHT = 1
    const TO_BOTTOM = 2
    const TO_LEFT = 4
    const TO_TOP = 8

    /** @type {Map<string, number>} */
    const visited = new Map()

    /**
     * @param {string[][]} matrix
     * @param {number} size
     * @param {{x: number, y: number}} pos
     * @param {number} dir
     * @param {Map<string, number>} visited
     */
    function traceBeam(matrix, size, pos, dir, visited) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (pos.x < 0 || pos.x >= size || pos.y < 0 || pos.y >= size) {
                return
            }
            const key = `${pos.x},${pos.y}`
            const value = visited.get(key)
            if (!value) {
                visited.set(key, dir)
            }
            else if (value & dir) {
                return
            }
            else {
                visited.set(key, value | dir)
            }

            const current = matrix[pos.y][pos.x]
            if (current === "." || ((dir === TO_RIGHT || dir === TO_LEFT) && current === "-") || ((dir === TO_TOP || dir === TO_BOTTOM) && current === "|")) {
                if (dir === TO_RIGHT) {
                    pos.x++
                }
                else if (dir === TO_BOTTOM) {
                    pos.y++
                }
                else if (dir === TO_LEFT) {
                    pos.x--
                }
                else if (dir === TO_TOP) {
                    pos.y--
                }
                continue;
            }

            if (current === "/") {
                if (dir === TO_RIGHT) {
                    dir = TO_TOP
                    pos.y--
                }
                else if (dir === TO_BOTTOM) {
                    dir = TO_LEFT
                    pos.x--
                }
                else if (dir === TO_LEFT) {
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_TOP) {
                    dir = TO_RIGHT
                    pos.x++
                }
                continue;
            }

            if (current === "\\") {
                if (dir === TO_RIGHT) {
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_BOTTOM) {
                    dir = TO_RIGHT
                    pos.x++
                }
                else if (dir === TO_LEFT) {
                    dir = TO_TOP
                    pos.y--
                }
                else if (dir === TO_TOP) {
                    dir = TO_LEFT
                    pos.x--
                }
                continue;
            }

            if (current === "|") {
                if (dir === TO_RIGHT) {
                    traceBeam(matrix, size, { x: pos.x, y: pos.y - 1 }, TO_TOP, visited)
                    dir = TO_BOTTOM
                    pos.y++
                }
                else if (dir === TO_LEFT) {
                    traceBeam(matrix, size, { x: pos.x, y: pos.y - 1 }, TO_TOP, visited)
                    dir = TO_BOTTOM
                    pos.y++
                }
                continue;
            }

            if (current === "-") {
                if (dir === TO_TOP) {
                    traceBeam(matrix, size, { x: pos.x - 1, y: pos.y }, TO_LEFT, visited)
                    dir = TO_RIGHT
                    pos.x++
                }
                else if (dir === TO_BOTTOM) {
                    traceBeam(matrix, size, { x: pos.x - 1, y: pos.y }, TO_LEFT, visited)
                    dir = TO_RIGHT
                    pos.x++
                }
                continue;
            }

            return;
        }
    }

    let maximun = 0;
    for (let x = 0; x < SIZE; x++) {
        traceBeam(matrix, SIZE, { x: x, y: 0 }, TO_BOTTOM, visited)
        if (visited.size > maximun) {
            maximun = visited.size
        }
        visited.clear()
    }
    for (let y = 0; y < SIZE; y++) {
        traceBeam(matrix, SIZE, { x: (SIZE - 1), y: y }, TO_LEFT, visited)
        if (visited.size > maximun) {
            maximun = visited.size
        }
        visited.clear()
    }
    for (let x = (SIZE - 1); x >= 0; x--) {
        traceBeam(matrix, SIZE, { x: x, y: (SIZE - 1) }, TO_TOP, visited)
        if (visited.size > maximun) {
            maximun = visited.size
        }
        visited.clear()
    }
    for (let y = (SIZE - 1); y >= 0; y--) {
        traceBeam(matrix, SIZE, { x: 0, y: y }, TO_RIGHT, visited)
        if (visited.size > maximun) {
            maximun = visited.size
        }
        visited.clear()
    }

    console.log(maximun)
}


import fs from "node:fs"
import path from 'node:path'
import url from 'node:url'

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
