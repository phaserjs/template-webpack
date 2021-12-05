import { Physics } from 'phaser'

export class Bullet extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'adventurer')
  }

  fire (x, y, facingLeft) {
    
    this.scene.add.existing(this)

    this.setActive(true)
    this.setVisible(true)
    if (facingLeft) {
      this.body.reset(x - 20, y)
      this.setVelocityX(-350)
    } else {
      this.body.reset(x + 20, y)
      this.setVelocityX(350)
    }
  }
}
