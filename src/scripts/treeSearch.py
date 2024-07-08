from itertools import combinations
import time
import argparse

startTime = time.time()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file_path', default="../../data/smallDecks.txt")
    parser.add_argument('-d', '--size', help="Number of cards per deck", default=12)
    parser.add_argument('-s', '--sets', help="Number of sets per deck (default records all decks)", default=-1)
    parser.add_argument('--max_decks', help="Number of decks to generate before exiting (default finds all possible decks)", default=-1)
    parser.add_argument('--log_increment', help="Number of iterations between timing messages (default 1000000)", default=1000000)
    args = parser.parse_args()
    globals()["filePath"] = args.file_path
    globals()["deckSize"] = int(args.size)
    globals()["setsPerDeck"] = int(args.sets)
    globals()["maxDecks"] = int(args.max_decks)
    globals()["foundDecks"] = 0
    logIncrement = args.log_increment
    
    traverseSearchTree()
    endTime = time.time()
    print(f'Total decks found: {foundDecks}')
    print("Total time taken: {} seconds".format((endTime - startTime)))

def buildMatchDictionary():
    matches = {}
    for a in range(81):
        for b in range(a+1, 81):
            c = findThirdCard(a, b)
            matches[(a, b)] = c
    return matches

def findThirdCard(a, b):
    aTern = convertToArray(a)
    bTern = convertToArray(b)
    cTern = [
        ((2*bTern[0] - aTern[0]) % 3),
        ((2*bTern[1] - aTern[1]) % 3),
        ((2*bTern[2] - aTern[2]) % 3),
        ((2*bTern[3] - aTern[3]) % 3),
    ]
    return 27*cTern[0] + 9*cTern[1] + 3*cTern[2] + cTern[3]

def convertToArray(n):
    nTern = []
    for x in range(4):
        n, nVal = divmod(n, 3)
        nTern.insert(0, nVal)
    return nTern

def writeFoundDeckToFile(deck, sets):
    print(f'{deck, sets}')

def traverseSearchTree():
    for startingCards in combinations(range(81), 2):
        buildDeck(startingCards, [])


def buildDeck(partialDeck, sets):
    # print(f"DEBUG: new buildDeck started with: {partialDeck}")
    for newCard in range(partialDeck[-1] + 1, 81):
        # print(f"DEBUG: checking {partialDeck} with new card {newCard}")
        newDeck = [*partialDeck]
        newSets = []
        for i in range(len(partialDeck)):
            matchCard = matches[(partialDeck[i], newCard)]
            if matchCard in partialDeck[:i]: #newCard matches a pair in the deck
                newSets.append((partialDeck[i], matchCard, newCard))
        if setsPerDeck >= 0 and len(sets) + len(newSets) > setsPerDeck:
            # print(f'DEBUG: new card {newCard} creates too many sets with {partialDeck}') # too many sets
            continue
        newDeck.append(newCard)
        newSets.extend(sets)
        if len(newDeck) == deckSize:
            if setsPerDeck < 0 or len(newSets) == setsPerDeck:
                globals()["foundDecks"] += 1
                # writeFoundDeckToFile(newDeck, newSets)
            # print(f'DEBUG finished deck: {newDeck} {newSets}')    
        else:   
            buildDeck(newDeck, newSets)
    # print(f'DEBUG: no more search space: {partialDeck}')


matches = buildMatchDictionary()
main()