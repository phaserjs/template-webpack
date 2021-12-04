import { Physics } from "phaser"
import { Bullet } from "../bullet"

export class BulletGroup extends Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)

        console.log(this)
        this.defaults.setAllowGravity = false
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 300,
            active: false,
            visible: false,
            key: 'adventurer'
        })
    }

    fireBullet(x, y) {
        const bullet = this.getFirstDead(false)
        if (bullet) {
            bullet.fire(x, y)
        }
    }
}