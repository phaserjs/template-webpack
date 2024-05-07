import { Scene } from 'phaser';
import { gridConfiguration, numbers, colors, symbols, fills } from '../constants/GameConstants';
import { newRandomDeck, checkIfValidSet, characterizeSet, findAllValidSets } from '../utilities/GameUtils';

export class Game extends Scene {
    cards = []
    selectedCards = []
    validSets = []
    startTime = null;

    previousGameData = {
        message: "Welcome to SET!",
        secondsTaken: null,
        foundSet: null,
        numberOfSets: null
    }

    constructor() {
        super('Game');
    }

    init() {
        // Fadein camera
        this.cameras.main.fadeIn(500);
    }

    evaluateSelected() {
        if (this.selectedCards.length >= 3) {
            this.endGame({ mode: 'fullSet' })
        }
    }

    onResetPressed() {
        this.endGame({ mode: 'reset' })
    }

    onNoSetPressed() {
        this.endGame({ mode: 'noSet' })
    }

    endGame(endGameMode) {
        const secondsTaken = (Date.now() - this.startTime) / 1000;
        this.previousGameData.secondsTaken = `Your time was ${secondsTaken} seconds.`
        if (endGameMode.mode === 'reset') {
            this.previousGameData.numberOfSets = this.validSets.length
            this.previousGameData.message = "You reset the board"
            this.previousGameData.foundSet = null
        }
        else if (endGameMode.mode === 'noSet') {
            this.previousGameData.numberOfSets = this.validSets.length
            if (this.validSets.length) {
                this.previousGameData.message = `Sorry, there were some Sets`
            } else {
                this.previousGameData.message = `Correct! there were no Sets`
            }
            this.previousGameData.foundSet = null
        } else {
            if (this.selectedCards.length == 3) {
                this.previousGameData.foundSet = [this.selectedCards[0].card, this.selectedCards[1].card, this.selectedCards[2].card]
            } else {
                this.previousGameData.foundSet = null
            }
            if (this.selectedCards.length == 3 && checkIfValidSet(this.selectedCards[0].card, this.selectedCards[1].card, this.selectedCards[2].card)) {
                this.previousGameData.message = "You found a Set!"
            } else {
                this.previousGameData.message = "Sorry, you didn't find a Set."
            }
            this.previousGameData.numberOfSets = this.validSets.length
        }
        this.selectedCards = []
        this.scene.start('Game');
    }

    preload() {

        this.load.image('resetButton', 'assets/icons8-update-left-rotation-96.png');
        this.load.image('noSetButton', 'assets/icons8-null-set-100.png');
        numbers.forEach(number => {
            colors.forEach(color => {
                symbols.forEach(symbol => {
                    fills.forEach(fill => {
                        const assetKey = `${number}-${color}-${symbol}-${fill}`
                        this.load.image(assetKey, `assets/cards/${assetKey}.png`)
                    })
                })
            })
        })
        this.cards = newRandomDeck()
        this.validSets = findAllValidSets(this.cards)
    }

    create() {
        //initialize the grid
        const totalWidth = gridConfiguration.gridWidth * (gridConfiguration.cardWidth + gridConfiguration.paddingX) - gridConfiguration.paddingX;
        const totalHeight = gridConfiguration.gridHeight * (gridConfiguration.cardHeight + gridConfiguration.paddingY) - gridConfiguration.paddingY;
        const startX = (this.sys.game.config.width - totalWidth) / 2;
        const startY = (this.sys.game.config.height - totalHeight) / 2;
        let xPos = startX;
        let yPos = startY;

        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Set up previous game data messages
        this.add.text(10, 10, this.previousGameData.message, { color: '#ffffff', fontSize: '20px' });

        if (this.previousGameData.secondsTaken) {
            this.add.text(10, 30, this.previousGameData.secondsTaken, { color: '#ffffff', fontSize: '20px' });
        }
        if (this.previousGameData.foundSet) {
            let characteristics = characterizeSet(...this.previousGameData.foundSet)
            this.add.text(10, 50, "Last round picks:", { color: '#ffffff', fontSize: '20px' });
            this.add.text(10, 70, `Number: ${characteristics.number}`, { color: '#ffffff', fontSize: '20px' });
            this.add.text(10, 90, `Color:  ${characteristics.color}`, { color: '#ffffff', fontSize: '20px' });
            this.add.text(10, 110, `Symbol: ${characteristics.symbol}`, { color: '#ffffff', fontSize: '20px' });
            this.add.text(10, 130, `Fill:   ${characteristics.fill}`, { color: '#ffffff', fontSize: '20px' });
        }
        if (this.previousGameData.numberOfSets !== null) {
            this.add.text(10, 150, `Sets last round: ${this.previousGameData.numberOfSets}`, { color: '#ffffff', fontSize: '20px' });
        }

        //fill the grid with cards
        this.cards.forEach(card => {
            const sprite = this.add.sprite(xPos, yPos, card.assetKey);
            sprite.card = card
            sprite.setOrigin(0);
            sprite.setScale(100 / sprite.width)
            sprite.setInteractive();
            sprite.on('pointerdown', () => {
                if (!sprite.selected) {
                    sprite.setTint(0xAAAA00);
                    sprite.selected = true;
                    this.selectedCards.push(sprite)
                } else {
                    sprite.clearTint();
                    sprite.selected = false;
                    const index = this.selectedCards.indexOf(sprite);
                    if (index != -1) {
                        this.selectedCards.splice(index, 1);
                    }
                }
                this.evaluateSelected()
            })

            xPos += gridConfiguration.cardWidth + gridConfiguration.paddingX
            if (xPos >= startX + totalWidth) { //end of line
                xPos = startX; //carriage return
                yPos += gridConfiguration.cardHeight + gridConfiguration.paddingY; // line feed
            }
        })
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.startTime = Date.now();
        const resetButton = this.add.image(950, 450, 'resetButton').setOrigin(1, 1).setTint(0x0000ff).setInteractive();
        const noSettButton = this.add.image(950, 650, 'noSetButton').setOrigin(1, 1).setTint(0x0000ff).setInteractive();

        resetButton.on('pointerup', function () {
            // Reset the scene
            this.onResetPressed()
        }, this);
        noSettButton.on('pointerup', function () {
            // Reset the scene
            this.onNoSetPressed()
        }, this);
    }
}
