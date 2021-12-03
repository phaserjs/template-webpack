import { Physics } from "phaser"
import { Bullet } from "./bullet"

export class BulletGroup extends Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
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