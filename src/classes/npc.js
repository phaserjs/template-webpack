import { Actor } from './actor'

export class Facilitator extends Actor {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)

    this.body.setSize(55, 85)
    this.body.setOffset(82, 55)
    this.name = 'facilitator'
    this.speed = 220

    this.initAnimations()
    this.setColliders()
  }

  initAnimations () {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'walk-',
        end: 7
      }),
      frameRate: 12
    })
  }

  setColliders () {
    this.scene.physics.world.addCollider(this, this.scene.platforms, () => {
      this.canJump = true
    })
    this.scene.physics.world.addCollider(this, this.scene.ground, () => {
      this.canJump = true
    })
    this.scene.physics.world.addCollider(this, this.scene.floor, () => {
      this.canJump = true
    })
    this.scene.physics.world.addCollider(this, this.scene.collider, () => {
      this.canJump = true
    })

    this.scene.physics.world.addCollider(this, this.scene.jumpLayer, () => {
      this.canJump = true
    })
  }

  update () {

  }
}
