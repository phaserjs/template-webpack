import { Physics } from 'phaser'

export class Bullet extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'mon-bullet')
  }

  fire (x, y, facingLeft, enemyGun) {
    this.scene.add.existing(this)
    // console.log(this.flipX)
    this.setActive(true)
    this.setVisible(true)
    // console.log(this.body)
    this.scene.time.addEvent({
      delay: 4000,
      callback: () => this.destroy()
    })

    if (this.scene.player.anims.getName() === 'attack') {
      if (facingLeft) {
        this.body.reset(x - 20, y)
        this.setVelocityX(-350)
        this.anims.play('iceBulletStart')
        this.anims.chain(['iceBulletMid', 'iceBulletHit'], true)
        this.flipX = true
      } else {
        this.body.reset(x + 20, y)
        this.setVelocityX(500)
        this.anims.play('fireBullet')
        this.anims.chain(['iceBulletMid', 'waterBullet', 'waterBulletImpact', 'iceBulletHit'], true)
        this.flipX = false
      }
    }

    if (enemyGun) {
      this.body.reset(x, y)
      this.setVelocity(this.scene.player.x - this.x, this.scene.player.y - this.y)
      this.anims.play('fireBullet', true)
    }
  }
}
