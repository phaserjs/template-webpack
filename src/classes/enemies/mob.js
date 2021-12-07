import { Math } from 'phaser'
import { Actor } from '../actor'

export class Mob extends Actor {
  constructor (scene, x, y, texture, config) {
    super(scene, x, y, texture)

    scene.physics.add.existing(this)
    this.name = texture
    this.config = config
    // this.setAnims(config)
    this.setColliders(scene)
    console.log('mob', config)
  }

  setAnims (config) {
    this.scene.anims.create({
      key: this.name + '-run',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'run-',
        end: config.frameEnds.run
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: this.name + '-idle',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'idle-',
        end: config.frameEnds.idle
      }),
      frameRate: 12
    })
  }

  setColliders (scene) {
    scene.physics.world.addOverlap(scene.player, this, () => {
      this.scene.player.getDamage(20)
      this.scene.playerHealthBar.scaleX = (this.scene.player.hp / this.scene.player.maxHealth)
      this.scene.playerHealthBar.x -= (this.scene.player.hp / this.scene.player.maxHealth) - 1
      this.scene.sound.play('playerDamageAudio', { loop: false })
      this.destroy()
    })
    scene.physics.world.addCollider(this, scene.water)
    scene.physics.world.addCollider(this, scene.wall)
    scene.physics.world.addCollider(this, scene.jumpLayer)
    scene.physics.world.addOverlap(scene.player.gun, this, (mob, bullet) => {
      bullet.destroy()
      this.destroy()
    })
  }

  spawn (x, y, config) {
    this.setScale(config.scale)
    this.setSize(config.w, config.h)
    this.setOffset(config.xOff, config.yOff)
    this.setAnims(config)
    this.x = x
    this.y = y
    this.setActive(true)
    this.setVisible(true)
    this.body.allowGravity = true
    this.setVelocity(Math.Between(-300, -100), Math.Between(-200, -50))
  }

  update () {
    if (this.active) {
      this.scene.physics.accelerateToObject(this, this.scene.player, 70, 180)
      this.anims.play(this.name + '-run', true)
      this.checkFlip()
    }
  }
}
