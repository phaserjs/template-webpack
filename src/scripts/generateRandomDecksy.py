#!/usr/bin/python3
import random
import time

numbers = ["1", "2", "3"]
colors = ["green", "purple", "red"]
symbols = ["diamond", "pill", "squiggly"]
fills = ["filled", "hollow", "shaded"]
attributes = [numbers, colors, symbols, fills]
deckSize = 12

def generateCards():
    allCards = []
    id = 1
    for number in numbers:
        for color in colors:
            for symbol in symbols:
                for fill in fills:
                    allCards.append([id,number,color,symbol,fill])
                    id += 1
    return allCards

def generateRandomCard():
    number = random.choice(numbers)
    color = random.choice(colors)
    symbol = random.choice(symbols)
    fill = random.choice(fills)
    return [number, color, symbol, fill]

def generateRandomDeck():
    deck = []
    while len(deck) < deckSize:
        card = generateRandomCard()
        if not card in deck:
            deck.append(card)
    return deck

def generateRandomDecks(maxDecks):
    decks = []
    startTime = time.time()
    for i in range(maxDecks):
        decks.append(generateRandomDeck())
    endTime = time.time()
    print("Number of decks: {:e}".format(len(decks)))
    print("Time taken: {} seconds".format((endTime - startTime)))
    print("Average time to make one deck: {}".format((endTime - startTime) / len(decks)))
    return decks

def isValidSet(c1, c2, c3):
    for attribute in range(4):
        a1 = c1[attribute]
        a2 = c2[attribute]
        a3 = c3[attribute]
        if not (a1 == a2 and a2 == a3) and not (a1 != a2 and a2 != a3 and a1 != a3):
            return False
    return True

def findAllSets(deck):
    validSets = []
    possibleSets = 0
    for c1 in range(0, len(deck) - 2):
        for c2 in range(c1 + 1, len(deck) - 1):
            for c3 in range(c2 + 1, len(deck)):
                possibleSets += 1
                if isValidSet(deck[c1], deck[c2], deck[c3]):
                    validSets.append([deck[c1], deck[c2], deck[c3]])
    return validSets

def tabulateSetsInDecks(decks):
    startTime = time.time()
    countTable = {}
    for deck in decks:
        sets = findAllSets(deck)
        if len(sets) in countTable:
            countTable[len(sets)] += 1
        else:
            countTable[len(sets)] = 1
    endTime = time.time()
    print("Time to find all sets: {}".format(endTime - startTime))
    print("Set distribution:")
    totalSets = sum(countTable.values())
    for key in sorted(countTable.keys()):
        print(f"{key}: {countTable[key]} frequency: {100 * countTable[key] / totalSets}")
    return countTable

decks = generateRandomDecks(1000000)
tabulateSetsInDecks(decks)

# for deck in decks:
#     print(deck)

