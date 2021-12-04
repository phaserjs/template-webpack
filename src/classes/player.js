import { Actor } from "./actor";
import { Math } from "phaser";

export class Player extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.keyW = this.scene.input.keyboard.addKey('W')
        this.keyA = this.scene.input.keyboard.addKey('A')
        this.keyS = this.scene.input.keyboard.addKey('S')
        this.keyD = this.scene.input.keyboard.addKey('D')
        this.keyShoot = this.scene.input.keyboard.addKey('SPACE')

        this.setScale(0.5)

        this.canShoot = true
        this.canJump = true

        this.jumpCount = 2

        this.body.setSize(55, 85)
        this.body.setOffset(82, 55)

        this.initAnimations()
    }

    fire() {
        if (this.flipX) {
            this.scene.bulletGroup.fireBullet(this.x - 20, this.y, this.flipX)

        } else {

            this.scene.bulletGroup.fireBullet(this.x + 20, this.y, this.flipX)
        }

    }




    initAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'idle-',
                end: 5
            }),
            frameRate: 12
        })

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run-',
                end: 7
            }),
            frameRate: 12
        })
    }

    hitGround() {
        console.log(this.canJump);
        return !this.canJump
    }

    update() {

        this.setVelocityX(0)
        this.body.setOffset(82, 55)

        if (this.keyShoot.isDown && this.canShoot) {
            this.canShoot = false
            this.fire()
        }

        if (this.keyShoot.isUp) {
            this.canShoot = true
        }

        if (this.keyW.isDown && this.canJump) {
            console.log(this);
            this.canJump = false
            this.body.velocity.y = -220;
        }



        if (this.keyA.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = -200;
            this.checkFlip();
            this.body.setOffset(95, 55)

        }
        else if (this.keyD.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = 200
            this.checkFlip();


        }
        else {
            this.anims.play('idle', true)
            if (this.flipX) {
                this.body.setOffset(95, 55)
            }
        }
    }
}
