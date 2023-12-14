/** @param {string} input  */
function partOne(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    /**
     * @typedef {{
     * springs: string,
     * dmgs: number[],
     * totalDmg: number,
     * }} Item
     */

    /** @type {Item[]} */
    const items = new Array(SIZE);

    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        const rawRow = lines[rowIndex].split(" ");
        /** @type {any[]} */
        const damaged = rawRow[1].split(",")
        let totalDamage = 0;
        for (let i = 0; i < damaged.length; i++) {
            damaged[i] = parseInt(damaged[i]);
            totalDamage += damaged[i];
        }
        items[rowIndex] = {
            springs: rawRow[0],
            dmgs: damaged,
            totalDmg: totalDamage,
        }
    }

    /**
     * @param {Item} item
     * @param {number} springIndex
     * @param {number} dmgIndex
     * @param {number} accDamage
     * @returns {number}
     */
    function countArrangements(item, springIndex = 0, dmgIndex = 0, accDamage = 0) {
        let aheadDamage = 0;
        for (let i = springIndex; i < item.springs.length; i++) {
            if (item.springs[i] === "#") {
                aheadDamage += 1;
            }
        }
        if (accDamage + aheadDamage > item.totalDmg) {
            return 0;
        }

        let currentSI = springIndex;
        while (currentSI < item.springs.length && item.springs[currentSI] === ".") {
            currentSI++;
        }

        let minimunTilesAhead = item.dmgs.length - dmgIndex - 1;
        for (let i = dmgIndex; i < item.dmgs.length; i++) {
            minimunTilesAhead += item.dmgs[i];
        }
        if (currentSI + minimunTilesAhead > item.springs.length) {
            return 0;
        }

        let arrangements = 0;
        let previousDamage = accDamage;
        for (let offset = currentSI; offset < item.springs.length; offset++) {
            if (offset > 0 && item.springs[offset - 1] === "#") {
                continue;
            }

            const crrDamage = item.dmgs[dmgIndex];
            if (offset + crrDamage > item.springs.length) {
                break;
            }

            let skip = false;
            for (let count = 0; count < crrDamage; count++) {
                if (item.springs[offset + count] === ".") {
                    skip = true;
                    break;
                }
            }
            if (!skip) {
                const totalDamage = accDamage + crrDamage;
                if (totalDamage !== previousDamage + crrDamage) {
                    //
                }
                else if (totalDamage === item.totalDmg) {
                    skip = false;
                    for (let i = offset + crrDamage; i < item.springs.length; i++) {
                        if (item.springs[i] === "#") {
                            skip = true;
                            break;
                        }
                    }
                    if (!skip) {
                        arrangements += 1;
                    }
                }
                else if (item.springs[offset + crrDamage] !== "#") {
                    // console.log(`-> ${item.springs.slice(0, offset)}^${item.springs.slice(offset + 1,)}`,arrangements, crrDamage, totalDamage)
                    arrangements += countArrangements(item, offset + crrDamage + 1, dmgIndex + 1, previousDamage + crrDamage);
                }
            }
            if (item.springs[offset] === "#") {
                previousDamage += 1;
                if (previousDamage + crrDamage > item.totalDmg) {
                    break;
                }
            }
        }

        return arrangements;
    }

    let total = 0;
    for (let itemIndex = 0; itemIndex < SIZE; itemIndex++) {
        // console.log(springs[springIndex], damages[springIndex])
        const arrangements = countArrangements(items[itemIndex]);
        // console.log(`spring: ${springs[springIndex]} total: ${arr}`);
        total += arrangements;
    }

    console.log(total);
    // 6464 no es
    // 7737 no es
    // 7209 no es

    // ta roto
}

