import { Physics } from 'phaser'
import { Bullet } from '../bullet'

export class BulletGroup extends Physics.Arcade.Group {
  constructor (scene, x, y, enemyGun, ammo) {
    super(scene.physics.world, scene)

    this.defaults.setAllowGravity = false
    this.createMultiple({
      classType: Bullet,
      quantity: ammo,
      active: false,
      visible: false,
      key: 'adventurer',
      setXY: { x, y }
    })
    this.enemyGun = enemyGun
    this.setColliders(scene)
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.platforms, (bullet) => {
      bullet.destroy()
    })
  }

  fireBullet (x, y, facingLeft, enemyGun) {
    const bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y, facingLeft, enemyGun)
    }
  }
}
