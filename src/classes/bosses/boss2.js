// testing atlas purposes only
import { Math } from 'phaser'
import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'sushi-hands')

    this.setScale(5)
    this.setSize(45, 55)
    this.setOffset(80, 36)
    this.setAnims()

    this.name = 'boss2'
    this.hp = 100
    this.maxHealth = 100

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)
    console.log(this.scene.player)

    this.setColliders(scene)
  }

  setAnims () {
    this.scene.anims.create({
      key: 'idle-test-boss',
      frames: this.scene.anims.generateFrameNames('sushi-hands', {
        prefix: 'idle-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'run-test-boss',
      frames: this.scene.anims.generateFrameNames('sushi-hands', {
        prefix: 'run-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'atk-test-boss',
      frames: this.scene.anims.generateFrameNames('sushi-hands', {
        prefix: 'atk-',
        end: 7
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss2-death',
      frames: this.scene.anims.generateFrameNames('sushi-hands', {
        prefix: 'death-',
        end: 6
      }),
      frameRate: 12,
      repeat: 0
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this.scene.player, this)
    scene.physics.world.addCollider(this, this.scene.jumpLayer)
    scene.physics.world.addCollider(this, this.scene.wall)
    scene.physics.world.addCollider(this.spawner, this.spawner)

    scene.physics.world.addOverlap(scene.player.gun, this, (boss, bullet) => {
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.getDamage(10)
      bullet.destroy()
      this.scene.sound.stopByKey('stepsAudio')
      this.scene.sound.play('stepsAudio', { volume: 0.08, loop: false })
      // scene.enemyHealthBar.scaleX = (this.hp / this.maxHealth)
      // scene.enemyHealthBar.x -= (this.hp / this.maxHealth) - 1
    })
  }

  update () {
    if (this.active && this.hp > 0) {
      // flip broken
      // this.boss2Flip()

      const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player)

      if (dist > 20000 && dist < 80000) {
        this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('run-test-boss', true)
      } else if (dist <= 20000) {
        this.anims.play('atk-test-boss', true)
      } else {
        this.setVelocityX(0)
        this.anims.play('idle-test-boss', true)
      }
    }
  }
}
