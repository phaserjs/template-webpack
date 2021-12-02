import { Actor } from "./actor";

export class Player extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.keyW = this.scene.input.keyboard.addKey('W')
        this.keyA = this.scene.input.keyboard.addKey('A')
        this.keyS = this.scene.input.keyboard.addKey('S')
        this.keyD = this.scene.input.keyboard.addKey('D')

        this.body.setSize(30, 30)
        this.body.setOffset(8, 0)

        this.initAnimations()
    }

    initAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('a-adventurer', {
                prefix: 'idle-',
                end: 3
            }),
            frameRate: 8
        })
    }

    update() {


        this.body.setVelocityX(0)

        if (this.body.velocity.x === 0) {
            this.anims.play('idle', true)
        }
        if (this.keyW.isDown) {
            this.body.velocity.y = -110;
        }
        if (this.keyA.isDown) {
            this.body.velocity.x = -110;
            this.checkFlip();
            this.body.setOffset(48, 15);
        }
        if (this.keyS.isDown) {
            this.body.velocity.y = 110;
        }
        if (this.keyD.isDown) {
            this.body.velocity.x = 110
            this.checkFlip();
            this.body.setOffset(15, 15);

        }
    }
}
