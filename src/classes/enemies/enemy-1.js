import { config } from 'webpack'
import { Actor } from '../actor'

export class Enemy1 extends Actor {
  constructor (scene, x, y, texture, config) {
    super(scene, x, y, texture)

    scene.physics.add.existing(this)
    this.name = texture
    this.setAnims()
    this.setScale(config.scale)
    this.setSize(config.w, config.h)
    this.setOffset(config.xOff, config.yOff)

    scene.physics.world.addCollider(this.scene.player, this, () => {
      this.scene.player.getDamage(20)
      this.destroy()
    })
    scene.physics.world.addCollider(this, this.scene.platforms)
    scene.physics.world.addCollider(this, this.scene.bulletGroup, (boss, bullet) => {
      this.destroy()
      bullet.destroy()
    })
    
  }

  setAnims () {
    this.scene.anims.create({
      key: this.name + '-idle',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'idle-',
        end: config.frameEnds.idle
      }),
      frameRate: 12
    })
  }

  spawn (x, y) {
    this.x = x
    this.y = y
    this.setActive(true)
    this.setVisible(true)
    this.body.allowGravity = true
  }

  update () {
    if (this.active) {
      this.scene.physics.accelerateToObject(this, this.scene.player, 70, 180)
      this.anims.play(this.name + '-idle', true)
    }
  }
}
