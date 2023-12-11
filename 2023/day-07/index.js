/** @param {string} input  */
function partOne(input) {
    const CARDS_PER_HAND = 5;
    const JOKER_CHARCODE = 74;
    const JOKER_TRANSFORM = "R";

    /** @type {[string, number][][]} */
    const cardKinds = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    const visited = new Set();
    for (const line of input.trim().split("\n")) {
        const hand = line.split(" ");
        const cards = hand[0];
        const bid = parseInt(hand[1]);
        let transformedCard = "";
        let differents = 0;
        let maxMatches = 0;
        for (let cardIndex = 0; cardIndex < CARDS_PER_HAND; cardIndex++) {
            const card = cards[cardIndex];
            const chardCode = card.charCodeAt(0);
            transformedCard += (
                chardCode < 58 ?
                    String.fromCharCode(122 - chardCode + 48) :
                    chardCode === JOKER_CHARCODE ?
                        JOKER_TRANSFORM :
                        card
            );
            if (visited.has(card)) {
                continue;
            }

            differents += 1;
            let matches = 0;

            for (let i = 0; i < CARDS_PER_HAND; i++) {
                // @ts-expect-error
                matches += card === cards[i];
            }
            if (matches > maxMatches) {
                maxMatches = matches;
            }
            visited.add(card);
        }


        /** @type {[string, number]} */
        const parsedHand = [transformedCard, bid]
        if (differents === 1) {
            cardKinds[6].push(parsedHand)
        }
        else if (differents === 2 && maxMatches === 4) {
            cardKinds[5].push(parsedHand)
        }
        else if (differents === 2 && maxMatches === 3) {
            cardKinds[4].push(parsedHand)
        }
        else if (differents === 3 && maxMatches === 3) {
            cardKinds[3].push(parsedHand)
        }
        else if (differents === 4) {
            cardKinds[1].push(parsedHand)
        }
        else if (maxMatches === 2) {
            cardKinds[2].push(parsedHand)
        }
        else {
            cardKinds[0].push(parsedHand)
        }

        visited.clear();
    }

    let totalWinings = 0;
    let rank = 0;
    for (let kindIndex = 0; kindIndex < 7; kindIndex++) {
        const cardKind = cardKinds[kindIndex];
        for (let i = 0; i < cardKind.length; i++) {
            let maximunIndex = i;
            let maximun = cardKind[i][0];
            for (let j = i + 1; j < cardKind.length; j++) {
                const nextHand = cardKind[j];
                if (nextHand[0] > maximun) {
                    maximun = nextHand[0];
                    maximunIndex = j;
                }
            }

            const temp = cardKind[maximunIndex];
            cardKind[maximunIndex] = cardKind[i];
            cardKind[i] = temp;

            rank += 1;
            totalWinings += temp[1] * rank;
        }
    }

    console.log(totalWinings)
}


/** @param {string} input  */
function partTwo(input) {
    const CARDS_PER_HAND = 5;
    const JOKER_CHARCODE = 74;
    const JOKER_TRANSFORM = "{";

    /** @type {[string, number][][]} */
    const cardKinds = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    const visited = new Set();
    for (const line of input.trim().split("\n")) {
        const hand = line.split(" ");
        const cards = hand[0];
        const bid = parseInt(hand[1]);
        let transformedCard = "";
        let differents = 0;
        let maxMatches = 0;
        let jokers = 0;
        for (let cardIndex = 0; cardIndex < CARDS_PER_HAND; cardIndex++) {
            const card = cards[cardIndex];
            const chardCode = card.charCodeAt(0);
            transformedCard += (
                chardCode < 58 ?
                    String.fromCharCode(122 - chardCode + 48) :
                    chardCode === JOKER_CHARCODE ?
                        JOKER_TRANSFORM :
                        card
            );
            if (card === "J") {
                jokers += 1;
                continue;
            }

            if (visited.has(card)) {
                continue;
            }

            differents += 1;
            let matches = 0;

            for (let i = 0; i < CARDS_PER_HAND; i++) {
                // @ts-expect-error
                matches += card === cards[i];
            }
            if (matches > maxMatches) {
                maxMatches = matches;
            }
            visited.add(card);
        }

        if (jokers) {
            maxMatches += jokers;
            if (jokers === 5) {
                differents = 1;
            }
        }

        /** @type {[string, number]} */
        const parsedHand = [transformedCard, bid]
        if (differents === 1) {
            cardKinds[6].push(parsedHand)
        }
        else if (differents === 2 && maxMatches === 4) {
            cardKinds[5].push(parsedHand)
        }
        else if (differents === 2 && maxMatches === 3) {
            cardKinds[4].push(parsedHand)
        }
        else if (differents === 3 && maxMatches === 3) {
            cardKinds[3].push(parsedHand)
        }
        else if (differents === 4) {
            cardKinds[1].push(parsedHand)
        }
        else if (maxMatches === 2) {
            cardKinds[2].push(parsedHand)
        }
        else {
            cardKinds[0].push(parsedHand)
        }

        visited.clear();
    }

    let totalWinings = 0;
    let rank = 0;
    for (let kindIndex = 0; kindIndex < 7; kindIndex++) {
        const cardKind = cardKinds[kindIndex];
        for (let i = 0; i < cardKind.length; i++) {
            let maximunIndex = i;
            let maximun = cardKind[i][0];
            for (let j = i + 1; j < cardKind.length; j++) {
                const nextHand = cardKind[j];
                if (nextHand[0] > maximun) {
                    maximun = nextHand[0];
                    maximunIndex = j;
                }
            }

            const temp = cardKind[maximunIndex];
            cardKind[maximunIndex] = cardKind[i];
            cardKind[i] = temp;

            rank += 1;
            totalWinings += temp[1] * rank;
        }
    }

    console.log(totalWinings)
}


import fs from "node:fs";
import path from 'node:path';
import url from 'node:url';

const input = fs.readFileSync(path.dirname(url.fileURLToPath(import.meta.url)) + "/input.txt", "utf8");

partOne(input);

partTwo(input);
