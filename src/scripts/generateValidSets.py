def convertToArray(n):
    nTern = []
    for x in range(4):
        n, nVal = divmod(n, 3)
        nTern.insert(0, nVal)
    # print(nTern)
    return nTern

def findThirdCard(a, b):
    aTern = convertToArray(a)
    bTern = convertToArray(b)
    cTern = [
        ((2*bTern[0] - aTern[0]) % 3),
        ((2*bTern[1] - aTern[1]) % 3),
        ((2*bTern[2] - aTern[2]) % 3),
        ((2*bTern[3] - aTern[3]) % 3),
    ]
    # print(aTern)
    # print(bTern)
    # print(cTern)
    return 27*cTern[0] + 9*cTern[1] + 3*cTern[2] + cTern[3]

def main():
    sets = []
    with open("../../data/allSets.txt", "w") as file:
        for a in range(81):
            for b in range(a + 1, 81):
                if a == b:
                    continue
                c = findThirdCard(a, b)
                validSet = [a, b, c]
                validSet.sort()
                if not validSet in sets:
                    sets.append(validSet)
                    file.write(f'{validSet} \n')
                # print (f'f({a}, {b}) = {c}')
                # file.write(f'f({a}, {b}) = {c} \n')

main()