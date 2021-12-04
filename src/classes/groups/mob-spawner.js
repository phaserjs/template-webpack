import { Physics } from "phaser"
import { Enemy1 } from "../enemies/enemy-1"

export class MobSpawner extends Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        scene.physics.add.existing(this)
        this.runChildUpdate = true
        this.createMultiple({
            classType: Enemy1,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemy'
        })
    }

    spawnMob(x, y) {
        const mob = this.getFirstDead(false)
        if (mob) {
            mob.spawn(x,y)
        }
    }
}