import { mainGridConfiguration, numberOfCards, numbers, colors, symbols, fills } from '../constants/GameConstants';

export function newRandomCard() {
    var numberIndex = Math.floor(Math.random() * numbers.length)
    var colorIndex = Math.floor(Math.random() * colors.length)
    var symbolIndex = Math.floor(Math.random() * symbols.length)
    var fillIndex = Math.floor(Math.random() * numbers.length)
    var newCard = {
        number: numbers[numberIndex],
        color: colors[colorIndex],
        symbol: symbols[symbolIndex],
        fill: fills[fillIndex],
        assetKey: `${numbers[numberIndex]}-${colors[colorIndex]}-${symbols[symbolIndex]}-${fills[fillIndex]}`
    }
    return newCard
}

export function newRandomDeck() {
    var deck = []

    while (deck.length < numberOfCards) {
        const newCard = newRandomCard();
        if (!deck.some(card => cardsAreEqual(card, newCard))) {
            deck.push(newCard)
        }
    }
    return deck
}

function cardsAreEqual(cardOne, cardTwo) {
    return (
        cardOne.number === cardTwo.number &&
        cardOne.color === cardTwo.color &&
        cardOne.symbol === cardTwo.symbol &&
        cardOne.fill === cardTwo.fill
    )
}

export function checkIfValidSet(cardOne, cardTwo, cardThree) {
    for (let attribute of ['number', 'color', 'symbol', 'fill']) {
        const attr1 = cardOne[attribute]
        const attr2 = cardTwo[attribute]
        const attr3 = cardThree[attribute]

        if (
            !(attr1 === attr2 && attr2 === attr3) // all of this attribute the same
            && !(attr1 !== attr2 && attr2 !== attr3 && attr1 !== attr3) // all of this attribute different
        ) {
            return false;
        }
    }
    return true;
}

export function characterizeSet(cardOne, cardTwo, cardThree) {
    let characteristics = {}
    for (let attribute of ['number', 'color', 'symbol', 'fill']) {
        const attr1 = cardOne[attribute]
        const attr2 = cardTwo[attribute]
        const attr3 = cardThree[attribute]

        if (attr1 === attr2 && attr2 === attr3) {
            characteristics[attribute] = attr1
        }
        else if (attr1 !== attr2 && attr2 !== attr3 && attr1 !== attr3) {
            characteristics[attribute] = "heterogeneous"
        }
        else {
            characteristics[attribute] = "invalid"
        }
    }
    return characteristics
}

export function findAllValidSets(cards) {
    const validSets = [];

    for (let i = 0; i < cards.length - 2; i++) {
        for (let j = i + 1; j < cards.length - 1; j++) {
            for (let k = j + 1; k < cards.length; k++) {
                const card1 = cards[i];
                const card2 = cards[j];
                const card3 = cards[k];
                if (checkIfValidSet(card1, card2, card3)) {
                    validSets.push([card1, card2, card3])
                }
            }
        }
    }
    return validSets
}