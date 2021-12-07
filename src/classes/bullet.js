import { Physics } from 'phaser'

export class Bullet extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'mon-bullet')
  }

  fire (x, y, facingLeft, enemyGun, bossGun) {
    this.scene.add.existing(this)
    // console.log(this.flipX)
    this.setActive(true)
    this.setVisible(true)
    console.log('boosgun', bossGun)
    console.log('enem gun', enemyGun)

    if (this.scene.player.anims.getName() === 'attack') {
      this.scene.time.addEvent({
        delay: 2300,
        callback: () => this.destroy()
      })
      if (facingLeft) {
        this.body.reset(x - 20, y)
        this.setVelocityX(-350)
        this.anims.play('iceBulletStart')
        this.anims.chain(['iceBulletMid', 'iceBulletHit'], true)
        this.flipX = true
      } else {
        this.body.reset(x + 20, y)
        this.setVelocityX(500)
        this.anims.play('waterBullet')
        this.anims.chain('waterBulletImpact', true)
        this.flipX = false
      }
    }
    if (bossGun === true) {
      if (facingLeft) {
        this.body.reset(x - 20, y)
        this.setVelocity(this.scene.player.x - this.x, this.scene.player.y - this.y)
        this.anims.play('iceBulletStart', true)
        // this.anims.chain(['iceBulletMid', 'iceBulletHit'], true)
        this.flipX = true
      } else {
        this.body.reset(x + 20, y)
        this.setVelocity(this.scene.player.x - this.x, this.scene.player.y - this.y)
        this.anims.play('iceBulletStart')
        this.anims.chain(['iceBulletMid', 'iceBulletHit'], true)
        this.flipX = false
      }
    }

    if (enemyGun) {
      this.body.reset(x, y)
      this.setVelocity(this.scene.player.x - this.x, this.scene.player.y - this.y)
      this.anims.play('fireBullet', true)

      this.scene.time.addEvent({
        delay: 1000,
        callback: () => this.destroy()
      })
    }
  }
}