/** @param {string} input  */
function partTwo(input) {
    const lines = input.trim().split("\n");
    const SIZE = lines.length;

    /**
     * @typedef {{
     * springs: string,
     * dmgs: number[],
     * totalDmg: number,
     * }} Item
     */

    /** @type {Item[]} */
    const items = new Array(SIZE);

    for (let rowIndex = 0; rowIndex < SIZE; rowIndex++) {
        const rawRow = lines[rowIndex].split(" ");
        /** @type {any[]} */
        const damaged = rawRow[1].split(",")
        let totalDamage = 0;
        for (let i = 0; i < damaged.length; i++) {
            damaged[i] = parseInt(damaged[i]);
            totalDamage += damaged[i];
        }
        items[rowIndex] = {
            springs: rawRow[0] + "?" + rawRow[0] + "?" + rawRow[0] + "?" + rawRow[0] + "?" + rawRow[0],
            dmgs: [...damaged, ...damaged, ...damaged, ...damaged, ...damaged,],
            totalDmg: totalDamage * 5,
        }
    }

    /**
     * @param {Item} item
     * @param {number} springIndex
     * @param {number} dmgIndex
     * @param {number} accDamage
     * @returns {number}
     */
    function countArrangements(item, springIndex = 0, dmgIndex = 0, accDamage = 0) {
        let aheadDamage = 0;
        for (let i = springIndex; i < item.springs.length; i++) {
            if (item.springs[i] === "#") {
                aheadDamage += 1;
            }
        }
        if (accDamage + aheadDamage > item.totalDmg) {
            return 0;
        }

        let currentSI = springIndex;
        while (currentSI < item.springs.length && item.springs[currentSI] === ".") {
            currentSI++;
        }

        let minimunTilesAhead = item.dmgs.length - dmgIndex - 1;
        for (let i = dmgIndex; i < item.dmgs.length; i++) {
            minimunTilesAhead += item.dmgs[i];
        }
        if (currentSI + minimunTilesAhead > item.springs.length) {
            return 0;
        }

        let arrangements = 0;
        let previousDamage = accDamage;
        for (let offset = currentSI; offset < item.springs.length; offset++) {
            if (offset > 0 && item.springs[offset - 1] === "#") {
                continue;
            }

            const crrDamage = item.dmgs[dmgIndex];
            if (offset + crrDamage > item.springs.length) {
                break;
            }

            let skip = false;
            for (let count = 0; count < crrDamage; count++) {
                if (item.springs[offset + count] === ".") {
                    skip = true;
                    break;
                }
            }
            if (!skip) {
                const totalDamage = accDamage + crrDamage;
                if (totalDamage !== previousDamage + crrDamage) {
                    break;
                }
                else if (totalDamage === item.totalDmg) {
                    skip = false;
                    for (let i = offset + crrDamage; i < item.springs.length; i++) {
                        if (item.springs[i] === "#") {
                            skip = true;
                            break;
                        }
                    }
                    if (!skip) {
                        arrangements += 1;
                    }
                }
                else if (item.springs[offset + crrDamage] !== "#") {
                    // console.log(`-> ${item.springs.slice(0, offset)}^${item.springs.slice(offset + 1,)}`,arrangements, crrDamage, totalDamage)
                    arrangements += countArrangements(item, offset + crrDamage + 1, dmgIndex + 1, previousDamage + crrDamage);
                }
            }
            if (item.springs[offset] === "#") {
                previousDamage += 1;
                if (previousDamage + crrDamage > item.totalDmg) {
                    break;
                }
            }
        }

        return arrangements;
    }

    /**
     * @param {Item} item
     * @param {number} springIndex
     * @param {number} dmgIndex
     * @param {number} accDamage
     * @returns {number}
     */
    function firstLaunch(item, springIndex = 0, dmgIndex = 0, accDamage = 0) {
        let currentSI = springIndex;
        while (currentSI < item.springs.length && item.springs[currentSI] === ".") {
            currentSI++;
        }

        let arrangements = 0;
        let end = false;
        for (let offset = currentSI; offset < item.springs.length && !end; offset++) {
            if (offset > 0 && item.springs[offset - 1] === "#") {
                continue;
            }

            const crrDamage = item.dmgs[dmgIndex];
            if (offset + crrDamage > item.springs.length) {
                break;
            }

            let skip = false;
            for (let count = 0; count < crrDamage; count++) {
                if (item.springs[offset + count] === ".") {
                    skip = true;
                    break;
                }
            }
            if (!skip) {
                const totalDamage = accDamage + crrDamage;
                if (totalDamage === item.totalDmg) {
                    skip = false;
                    for (let i = offset + crrDamage; i < item.springs.length; i++) {
                        if (item.springs[i] === "#") {
                            skip = true;
                            break;
                        }
                    }
                    if (!skip) {
                        arrangements += 1;
                    }
                }
                else if (item.springs[offset + crrDamage] !== "#") {
                    // console.log(`-> ${item.springs.slice(0, offset)}^${item.springs.slice(offset + 1,)}`,arrangements, crrDamage, totalDamage)
                    arrangements += countArrangements(item, offset + crrDamage + 1, dmgIndex + 1, crrDamage);
                }
            }
            if (item.springs[offset] === "#") {
                end = true;
            }
        }

        return arrangements;
    }


    let total = 0;
    for (let itemIndex = 0; itemIndex < SIZE; itemIndex++) {
        // console.log(springs[springIndex], damages[springIndex])
        const arrangements = firstLaunch(items[itemIndex]);
        // console.log(`spring: ${springs[springIndex]} total: ${arr}`);
        total += arrangements;
        console.log(itemIndex);
    }

    console.log(total);
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
