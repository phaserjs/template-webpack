#!/usr/bin/python3

numbers = ["1", "2", "3"]
colors = ["green", "purple", "red"]
symbols = ["diamond", "pill", "squiggly"]
fills = ["filled", "hollow", "shaded"]

cards = []
id = 1

with open("../../data/allCards.csv", "w") as file:
    file.write("id,number,color,symbol,fill\n")
    for number in numbers:
        for color in colors:
            for symbol in symbols:
                for fill in fills:
                    cards.append([id,number,color,symbol,fill])
                    file.write(",".join(str(item) for item in [id,number,color,symbol,fill + "\n"]))
                    id += 1
print(cards)