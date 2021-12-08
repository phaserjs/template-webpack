import { Physics } from 'phaser'
import { HitBox } from '../enemies/hitbox'

export class Hitboxes extends Physics.Arcade.Group {
  constructor (scene, x, y, config) {
    super(scene.physics.world, scene)

    this.defaults.setCollideWorldBounds = true
    this.defaults.setAllowGravity = false

    this.runChildUpdate = true
    this.config = config

    this.createMultiple({
      classType: HitBox,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'shame',
      setXY: { x, y, stepX: 50 }
    })
  }

  spawnHitBox (x, y) {
    console.log('spawnHitbox')
    const hitbox = this.getFirstDead(false)
    if (hitbox) {
      hitbox.spawn(x, y, this.config)
    }
  }
}
