import { Physics } from "phaser";

export class Bullet extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        
    }


    fire(x, y, facingLeft) {
        this.body.reset(x, y)
        this.scene.add.existing(this)
        console.log(this.scene);

        this.setActive(true)
        this.setVisible(true)
        if (facingLeft) {
            this.setVelocityX(-350)
        } else {

            this.setVelocityX(350)
        }
    }
}