import { GameObjects, Math, Physics } from 'phaser'
import { Gun } from '../groups/gun'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture, config) {
    super(scene, path, x, y, texture)
    this.body = new Physics.Arcade.Body(scene.physics.world, this)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.config = config

    console.log(this.body)

    this.gun = new Gun(this.scene, x, y - 400, true, true, true, 500)
    this.name = texture
    this.setColliders(scene)
    this.setAnims()

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })
    this.body.setSize(this.config.w, this.config.h)
    this.body.setOffset(this.config.xOff, this.config.yOff)
    this.setScale(this.config.scale)
  }

  checkFlip () {
    if (this.body.velocity.x < 0) {
      this.flipX = true
    } else {
      this.flipX = false
    }
  }

  die () {
    this.anims.play(this.name + '-death', true)
    this.once('animationcomplete', () => {
      console.log('animationcomplete')
      this.destroy()
    })
  }

  setAnims () {
    this.scene.anims.create({
      key: this.name + '-run',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'run-',
        end: this.config.frameEnds.run
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: this.name + '-idle',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'idle-',
        end: this.config.frameEnds.idle
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: this.name + '-atk',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'atk-',
        end: this.config.frameEnds.atk
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: this.name + '-death',
      frames: this.scene.anims.generateFrameNames(this.name, {
        prefix: 'death-',
        end: this.config.frameEnds.death
      }),
      frameRate: 12
    })

    // this.scene.anims.create({
    //   key: 'dishes-poo-idle',
    //   frames: this.scene.anims.generateFrameNames('dishes-poo', {
    //     prefix: 'fly-',
    //     end: 2
    //   }),
    //   framerate: 12,
    //   repeat: -1
    // })
    // this.scene.anims.create({
    //   key: 'dishes-poo-plate',
    //   frames: this.scene.anims.generateFrameNames('dishes-poo', {
    //     prefix: 'plate-',
    //     end: 1
    //   }),
    //   framerate: 12,
    //   repeat: -1
    // })
    // this.scene.anims.create({
    //   key: 'dishes-poo-poo',
    //   frames: this.scene.anims.generateFrameNames('dishes-poo', {
    //     prefix: 'poo-',
    //     end: 0
    //   }),
    //   framerate: 12
    // })
  }

  setColliders (scene) {
    scene.physics.world.addOverlap(scene.player, this, (player) => {
      player.getDamage(20)
      this.scene.playerHealthBar.scaleX = (this.scene.player.hp / this.scene.player.maxHealth)
      this.scene.playerHealthBar.x -= (this.scene.player.hp / this.scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
      this.die()
    })

    scene.physics.world.addOverlap(scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { loop: false })
      bullet.destroy()
    })

    scene.physics.world.addOverlap(scene.player.gun, this, (mob, bullet) => {
      bullet.destroy()
      this.destroy()
    })
  }

  fireGun () {
    if (this.active && this.scene.player.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.gun.fireBullet(this.x, this.y, this.flipX, true)
    }
  }

  update () {
    if (this.active) {
      // this.checkFlip()
      this.anims.play(this.name + this.config.key.idle, true)
    }
  }
}
