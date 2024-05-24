from itertools import combinations
from collections import Counter
import math

def generateCards():
    allCards = []
    for w in range(3):
        for x in range(3):
            for y in range(3):
                for z in range(3):
                    allCards.append([w,x,y,z])
    return allCards

def convertToDecimal(cards):
    values = []
    for card in cards:
        values.append(27*card[0] + 9*card[1] + 3*card[2] + card[3])
    return values

def calculateDiffs(cards):
    resultant = convertToDecimal(cards)
    return [resultant[1] - resultant[0], resultant[2] - resultant[1]]

def isValidSet(cards):
    for attribute in range(4):
        if (
            not (cards[0][attribute] == cards[1][attribute] 
            and cards[1][attribute] == cards[2][attribute])
            and not (cards[0][attribute] != cards[1][attribute] 
            and cards[1][attribute] != cards[2][attribute] 
            and cards[0][attribute] != cards[2][attribute])):
            return False
    return True

def primeFactors(n):
    primes = []
    while not n % 2:
        primes.append(2)
        n = n / 2
    for i in range(3, int(math.sqrt(n))+1, 2):
        while not n % i:
            primes.append(i)
            n = n / i
    if n > 2:
        primes.append(int(n))
    return primes

def calculateThirdCard(card1, card2):
    return [
        (2* card1[0] - card2[0])%3,
        (2* card1[1] - card2[1])%3,
        (2* card1[2] - card2[2])%3,
        (2* card1[3] - card2[3])%3
        ]

def main():
    allCards = generateCards()
    with open("../../data/allSets.txt", "w") as file:
        # diffs = []
        # cardCounter = []
        for cards in combinations(allCards, 3):
            if (isValidSet(cards)):
                # diffs = calculateDiffs(cards)
                # diffs.extend(calculateDiffs(cards))
                # cardCounter.extend(cards)
                # print(f'{cards}  {convertToDecimal(cards)}')
                # file.write(f'{cards},{convertToDecimal(cards)},{diffs}, [{primeFactors(diffs[0])}, {primeFactors(diffs[1])}] \n')
                file.write(f'{cards}, \n     third card calculation: {calculateThirdCard(cards[0], cards[1])}\n\n')
        # print(f"number of sets: {counter}")
        # cardStrings = map(lambda x: ''.join(str(x)), cardCounter)
        # print(Counter(cardStrings))

main()