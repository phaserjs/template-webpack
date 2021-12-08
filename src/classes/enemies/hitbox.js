import { Math, Physics } from 'phaser'

export class HitBox extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y)

    this.hitPlayer = false
  }

  setColliders (scene) {
    scene.physics.world.addOverlap(scene.player, this, () => {
      this.scene.player.getDamage(50)
      this.scene.playerHealthBar.scaleX = (this.scene.player.hp / this.scene.player.maxHealth)
      this.scene.playerHealthBar.x -= (this.scene.player.hp / this.scene.player.maxHealth) - 1
      this.scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
      this.hitPlayer = true
      this.destroy()
    })
  }

  spawn (x, y, config) {
    console.log('hitbox, spawned')
    this.scene.add.existing(this)
    this.config = config
    this.setScale(config.scale)
    this.setSize(config.w, config.h)
    this.setOffset(config.xOff, config.yOff)
    this.setColliders(this.scene)
    this.x = x
    this.y = y
    this.setActive(true)
    this.setVisible(false)
    this.body.allowGravity = false
    this.setVelocity(Math.Between(-300, -100), Math.Between(-200, -50))

    if (this.scene.player.anims.getName() === 'atk-test-boss' && this.hitPlayer === true) {
      this.body.reset(x + 20, y)
      this.anims.play(this.config.atkAnim, true)
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
