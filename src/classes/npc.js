import { Actor } from './actor'

export class Facilitator extends Actor {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)

    this.body.setSize(55, 85)
    this.body.setOffset(82, 55)
    this.name = texture
    this.speed = 220

    this.initAnimations()
    this.setColliders(scene)
  }

  initAnimations () {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'walk-',
        end: 7
      }),
      frameRate: 12
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.floor)
    scene.physics.world.addCollider(this, scene.platforms)
  }

  update () {
    this.anims.play('walk', true)
  }
}
