// testing atlas purposes only
import { Math } from 'phaser'
import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss4 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'prue-boss')

    this.setScale(3)
    this.setSize(61, 83)
    this.setOffset(119, 76)
    this.setAnims()

    this.name = 'boss4'

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)
    console.log(this.scene.player)

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
      frameRate: 50,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'boss4-death',
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
    scene.physics.world.addCollider(this, this.scene.platforms)
    scene.physics.world.addCollider(this.spawner, this.spawner)
    scene.physics.world.addCollider(this, this.scene.bulletGroup, (boss, bullet) => {
      this.spawner.spawnMob(this.x, this.y)
      this.getDamage(10)
      bullet.destroy()
    })
  }

  update () {
    if (this.active && this.hp > 0) {
      // if (this.body.velocity.x > 0) {
      //   this.body.velocity.x -= 10
      // } else if (this.body.velocity.x < 0) {
      //   this.body.velocity.x += 10
      // }
      const dist = Math.Distance.BetweenPointsSquared(this, this.scene.player)
      if (dist < 10000) {
        this.anims.play('surf-prue-boss', true)
      } else if (dist > 10000 && dist < 60000) {
        this.scene.physics.accelerateToObject(this, this.scene.player)
        this.anims.play('run-prue-boss', true)
      } else {
        this.setVelocityX(0)
        this.anims.play('idle-ahmad-boss', true)
      }
    }
  }
}
