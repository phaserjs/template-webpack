import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class TempBoss2 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'golem-idle')

    this.setScale(2)
    this.setSize(40, 50)
    this.setOffset(49, 60)
    this.setAnims()

    this.name = 'tempBoss2'

    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)

    this.setColliders(scene)
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
        end: 15
      }),
      frameRate: 14,
      repeat: -1
    })

    // run
    this.scene.anims.create({
      key: 'golem-walk',
      frames: this.scene.anims.generateFrameNames('golem-walk', {
        prefix: 'walk-',
        end: 15
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
      // this.anims.play('tempBoss2-death', true)
      // this.anims.play('golem-run', true)
      // this.anims.play('golem-idle', true)
      this.anims.play('golem-atk', true)
    }
  }
}
