import { Physics } from "phaser"
import { Enemy1 } from "../enemies/enemy-1"

export class MobSpawner extends Physics.Arcade.Group {
    constructor(scene, x, y) {
        super(scene.physics.world, scene)

        this.defaults.setCollideWorldBounds = true
        this.defaults.setAllowGravity = false

        this.runChildUpdate = true
        this.createMultiple({
            classType: Enemy1,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemy',
            setXY: {x, y, stepX: 50}
        })
        console.log(this);
    }

    spawnMob(x, y) {
        const mob = this.getFirstDead(false)
        if (mob) {
            console.log(mob);
            mob.spawn(x, y)
        }
    }

    
}