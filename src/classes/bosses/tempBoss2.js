import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'
import { Math } from 'phaser'
import { Gun } from '../groups/gun'

export class TempBoss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'golem-idle')

    this.setScale(4)
    this.setSize(40, 50)
    this.setOffset(49, 60)
    this.setAnims()

    this.hp = 100

    this.name = 'tempBoss2'

    const golemConfig = {
      key: {
        run: '-golem-walk'
      },
      w: 40,
      h: 50,
      xOff: 49,
      yOff: 60,
      prefix: '',
      scale: 1,
      frameRate: 12,
      frameEnds: {
        run: 14
      }
    }

    this.spawner = new MobSpawner(this.scene, 50, -30, 'golem-walk', golemConfig)

    this.golemGun = new Gun(this.scene, x, y - 400, 40)
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
      key: 'golem-walk-golem-walk',
      frames: this.scene.anims.generateFrameNames('golem-walk', {
        prefix: 'run-',
        end: 14
      }),
      frameRate: 100,
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

    scene.physics.world.addCollider(this.spawner, this.spawner)

    scene.physics.world.addCollider(this.scene.player, this.golemGun, (player, bullet) => {
      player.getDamage(10)
      scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
      bullet.destroy()
    })

    scene.physics.world.addCollider(scene.player.gun, this, (boss, bullet) => {
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.scene.sound.play('enemyDamage', { loop: false })
      this.getDamage(1)
      bullet.destroy()
    })
  }

  fireGun () {
    const config = {
      gunAnim: 'fireBullet',
      enemyGun: true,
      playerGun: false
    }
    if (this.active && this.scene.player.active && Math.Distance.BetweenPointsSquared(this, this.scene.player) / 4 < 40000) {
      this.golemGun.fireBullet(this.x, this.y - 20, this.flipX, config)
    }
  }

  update () {
    const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player) / 4
    if (this.active && this.hp > 0) {
      // console.log(dist / 4)
      this.checkFlip()
      if (dist <= 90000 && dist > 20000) {
        this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('golem-walk-golem-walk', true)
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
