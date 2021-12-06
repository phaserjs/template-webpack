import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class TempBoss3 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'gen-mob-3')

    this.setScale(5)
    this.setSize(12, 16)
    this.setOffset(14, 5)
    this.setAnims()

    this.name = 'tempBoss3'

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
  }

  setAnims () {
    // idle
    this.scene.anims.create({
      key: 'temp3-idle',
      frames: this.scene.anims.generateFrameNames('gen-mob-3', {
        prefix: 'idle-',
        end: 4
      }),
      frameRate: 8,
      repeat: -1
    })

    // atk
    this.scene.anims.create({
      key: 'temp3-atk',
      frames: this.scene.anims.generateFrameNames('gen-mob-3', {
        prefix: 'atk-',
        end: 6
      }),
      frameRate: 12,
      repeat: -1
    })

    // run
    this.scene.anims.create({
      key: 'temp3-run',
      frames: this.scene.anims.generateFrameNames('gen-mob-3', {
        prefix: 'run-',
        end: 6
      }),
      frameRate: 12,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'tempBoss3-death',
      frames: this.scene.anims.generateFrameNames('gen-mob-3', {
        prefix: 'death-',
        end: 8
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
      this.anims.play('tempBoss3-death', true)
      // this.anims.play('temp-run', true)
      // this.anims.play('temp-idle', true)
      // this.anims.play('temp3-atk', true)
    }
  }
}
