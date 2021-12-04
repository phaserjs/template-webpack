import { Actor } from "../actor"

export class Enemy1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.setAnims()
        this.setSize(30, 30)
        this.setOffset(50, 8)
        console.log(this);
    }

    setAnims() {
        this.scene.anims.create({
            key: 'idle-enemy',
            frames: this.scene.anims.generateFrameNames('enemy', {
                prefix: 'idle-',
                end: 5
            }),
            frameRate: 12
        })
    }

    spawn(x,y) {
        this.body.reset(x, y)
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