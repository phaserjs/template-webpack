import { GameObjects, Math } from 'phaser'
import { Gun } from '../groups/gun'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new Gun(this.scene, x, y - 400, true, 1000)

    this.setColliders(scene)

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })
  }

  setColliders (scene) {
    scene.physics.world.addOverlap(scene.player, this, (player) => {
      player.getDamage(20)
      this.destroy()
    })

    scene.physics.world.addOverlap(scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      bullet.destroy()
    })

    scene.physics.world.addOverlap(scene.player.gun, this, (mob, bullet) => {
      bullet.destroy()
      this.destroy()
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
