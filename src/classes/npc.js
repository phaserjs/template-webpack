import { Actor } from './actor'

export class Facilitator extends Actor {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)

    this.body.setSize(55, 80)
    this.body.setOffset(5, 0)
    this.name = texture
    this.speed = 220
    console.log('jared', this)
    this.initAnimations()
    this.setColliders(scene)
    this.setVisible(false)
    this.setActive(false)
    this.flipX = true
  }

  initAnimations () {
    this.scene.anims.create({
      key: 'jared-walk',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'walk-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.wall)
    scene.physics.world.addCollider(this, scene.jumpLayer)
    scene.physics.world.addCollider(this, scene.water, () => {
      this.destroy()
    })
  }

  update () {
    this.setVelocityY(-220)
    this.setVelocityX(-220)
    this.anims.play('jared-walk', true)
  }
}
