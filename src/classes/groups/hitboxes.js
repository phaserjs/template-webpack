import { Physics } from 'phaser'
import { Mob } from '../enemies/mob'

export class Hitboxes extends Physics.Arcade.Group {
  constructor (scene, x, y, texture, config) {
    super(scene.physics.world, scene)

    this.defaults.setCollideWorldBounds = true
    this.defaults.setAllowGravity = false

    this.runChildUpdate = true
    this.config = config

    this.createMultiple({
      classType: Mob,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: texture,
      setXY: { x, y, stepX: 50 }
    })

    this.setColliders(scene)
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.walls)
    scene.physics.world.addCollider(this, scene.jumpLayer)
    scene.physics.world.addCollider(this, this)
  }

  spawnMob (x, y) {
    console.log(';;;;', this)
    const mob = this.getFirstDead(false)
    if (mob) {
      mob.spawn(x, y, this.config)
    }
  }
}
