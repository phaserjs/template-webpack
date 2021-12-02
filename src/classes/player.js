import { Actor } from "./actor";

export class Player extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.keyW = this.scene.input.keyboard.addKey('W')
        this.keyA = this.scene.input.keyboard.addKey('A')
        this.keyS = this.scene.input.keyboard.addKey('S')
        this.keyD = this.scene.input.keyboard.addKey('D')

        this.body.setSize(32, 32)
        this.body.setOffset(0, 0)

        this.initAnimations()
    }

    initAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('idle', {
                prefix: 'idle-',
                end: 17
            }),
            frameRate: 18
        })

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run-',
                end: 23
            }),
            frameRate: 24
        })
    }

    update() {


        this.body.setVelocityX(0)

        if (this.keyW.isDown) {
            this.body.velocity.y = -250;
        }

        if (this.keyA.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = -110;
            this.checkFlip();
            this.body.setOffset(40, 65);
        }
        else if (this.keyD.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = 110
            this.checkFlip();
            this.body.setOffset(45, 65);

        }
        else {
            this.anims.play('idle', true)
            this.body.setOffset(0, 0)
        }
    }
}
