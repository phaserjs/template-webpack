import { GameObjects, Math } from 'phaser'
import { BulletGroup } from '../groups/bullet-group'

export class Patroller extends GameObjects.PathFollower {
  constructor(scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new BulletGroup(this.scene, x, y)

    this.scene.physics.world.addCollider(this.scene.player, this, () => {
      this.scene.player.getDamage()
      this.destroy()
    })

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })

    // this.intervalId = setInterval(() => {
    //   // if (this.scene.player.active) {

    //   this.fireGun()
    //   // }
    // }, 500)

  }

  fireGun() {


    if (this.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.gun.fireBullet(this.x, this.y, this.flipX)
    }

  }


  update() {

    // if(!this.player.active) clearInterval(this.intervalId)


  }
}
