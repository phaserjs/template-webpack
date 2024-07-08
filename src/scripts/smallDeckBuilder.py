from itertools import combinations
import time
import argparse
# This script iterates over all 81choose12 combinations of SET cards and checks whether the combination
# has exactly N Sets (three cards, where each card has four characteristics, each may have one of three
# values, and each characteristic is either the same across all three cards e.g. [1, 1, 1] or all 
# different e.g. [2, 1, 3])

startTime = time.time()
filePath = '../../data/smallDecks.txt'
deckSize = 12
setsPerDeck = -1
maxDecks = -1
logIncrement = 1000000

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file_path', default="../../data/smallDecks.txt")
    parser.add_argument('-d', '--size', help="Number of cards per deck", default=12)
    parser.add_argument('-s', '--sets', help="Number of sets per deck (default records all decks)", default=-1)
    parser.add_argument('--max_decks', help="Number of decks to generate before exiting (default finds all possible decks)", default=-1)
    parser.add_argument('--log_increment', help="Number of iterations between timing messages (default 1000000)", default=1000000)
    args = parser.parse_args()
    filePath = args.file_path
    deckSize = args.size
    setsPerDeck = args.Sets
    maxDecks = args.max_decks
    logIncrement = args.log_increment


    iterateDecks()
    endTime = time.time()
    print("Total time taken: {} seconds".format((endTime - startTime)))

def iterateDecks():
    counter = 0
    matches = buildMatchDictionary()
    with open(f"../../data/{maxDecks}_set_decks.csv", "w") as file:
        for deck in combinations(range(81), deckSize):
            if maxDecks > 0 and counter >= maxDecks:
                return
            sets = []
            for cards in combinations(deck, 2):
                matchCard = matches[tuple(cards)]
                if matchCard in deck:
                    validSet = [cards[0], cards[1], matchCard]
                    validSet.sort()
                    if not validSet in sets:
                        sets.append(validSet)
                        if len(sets) > setsPerDeck:
                            break
            if setsPerDeck > 0 and len(sets) == setsPerDeck:
                counter += 1
                findTime = time.time()
                print('time to find: {} seconds'.format((findTime - startTime)))
                print(f'{deck},{sets}')
                file.write(f'{deck},{sets}\n')
            if counter % logIncrement == 0:
                print(f'Analyzed {counter} decks in {time.time() - startTime} seconds')

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
    # print(nTern)
    return nTern

    
main()