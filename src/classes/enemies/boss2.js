// testing atlas purposes only

import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'sushi-hands')

    this.setScale(5)
    this.setSize(45, 55)
    this.setOffset(80, 32)
    this.setAnims()

    this.name = 'boss2'

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

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
      if (this.body.velocity.x > 0) {
        this.body.velocity.x -= 10
      } else if (this.body.velocity.x < 0) {
        this.body.velocity.x += 10
      }
      this.anims.play('atk-test-boss', true)
    }
  }
}
