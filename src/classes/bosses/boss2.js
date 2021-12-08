// testing atlas purposes only
import { Math } from 'phaser'
import { Actor } from '../actor'
import { Hitboxes } from '../groups/hitboxes'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'sushi-hands')

    this.setScale(5)
    this.setSize(45, 55)
    this.setOffset(80, 36)
    this.setAnims()
    this.initHitBox()

    this.atkPlayer = false

    this.dying = false

    this.name = 'boss2'
    this.hp = 100
    this.maxHealth = 100

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
    this.scene.time.addEvent({
      callback: this.spawnHitBox,
      callbackScope: this,
      delay: 5000,
      loop: true
    })
  }

  initHitBox () {
    const hitConfig = {
      boss: this,
      w: 45,
      h: 55,
      xOff: 80,
      yOff: 36,
      scale: 5,
      atkAnim: 'atk-test-boss'
    }
    this.hitbox = new Hitboxes(this.scene, this.body.x, this.body.y, hitConfig)
  }

  spawnHitBox () {
    if (this.atkPlayer === true && !this.dying && this.scene.player.active) {
      this.hitbox.spawnHitBox(this.body.x - 400, this.body.y - 100)
      const atkHitbox = this.scene.physics.world.addOverlap(this.scene.player, this.hitbox, (hitbox, player) => {
        this.scene.player.getDamage(10)
        this.scene.sound.play('playerDamageAudio', { volume: 0.1, loop: false })
        this.scene.physics.world.removeCollider(atkHitbox)
        this.hitbox.hitPlayer = true
      })
      this.anims.play('atk-test-boss', true)
      console.log(this.scene.player.active)
      this.hitbox.hitPlayer = false
    }
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

      const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player) / 4

      if (dist > 20000 && dist < 80000) {
        this.scene.physics.accelerateToObject(this, this.scene.player, 100, 180)
        this.anims.play('run-test-boss', true)
      } else if (dist < 50000) {
        this.atkPlayer = true
      } else {
        this.atkPlayer = false
        this.setVelocityX(0)
        this.anims.play('idle-test-boss', true)
      }
    }
  }
}
