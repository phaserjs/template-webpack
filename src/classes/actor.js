import { Physics } from 'phaser'

export class Actor extends Physics.Arcade.Sprite {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.hp = 100
  }

  getDamage (value) {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value && !this.godMode) {
          this.scene.healthBar.scaleX = (this.hp / this.maxHealth)
          this.scene.healthBar.x -= (this.hp / this.maxHealth) - 1
          this.hp -= value
        }
      },
      onComplete: () => {
        this.setAlpha(1)
      }
    })
  }

  getHPValue () {
    return this.hp
  }

  die () {
    this.anims.play(this.name + '-death', true)
    this.once('animationcomplete', () => {
      console.log('animationcomplete')
      this.destroy()
    })
  }

  checkFlip () {
    if (this.body.velocity.x < 0) {
      this.flipX = true
    } else {
      this.flipX = false
    }
  }
}
