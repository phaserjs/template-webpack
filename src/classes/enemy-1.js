import { Actor } from "./actor"

export class Enemy1 extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'mo-run')

        this.setAnims()
        this.setScale(5)
    }

    setAnims() {
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('mo-run', {
                prefix: 'run-',
                end: 5
            }),
            frameRate: 6
        })
    }

    update() {
        this.anims.play('run', true)
    }
}