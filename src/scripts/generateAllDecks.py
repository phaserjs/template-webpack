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
    color = random.choice(numbers)
    symbol = random.choice(numbers)
    fill = random.choice(numbers)
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
    for i in range(maxDecks):
        decks.append(generateRandomDeck())
    return decks

def generateAllDecks(maxDecks):
    allCards = generateCards()
    decks = []
    for c1 in range(0, len(allCards) - 11):
        for c2 in range(c1 + 1, len(allCards) - 10):
            for c3 in range(c2 + 1, len(allCards) - 9):
                for c4 in range(c3 + 1, len(allCards) - 8):            
                    for c5 in range(c4 + 1, len(allCards) - 7):            
                        for c6 in range(c5 + 1, len(allCards) - 6):
                            for c7 in range(c6 + 1, len(allCards) - 5):
                                for c8 in range(c7 + 1, len(allCards) - 4):
                                    for c9 in range(c8 + 1, len(allCards) - 3):
                                        for c10 in range(c9 + 1, len(allCards) - 2):
                                            for c11 in range(c10 + 1, len(allCards) - 1):
                                                for c12 in range(c11 + 1, len(allCards)):
                                                    decks.append([
                                                        allCards[c1],
                                                        allCards[c2],
                                                        allCards[c3],
                                                        allCards[c4],
                                                        allCards[c5],
                                                        allCards[c6],
                                                        allCards[c7],
                                                        allCards[c8],
                                                        allCards[c9],
                                                        allCards[c10],
                                                        allCards[c11],
                                                        allCards[c12]
                                                        ])
                                                    if len(decks) >= maxDecks:
                                                        return decks

startTime = time.time()
decks = generateAllDecks(2)
endTime = time.time()
for deck in decks:
    print(deck)
print("Number of decks: {:e}".format(len(decks)))
print("Time taken: {} seconds".format((endTime - startTime)))
print("Average time per deck: {}".format((endTime - startTime) / len(decks)))


