import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class TestBoss extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'fly-mon')

    this.setScale(0.2)
    this.setSize(480, 320)
    this.setAnims()

    this.name = 'TestBoss'
    this.hp = 100
    this.maxHealth = 100

    this.setColliders(scene)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'idle-TestBoss-boss',
      frames: this.scene.anims.generateFrameNames('fly-mon', {
        prefix: 'idle-',
        end: 3
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'TestBoss-death',
      frames: this.scene.anims.generateFrameNames('fly-mon', {
        prefix: 'death-',
        end: 4
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

  update () {
    if (this.active && this.hp > 0) {
      this.anims.play('idle-TestBoss-boss', true)
    }
  }
}
