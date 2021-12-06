import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class TempBoss4 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'gen-mob-4')

    this.setScale(5)
    this.setSize(16, 16)
    this.setOffset(73, 69)
    this.setAnims()

    this.name = 'tempBoss4'

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
    this.body.setAllowGravity(false)
  }

  setAnims () {
    // atk
    this.scene.anims.create({
      key: 'temp4-atk',
      frames: this.scene.anims.generateFrameNames('gen-mob-4', {
        prefix: 'atk-',
        end: 6
      }),
      frameRate: 12,
      repeat: -1
    })

    // run
    this.scene.anims.create({
      key: 'temp4-run',
      frames: this.scene.anims.generateFrameNames('gen-mob-4', {
        prefix: 'fly-',
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    })

    // death
    this.scene.anims.create({
      key: 'tempBoss4-death',
      frames: this.scene.anims.generateFrameNames('gen-mob-4', {
        prefix: 'death-',
        end: 4
      }),
      frameRate: 8
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
      // this.anims.play('tempBoss4-death', true)
      this.anims.play('temp4-run', true)
      // this.anims.play('temp-idle', true)
      // this.anims.play('temp4-atk', true)
    }
  }
}
