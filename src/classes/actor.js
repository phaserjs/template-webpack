import { Physics } from "phaser"

export class Actor extends Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.hp = 100

    }

    getDamage(value) {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onStart: () => {
                if (value) {
                    this.hp = this.hp - value
                }
            },
            onComplete: () => {
                this.setAlpha(1)
            }
        })
    }

    getHPValue() {
        return this.hp
    }

    checkFlip() {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1
        } else {
            this.scaleX = 1
        }
    }


}