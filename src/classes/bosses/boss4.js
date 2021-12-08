import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss4 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'caro-boss')

    this.setScale(0.2)
    this.setAnims()

    this.name = 'boss4'
    this.hp = 100
    this.maxHealth = 100

    this.flipX = true

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'idle-caro-boss',
      frames: this.scene.anims.generateFrameNames('caro-boss', {
        prefix: 'idle-',
        end: 3
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss4-death',
      frames: this.scene.anims.generateFrameNames('caro-boss', {
        prefix: 'death-',
        end: 9
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
      this.scene.sound.stopByKey('stepsAudio')
      this.scene.sound.play('stepsAudio', { volume: 0.08, loop: false })
    })
  }

  update () {
    if (this.active && this.hp > 0) {
      this.anims.play('idle-caro-boss', true)
    }
  }
}
