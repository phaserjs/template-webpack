// testing atlas purposes only
import { Math } from 'phaser'
import { Actor } from '../actor'
import { Gun } from '../groups/gun'
// import { MobSpawner } from '../groups/mob-spawner'

export class Boss5 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'prue-boss')

    this.setScale(5)
    this.setSize(34, 41)
    this.setOffset(96, 70)
    this.setAnims()

    this.name = 'boss5'
    this.gun = new Gun(this.scene, x, y - 400, false, true, 40)
    this.setColliders(scene)
    // this.spawner = new MobSpawner(this.scene, 50, -30)
    // this.scene.add.existing(this.spawner)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'idle-prue-boss',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'idle-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })

    // run/ walk
    this.scene.anims.create({
      key: 'run-prue-boss',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'run-',
        end: 9
      }),
      frameRate: 12,
      repeat: -1
    })

    // surf
    this.scene.anims.create({
      key: 'surf-prue-boss',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'surf-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'boss5-death',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'death-',
        end: 15
      }),
      frameRate: 12
    })

    // falling
    this.scene.anims.create({
      key: 'falling-prue-boss',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'tumble-',
        end: 5
      }),
      frameRate: 12,
      repeat: -1
    })

    // attack
    this.scene.anims.create({
      key: 'attack-prue-boss',
      frames: this.scene.anims.generateFrameNames('prue-boss', {
        prefix: 'atk-',
        end: 32
      }),
      frameRate: 24
    })
  }

  die () {
    this.setVelocityX(0)
    this.anims.play(this.name + '-death', true)
    this.scene.prue.spawn()
    this.once('animationcomplete', () => {
      console.log('animationcomplete')
      this.destroy()
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this.scene.player, this)
    scene.physics.world.addCollider(this, this.scene.jumpLayer)
    scene.physics.world.addCollider(this, this.scene.walls)

    scene.physics.world.addCollider(this.scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      // scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      // scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { loop: false })
      bullet.destroy()
    })

    scene.physics.world.addCollider(scene.player.gun, this, (boss, bullet) => {
      // this.scene.sound.play('enemyDamage', { loop: false })
      this.gun.fireBullet(this.x, this.y, this.flipX, true, false)
      this.getDamage(10)
      bullet.destroy()
      this.scene.sound.stopByKey('stepsAudio')
      this.scene.sound.play('stepsAudio', { volume: 0.08, loop: false })
    })
  }

  update () {
    const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player)
    if (this.active && this.hp > 0) {
      this.boss2Flip()
      if (this.active && this.hp > 60 && dist > 300000) {
        // this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('surf-prue-boss', true)
      } else if (this.active && this.hp < 50 && dist < 120000) {
        this.anims.play('falling-prue-boss', true)
      } else if (dist < 120000) {
        this.anims.play('attack-prue-boss', true)
      } else if (dist < 200000) {
        // this.scene.physics.accelerateToObject(this, this.scene.player)
        this.anims.play('run-prue-boss', true)
      } else {
        this.setVelocityX(0)
        this.anims.play('idle-prue-boss', true)
      }
    }
  }
}
