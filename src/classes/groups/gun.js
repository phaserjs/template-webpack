import { Physics } from 'phaser'
import { Bullet } from '../bullet'

export class Gun extends Physics.Arcade.Group {
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

    this.setAnims()
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

  setAnims () {
    this.scene.anims.create({
      key: 'iceBulletStart',
      frames: this.scene.anims.generateFrameNames('ice-bullet', {
        prefix: 'start-',
        end: 2
      }),
      frameRate: 16
    })

    this.scene.anims.create({
      key: 'iceBulletMid',
      frames: this.scene.anims.generateFrameNames('ice-bullet', {
        prefix: 'flight-',
        end: 9
      }),
      frameRate: 16
    })

    this.scene.anims.create({
      key: 'iceBulletHit',
      frames: this.scene.anims.generateFrameNames('ice-bullet', {
        prefix: 'hit-',
        end: 6
      }),
      frameRate: 16
    })

    this.scene.anims.create({
      key: 'fireBullet',
      frames: this.scene.anims.generateFrameNames('mon-bullet', {
        prefix: 'bullet-',
        frames: [0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 4, 5, 6, 7]
      }),
      frameRate: 16
    })

    this.scene.anims.create({
      key: 'waterBullet',
      frames: this.scene.anims.generateFrameNames('water-bullet', {
        prefix: 'flight-',
        start: 0,
        end: 20
      }),
      frameRate: 16
    })

    this.scene.anims.create({
      key: 'waterBulletImpact',
      frames: this.scene.anims.generateFrameNames('water-bullet-impact', {
        prefix: 'impact-',
        start: 0,
        end: 15
      }),
      frameRate: 16
    })
  }
}
