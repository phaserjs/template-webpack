import { Math, Physics } from 'phaser'

export class HitBox extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y)

    this.hitPlayer = false
  }

  // setColliders (scene) {

  // }

  spawn (x, y, config) {
    console.log('hitbox, spawned')
    this.scene.add.existing(this)
    this.config = config
    this.setScale(config.scale)
    this.setSize(config.w, config.h)
    this.setOffset(config.xOff, config.yOff)
    // this.setColliders(this.scene)
    this.x = x
    this.y = y
    this.setActive(true)
    this.setVisible(false)
    this.body.allowGravity = false
    this.setVelocity(Math.Between(-300, -100), Math.Between(-200, -50))

    if (this.hitPlayer === true) {
      this.body.reset(x + 20, y)
      config.boss.anims.play(config.atkAnim, true)
      this.once('animationcomplete', () => {
        console.log('animationcomplete')
        this.destroy()
      })
    } else {
      this.body.reset(x + 20, y)
      this.scene.time.addEvent({
        delay: 700,
        callback: () => this.destroy()
      })
    }
  }
}
