import { Actor } from './actor'

export class Facilitator extends Actor {
  constructor (scene, x, y, texture, config) {
    super(scene, x, y, texture)

    this.config = config
    this.scene.add.existing(this)
    this.body.setSize(55, 80)
    this.body.setOffset(5, 0)
    this.body.allowGravity = false
    this.name = texture
    this.speed = 220
    console.log(this.name, this)
    this.initAnimations()
    this.setColliders(scene)
    this.setVisible(false)
    this.setActive(false)
    this.flipX = true
  }

  spawn (config) {
    this.setVisible(true)
    this.setActive(true)
    console.log('on death', this.name, this)
    this.scene.add.image(470, 60, this.name + 'Text').setScale(0.4).setScrollFactor(0)
    this.scene.sound.play(this.name + 'Audio', { volume: 1, loop: false })
  }

  initAnimations (config) {
    this.scene.anims.create({
      key: this.name + '-walk',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'walk-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.walls)
    scene.physics.world.addCollider(this, scene.jumpLayer)
    scene.physics.world.addCollider(this, scene.water, () => {
      this.destroy()
    })
  }

  update () {
    this.setVelocityY(0)
    this.setVelocityX(0)
    this.anims.play(this.name + '-walk', true)
  }
}
