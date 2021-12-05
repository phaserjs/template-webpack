import { GameObjects, Math } from 'phaser'
import { BulletGroup } from '../groups/bullet-group'

export class Patroller extends GameObjects.PathFollower {
  constructor(scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new BulletGroup(this.scene, x, y)
    console.log(this)

    this.scene.physics.world.addCollider(this.scene.player, this, () => {
      this.scene.player.getDamage()
      this.destroy()
    })

    setInterval(() => this.fireGun(), 500)
  }

  fireGun() {
    if (this.scene.player.active) {
      
      console.log(this.flipX)
      if (Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
        this.gun.fireBullet(this.x, this.y, this.flipX)
      }
    }
  }

  checkFlip() {
    if (this.body.velocity.x < 0) {
      this.flipX = true
    } else if (this.body.velocity.x > 0) {
      this.flipX = false
    }
  }

  update() {
    if (this.active) {
      
      this.checkFlip()
    }
    
  }
}
