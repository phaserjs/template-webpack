import { GameObjects, Math } from 'phaser'
import { BulletGroup } from '../groups/bullet-group'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new BulletGroup(this.scene, x, y - 400, true, 1000)

    this.setColliders()

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })
  }

  setColliders () {
    this.scene.physics.world.addCollider(this.scene.player, this, (player) => {
      player.getDamage(20)
      this.destroy()
    })

    this.scene.physics.world.addCollider(this.scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      bullet.destroy()
    })
  }

  fireGun () {
    if (this.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.gun.fireBullet(this.x, this.y, this.flipX, true)
    }
  }

  update () {

  }
}
