import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'
import { Math } from 'phaser'
import { Gun } from '../groups/gun'

export class TempBoss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'golem-idle')

    this.setScale(2)
    this.setSize(40, 50)
    this.setOffset(49, 60)
    this.setAnims()

    this.name = 'tempBoss2'

    this.spawner = new MobSpawner(this.scene, 50, -30)

    this.golemGun = new Gun(this.scene, x, y - 400, false, true, 40)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 1200,
      loop: true
    })
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'golem-idle',
      frames: this.scene.anims.generateFrameNames('golem-idle', {
        prefix: 'idle-',
        end: 15
      }),
      frameRate: 15,
      repeat: -1
    })

    // atk
    this.scene.anims.create({
      key: 'golem-atk',
      frames: this.scene.anims.generateFrameNames('golem-punch', {
        prefix: 'atk-',
        end: 14
      }),
      frameRate: 14,
      repeat: -1
    })

    // run
    this.scene.anims.create({
      key: 'golem-walk',
      frames: this.scene.anims.generateFrameNames('golem-walk', {
        prefix: 'walk-',
        end: 14
      }),
      frameRate: 14,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'tempBoss2-death',
      frames: this.scene.anims.generateFrameNames('golem-dead', {
        prefix: 'death-',
        end: 15
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
      this.getDamage(100)
      bullet.destroy()
    })
  }

  fireGun () {
    if (this.active && this.scene.player.active && Math.Distance.BetweenPointsSquared(this, this.scene.player) / 4 < 40000) {
      this.golemGun.fireBullet(this.x, this.y, this.flipX, true, false)
    }
  }

  update () {
    const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player) / 4
    if (this.active && this.hp > 0) {
      // console.log(dist / 4)
      this.checkFlip()
      if (dist <= 90000 && dist > 20000) {
        this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('golem-walk', true)
      } else if (dist < 20000) {
        this.setVelocityX(0)
        this.anims.play('golem-atk', true)
      } else {
        this.anims.play('golem-idle', true)
        this.setVelocityX(0)
      }
    }
  }
}
