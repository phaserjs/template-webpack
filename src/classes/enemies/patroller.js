import { GameObjects } from 'phaser'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false
  }
}
