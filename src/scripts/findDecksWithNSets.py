from itertools import combinations

# This script iterates over all 81choose12 combinations of SET cards and checks whether the combination
# has exactly N Sets (three cards, where each card has four characteristics, each may have one of three
# values, and each characteristic is either the same across all three cards e.g. [1, 1, 1] or all 
# different e.g. [2, 1, 3])

def generateCards():
    allCards = []
    for w in range(3):
        for x in range(3):
            for y in range(3):
                for z in range(3):
                    allCards.append([w,x,y,z])
    return allCards

def findDecks(cards):
    counter = 100
    for deck in combinations(cards, 12):
        counter-=1
        sets = findSetsInDeck(deck)
        print("Deck:")
        print(f'{deck[0]}, {deck[1]}, {deck[2]}')
        print(f'{deck[3]}, {deck[4]}, {deck[5]}')
        print(f'{deck[6]}, {deck[7]}, {deck[8]}')
        print(f'{deck[9]}, {deck[10]}, {deck[11]}')
        print(f"Sets: {len(sets)}")
        for validSet in sets:
            print(validSet)
        if counter < 1:
            return

def findSetsInDeck(deck):
    sets = []
    for cards in combinations(deck, 2):
        match = [
        (2* cards[0][0] - cards[1][0])%3,
        (2* cards[0][1] - cards[1][1])%3,
        (2* cards[0][2] - cards[1][2])%3,
        (2* cards[0][3] - cards[1][3])%3
        ]
        if match in deck[deck.index(cards[1]) + 1:]:
            sets.append([cards[0], cards[1], match])
    return sets

def main():
    cards = generateCards()
    findDecks(cards)
main()