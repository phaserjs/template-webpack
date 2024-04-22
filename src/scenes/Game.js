import { Scene } from 'phaser';

export class Game extends Scene
{
    numbers = [1, 2, 3]
    colors = ["green", "purple", "red"]
    symbols = ["diamond", "pill", "squiggly"]
    fills = ["filled", "hollow", "shaded"]
    
    gridConfiguration = {
        x: 113,
        y: 102,
        paddingX: 10,
        paddingY: 10
    }

    constructor ()
    {
        super('Game');
    }

    init ()
    {
        // Fadein camera
        this.cameras.main.fadeIn(500);
        this.lives = 10;
    }


    newRandomCard() {
        var numberIndex = Math.floor(Math.random() * this.numbers.length)
        var colorIndex = Math.floor(Math.random() * this.colors.length)
        var symbolIndex = Math.floor(Math.random() * this.symbols.length)
        var fillIndex = Math.floor(Math.random() * this.numbers.length)
        var newCard = {
            number: this.numbers[numberIndex],
            color: this.colors[colorIndex],
            symbol: this.symbols[symbolIndex],
            fill: this.fills[fillIndex],
        }

        return newCard

    }

    createNewGrid() {
        var numberOfCards = 12 //TODO extract to config or something
        var cards = []

        for (var i = 0; i < numberOfCards; i++) {
            cards.push(this.newRandomCard())
        }
        return cards
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);
        for (const number in this.numbers) {
            if (Object.hasOwnProperty.call(this.numbers, number)) {
                for (const color in this.colors) {
                    if (Object.hasOwnProperty.call(this.colors, color)) {
                        for (const symbol in this.symbols) {
                            if (Object.hasOwnProperty.call(this.symbols, symbol)) {
                                for (const fill in this.fills) {
                                    if (Object.hasOwnProperty.call(this.fills, fill)) {
                                        const currentNumber = this.numbers[number];
                                        const currentColor = this.colors[color];
                                        const currentSymbol = this.symbols[symbol];
                                        const currentFill = this.fills[fill];
                                        const cardName = [currentNumber, currentColor, currentSymbol, currentFill].join('-') 
                                        console.log(cardName.trim())
            }
        }
    }
}
                    }
                }
            }
        }

        this.add.image(512, 384, 'background').setAlpha(0.5);
        console.log(this.createNewGrid())
        this.add.text(512, 384, "Test", {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
