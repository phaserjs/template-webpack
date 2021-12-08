// testing atlas purposes only
import { Math } from 'phaser'
import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss3 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'ahmad-boss')

    this.hp = 100
    this.maxHealth = 100

    this.setScale(3)
    this.setSize(61, 83)
    this.setOffset(119, 76)
    this.setAnims()
    this.name = 'boss3'

    const ahmadMob = {
      w: 30,
      h: 30,
      xOff: 50,
      yOff: 8,
      scale: 2,
      frameEnds: {
        idle: 4
      }
    }
    this.spawner = new MobSpawner(this.scene, 50, -30, 'gen-mob-1', ahmadMob)
    this.scene.add.existing(this.spawner)
    // console.log(this.spawner)
    this.setColliders(scene)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'idle-ahmad-boss',
      frames: this.scene.anims.generateFrameNames('ahmad-boss', {
        prefix: 'idle-',
        end: 5
      }),
      frameRate: 12,
      repeat: -1
    })

    // run/ walk
    this.scene.anims.create({
      key: 'run-ahmad-boss',
      frames: this.scene.anims.generateFrameNames('ahmad-boss', {
        prefix: 'run-',
        end: 11
      }),
      frameRate: 100,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'boss3-death',
      frames: this.scene.anims.generateFrameNames('ahmad-boss', {
        prefix: 'death-',
        end: 21
      }),
      frameRate: 12,
      repeat: 0
    })

    // attack
    this.scene.anims.create({
      key: 'attack-ahmad-boss',
      frames: this.scene.anims.generateFrameNames('ahmad-boss', {
        prefix: 'atk-',
        end: 14
      }),
      frameRate: 12
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this.scene.player, this)
    scene.physics.world.addCollider(this, this.scene.jumpLayer)
    scene.physics.world.addCollider(this, this.scene.wall)
    // scene.physics.world.addCollider(this.spawner, this.spawner)

    scene.physics.world.addCollider(scene.player.gun, this, (boss, bullet) => {
      // this.spawner.spawnMob(this.x, this.y)
      // this.spawner.spawnMob(this.x, this.y)
      // this.spawner.spawnMob(this.x, this.y)
      this.scene.sound.play('enemyDamage', { loop: false })
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
      if (this.active && this.hp < 50 && dist > 800000) {
        this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('run-ahmad-boss', true)
      } else if (this.active && this.hp < 50 && dist < 60000) {
        this.anims.play('attack-ahmad-boss', true)
      } else if (dist < 60000) {
        this.anims.play('attack-ahmad-boss', true)
      } else if (dist < 200000) {
        this.scene.physics.accelerateToObject(this, this.scene.player)
        this.anims.play('run-ahmad-boss', true)
      } else {
        this.setVelocityX(0)
        this.anims.play('idle-ahmad-boss', true)
      }
    }
  }
}
