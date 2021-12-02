import { Scene } from 'phaser'
import { Player } from '../classes/player'




export class Level1 extends Scene {
    constructor() {
        super('level-1-scene')
    }
    create() {
        console.log('Level 1 loaded')
        this.player = new Player(this, 100, 100)
        this.adventurer = this.add.sprite(100, 150, 'adventurer')

    }

    update() {
        this.player.update()
    }
}