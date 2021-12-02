import { Scene } from 'phaser'
import { Enemy1 } from '../classes/enemy-1'
import { Player } from '../classes/player'





export class Level1 extends Scene {
    constructor() {
        super('level-1-scene')
    }
    create() {

        this.player = new Player(this, 100, 100)
        this.enemy1 = new Enemy1(this, 200, 200)

    }

    update() {
        this.player.update()
    }
}