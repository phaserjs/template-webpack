import { GameObjects, Math } from 'phaser'
import { BulletGroup } from '../groups/bullet-group'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new BulletGroup(this.scene, x, y)

    setInterval(() => this.fireGun(), 500)
  }

  fireGun() {
    if (Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 0) {
      this.gun.fireBullet(this.x, this.y, this.scene.player.flipX)
    }
  }
}
