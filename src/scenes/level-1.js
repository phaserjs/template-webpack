import { Scene, Math } from 'phaser'
import { Enemy1 } from '../classes/enemy-1'
import { Player } from '../classes/player'





export class Level1 extends Scene {
    constructor() {
        super('level-1-scene')
    }
    create() {
        console.log(this)

        this.player = new Player(this, 100, 100)
        this.enemy1 = new Enemy1(this, 200, 200)

        this.physics.world.addCollider(this.player, this.enemy1)

    }

    update() {
        this.player.update()
        this.enemy1.update()

        if (Math.Distance.Between(this.player.body.x, this.player.body.y, this.enemy1.body.x, this.enemy1.body.y) < 50) {

            this.physics.accelerateToObject(this.enemy1, this.player)
        }
    }
}