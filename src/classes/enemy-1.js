import { Actor } from "./actor"

export class Enemy1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'mo-run')

        this.setAnims()
        this.setScale(5)
        console.log(this);
    }

    setAnims() {
        this.scene.anims.create({
            key: 'mo-run',
            frames: this.scene.anims.generateFrameNames('mo-run', {
                prefix: 'run-',
                end: 5
            }),
            frameRate: 18
        })
    }

    update() {
        this.anims.play('mo-run', true)
        if (this.scene.player !== undefined) {

            // this.physics.accelerateToObject(this, this.scene.player)
        }
    }
}