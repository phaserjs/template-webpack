import { Actor } from "../actor"

export class Enemy1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy')

        this.setAnims()
        this.setScale(2)
        console.log(this);
    }

    setAnims() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('enemy', {
                prefix: 'idle-',
                end: 3
            }),
            frameRate: 18
        })
    }

    update() {
        if (this.body.velocity.x > 0) {

            this.body.velocity.x -= 5
        } else if (this.body.velocity.x < 0) {
            this.body.velocity.x += 5
        }
        this.anims.play('idle', true)
        
    }
}