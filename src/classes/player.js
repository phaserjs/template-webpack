import { Actor } from "./actor";

export class Player extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.keyW = this.scene.input.keyboard.addKey('W')
        this.keyA = this.scene.input.keyboard.addKey('A')
        this.keyS = this.scene.input.keyboard.addKey('S')
        this.keyD = this.scene.input.keyboard.addKey('D')

         this.setScale(0.5)

        this.body.setSize(85, 100)
        this.body.setOffset(73, 45)
        

        this.initAnimations()
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

    update() {


        this.body.setVelocityX(0)

        if (this.keyW.isDown) {
            this.body.velocity.y = -100;
        }

        if (this.keyA.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = -110;
            this.checkFlip();
            
        }
        else if (this.keyD.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = 110
            this.checkFlip();
            

        }
        else {
            this.anims.play('idle', true)
            
        }
    }
}
