import { Physics } from 'phaser'

export class Bullet extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'mon-bullet')
  }

  fire (x, y, facingLeft, enemyGun) {
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

    if (enemyGun) {
      this.setVelocity(this.scene.player.x - this.x, this.scene.player.y - this.y)
      this.anims.play('fireBullet', true)
    }
  }
}
