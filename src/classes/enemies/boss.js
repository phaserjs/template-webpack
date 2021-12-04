import { Actor } from "../actor";
import { MobSpawner } from "../groups/mob-spawner";

export class Boss1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy')

        this.setScale(10)
        this.setSize(30, 30)
        this.setOffset(50, 3)
        this.setAnims()

        this.spawner = new MobSpawner(this.scene, 60, 60)
        this.scene.add.existing(this.spawner)
        
        scene.physics.world.addCollider(this.scene.player, this)
        scene.physics.world.addCollider(this, this.scene.platforms)
        scene.physics.world.addCollider(this, this.scene.bulletGroup, (boss, bullet) => {
            this.spawner.spawnMob(this.x, this.y)
            bullet.destroy()
        })
    }

    setAnims() {
        this.scene.anims.create({
            key: 'idle-enemy',
            frames: this.scene.anims.generateFrameNames('enemy', {
                prefix: 'idle-',
                end: 4
            }),
            frameRate: 12
        })
    }

    update() {
        // this.scene.physics.accelerateToObject(this, this.scene.player, 70, 180)
        this.anims.play('idle-enemy', true)
        

    }
}