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

    this.dying = false

    console.log(this.body)

    this.gun = new Gun(this.scene, x, 0, 20)
    this.name = texture
    this.setColliders(scene)
    this.setAnims()
    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 1000,
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
  }

  setColliders (scene) {
    const playerhit = scene.physics.world.addOverlap(scene.player, this, (player) => {
      player.getDamage(20)
      this.scene.playerHealthBar.scaleX = (this.scene.player.hp / this.scene.player.maxHealth)
      this.scene.physics.world.removeCollider(playerhit)
      this.scene.playerHealthBar.x -= (this.scene.player.hp / this.scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
      this.dying = true
      this.die()
    })

    scene.physics.world.addOverlap(scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
      bullet.destroy()
    })

    scene.physics.world.addOverlap(scene.player.gun, this, (mob, bullet) => {
      bullet.destroy()
      this.dying = true
      this.die()
    })
  }

  fireGun () {
    const config = {
      gunAnim: 'fireBullet',
      enemyGun: true,
      playerGun: false
    }
    if (this.active && this.config.hasGun && this.scene.player.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.gun.fireBullet(this.x, this.y, this.flipX, config)
    }
  }

  update () {
    if (this.active) {
      this.anims.play(this.name + this.config.key.idle, true)
    }
  }
}
