import { Actor } from '../actor'
import { MobSpawner } from '../groups/mob-spawner'

export class Boss1 extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'enemy')
    
    this.setScale(10)
    this.setSize(30, 30)
    this.setOffset(50, 3)
    this.setAnims()

    this.name = 'boss'
    
    this.spawner = new MobSpawner(this.scene, 50, -30)
    this.scene.add.existing(this.spawner)
    
    this.setColliders(scene)
   
  }

  setAnims () {
    this.scene.anims.create({
      key: 'idle-enemy',
      frames: this.scene.anims.generateFrameNames('enemy', {
        prefix: 'idle-',
        end: 4
      }),
      frameRate: 12,
      repeat: -1
    })
    this.scene.anims.create({
      key: 'boss-death',
      frames: this.scene.anims.generateFrameNames('enemy', {
        prefix: 'death-',
        end: 4
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
      this.anims.play('idle-enemy', true)
    }
  }
}
