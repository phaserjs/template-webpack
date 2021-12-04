import { Actor } from "../actor"

export class Enemy1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy')
        scene.physics.add.existing(this)
        this.setAnims()
        this.setScale(2)
        this.setSize(30, 30)
        this.setOffset(50, 8)

        scene.physics.world.addCollider(this.scene.player, this)
        scene.physics.world.addCollider(this, this.scene.platforms)
        scene.physics.world.addCollider(this, this.scene.spawner)
        console.log(this);
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

    spawn(x,y) {
        this.x = x
        this.y = y
        console.log(this);
        this.setActive(true)
        this.setVisible(true)
    }

    update() {
        if (this.body.velocity.x > 0) {

            this.body.velocity.x -= 5
        } else if (this.body.velocity.x < 0) {
            this.body.velocity.x += 5
        }
        this.anims.play('idle-enemy', true)
        
    }
}