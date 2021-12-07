import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss1 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'duck-boss')

    // for old boss
    // this.setScale(10)
    // this.setSize(30, 30)
    // this.setOffset(50, 3)

    this.setAnims()
    this.hp = 100
    this.maxHealth = 100
    this.name = 'boss1'
    const tempConfig = {
      w: 128,
      h: 128,
      xOff: 0,
      yOff: 0,
      scale: 0.3,
      frameEnds: {
        run: 3
      }
    }
    this.spawner = new MobSpawner(this.scene, 50, -30, 'bear-boss', tempConfig)
    this.scene.add.existing(this.spawner)
    console.log(this)
    this.setColliders(scene)
  }

  setAnims () {
    this.scene.anims.create({
      key: 'boss1-idle',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'idle-',
        end: 1
      }),
      frameRate: 12,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss1-run',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'run-',
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'boss1-death',
      frames: this.scene.anims.generateFrameNames('duck-boss', {
        prefix: 'death-',
        end: 2
      }),
      frameRate: 3,
      repeat: 0
    })
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this.scene.player, this)
    scene.physics.world.addCollider(this, this.scene.platforms)
    scene.physics.world.addCollider(this.spawner, this.spawner)
    scene.physics.world.addOverlap(scene.player.gun, this, (boss, bullet) => {
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.spawner.spawnMob(this.x, this.y)
      this.getDamage(10)
      this.scene.sound.play('enemyDamage', { loop: false })
      scene.enemyHealthBar.scaleX = (this.hp / this.maxHealth)
      scene.enemyHealthBar.x -= (this.hp / this.maxHealth) - 1
      bullet.destroy()
    })
  }

  update () {
    this.checkFlip()
    if (this.active && this.hp < 40 && this.hp > 0) {
      // for the lols
      // this.anims.play('jared-walk', true)
      // this.body.setSize(55, 80)
      // this.body.setOffset(5, 0)
      // this.setScale(5)
      this.anims.play('boss1-run', true)
    } else if (this.active && this.hp > 0) {
      if (this.body.velocity.x > 0) {
        this.body.velocity.x -= 10
      } else if (this.body.velocity.x < 0) {
        this.body.velocity.x += 10
      }
      this.anims.play('boss1-idle', true)
    }
  }
}
