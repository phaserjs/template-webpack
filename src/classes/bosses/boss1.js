import { Math } from 'phaser'
import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'
import { Gun } from '../groups/gun'

export class Boss1 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'duck-boss')

    // for old boss
    // this.setScale(10)
    // this.setSize(30, 30)
    // this.setOffset(50, 3)

    this.setAnims()
    this.hp = 100
    this.maxHealth = 100
    this.name = 'boss1'
    const bearConfig = {
      w: 128,
      h: 128,
      xOff: 0,
      yOff: 0,
      scale: 0.3,
      frameEnds: {
        run: 3
      }
    }

    // bleed bears
    this.spawner = new MobSpawner(this.scene, 50, -30, 'bear-boss', bearConfig)

    // boss gun is broken
    this.bossGun = new Gun(this.scene, x, y - 400, false, true, 1000)

    this.scene.add.existing(this.spawner)

    this.setColliders(scene)

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })
  }

  setAnims () {
    this.scene.anims.create({
      key: 'boss1-idle',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'idle-',
        end: 1
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss1-run',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'run-',
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss1-death',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'death-',
        end: 2
      }),
      frameRate: 3,
      repeat: 0
    })
  }

  fireGun () {
    if (this.active && this.scene.player.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.bossGun.fireBullet(this.x, this.y, this.flipX, true)
    }
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, this.scene.jumpLayer)
    scene.physics.world.addCollider(this, this.scene.wall)
    scene.physics.world.addCollider(this.spawner, this.spawner)

    // boss and player collision
    scene.physics.world.addCollider(this.scene.player, this,
      (player, boss) => {
        player.getDamage(10)
        // scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
        // scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
        scene.sound.play('playerDamageAudio', { loop: false })
      })

    // hit by mon gun
    scene.physics.world.addOverlap(scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      // scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      // scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { loop: false })
      bullet.destroy()
    })

    // hit by player gun
    scene.physics.world.addOverlap(scene.player.gun, this, (boss, bullet) => {
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      console.log('Sup g')
      this.getDamage(10)
      this.scene.sound.stopByKey('stepsAudio')
      this.scene.sound.play('stepsAudio', { volume: 0.08, loop: false })
      // scene.enemyHealthBar.scaleX = (this.hp / this.maxHealth)
      // scene.enemyHealthBar.x -= (this.hp / this.maxHealth) - 1
      bullet.destroy()
    })
  }

  update () {
    this.checkFlip()
    if (this.active && this.hp < 50 && this.hp > 0) {
      this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
      this.anims.play('boss1-run', true)
    } else if (this.active && this.hp > 0) {
      if (this.body.velocity.x > 0) {
        this.body.velocity.x -= 10
      } else if (this.body.velocity.x < 0) {
        this.body.velocity.x += 10
      }
      this.anims.play('boss1-idle', true)
      this.flipX = true
    }
  }
}
