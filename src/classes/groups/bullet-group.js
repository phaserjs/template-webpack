import { Physics } from 'phaser'
import { Bullet } from '../bullet'

export class BulletGroup extends Physics.Arcade.Group {
  constructor (scene, x, y) {
    super(scene.physics.world, scene)

    this.defaults.setAllowGravity = false
    this.createMultiple({
      classType: Bullet,
      frameQuantity: 300,
      active: false,
      visible: false,
      key: 'adventurer'
    })

    this.setColliders(scene)
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, this.scene.platforms, (bullet) => {
      bullet.destroy()
    })
  }

  fireBullet (x, y, facingLeft) {
    const bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y, facingLeft)
    }
  }
}
