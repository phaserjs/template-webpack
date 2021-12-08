import { Actor } from '../actor'

export class Otter extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'otter')
    this.setSize(61, 30)
    this.setAnims()
    this.name = 'otter'
    this.setVisible(true)
    this.setActive(true)

    this.setColliders(scene)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'otter',
      frames: this.scene.anims.generateFrameNames('otter', {
        prefix: 'sleep-',
        start: 0,
        end: 5
      }),
      frameRate: 1.2,
      repeat: true
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, this.scene.jumpLayer)
    scene.physics.world.addCollider(this, this.scene.wall)
  }

  update () {
    this.anims.play('otter', true)
  }
}
