import { Scene } from 'phaser';

export class Game extends Scene
{
    numbers = [1, 2, 3]
    colors = ["green", "purple", "red"]
    symbols = ["diamond", "pill", "squiggly"]
    fills = ["filled", "hollow", "shaded"]

    preload () {
        this.numbers.forEach(number => {
            this.colors.forEach(color => {
                this.symbols.forEach(symbol => {
                    this.fills.forEach(fill => {
                        const assetKey = `${number}-${color}-${symbol}-${fill}`
                        this.load.image(assetKey, `assets/cards/${assetKey}.png`)
                    })
                })
            })
        })
    }
    
    gridConfiguration = {
        gridWidth: 3,
        gridHeight: 4,
        cardWidth: 100,
        cardHeight: 150,
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
            assetKey: `${this.numbers[numberIndex]}-${this.colors[colorIndex]}-${this.symbols[symbolIndex]}-${this.fills[fillIndex]}`
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
        //initialize the grid
        const totalWidth = this.gridConfiguration.gridWidth * (this.gridConfiguration.cardWidth + this.gridConfiguration.paddingX) - this.gridConfiguration.paddingX;
        const totalHeight = this.gridConfiguration.gridHeight * (this.gridConfiguration.cardHeight + this.gridConfiguration.paddingY) - this.gridConfiguration.paddingY;
        const startX = (this.sys.game.config.width - totalWidth) / 2;
        const startY = (this.sys.game.config.height - totalHeight) / 2;
        let xPos = startX;
        let yPos = startY;

        this.add.image(512, 384, 'background').setAlpha(0.5);
        //fill the grid with cards
        let cards = this.createNewGrid()
        console.log(cards)
        cards.forEach(card => {
            const sprite = this.add.sprite(xPos, yPos, card.assetKey);
            sprite.setOrigin(0);
            sprite.setScale(100 / sprite.width)

            xPos += this.gridConfiguration.cardWidth + this.gridConfiguration.paddingX
            if (xPos >= startX + totalWidth) { //end of line
                xPos = startX; //carriage return
                yPos += this.gridConfiguration.cardHeight + this.gridConfiguration.paddingY; // line feed
            }
        })
        this.cameras.main.setBackgroundColor(0x00ff00);
        // this.add.text(512, 384, "Test", {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
