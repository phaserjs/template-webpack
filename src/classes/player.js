import { Actor } from './actor'
import { Gun } from './groups/gun'

export class Player extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'wizard')
    this.maxHealth = 100
    this.keyW = this.scene.input.keyboard.addKey('W')
    this.keyA = this.scene.input.keyboard.addKey('A')
    this.keyS = this.scene.input.keyboard.addKey('S')
    this.keyD = this.scene.input.keyboard.addKey('D')
    this.keyShoot = this.scene.input.keyboard.addKey('SPACE')

    this.gun = new Gun(this.scene, x, y - 300, 200)

    this.setScale(0.5)

    this.godMode = false

    this.name = 'player1'

    this.speed = 220
    this.jump = 220

    this.canShoot = true
    this.canJump = true

    this.body.setSize(55, 85)
    this.body.setOffset(82, 55)

    this.initAnimations()
    this.setColliders()
    this.scene.sound.add('stepsAudio')
    this.scene.sound.add('playerFireAudio')
  }

  fire () {
    this.anims.play('attack', true)
    this.once('animationcomplete', () => {
      if (this.body.velocity.x < 30 || this.body.velocity.x > -30) {
        this.anims.play('idle', false)
      } else {
        this.anims.play('run', false)
      }
    })
    this.scene.sound.play('playerFireAudio', { volume: 0.8, loop: false })
    const config = {
      playerGun: true
    }
    this.gun.fireBullet(this.x, this.y, this.flipX, config)
  }

  initAnimations () {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'idle-',
        end: 4
      }),
      frameRate: 12,
      repeat: true
    })

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'run-',
        end: 7
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: 'attack',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'atk-',
        end: 7
      }),
      duration: 400,
      repeat: false
    })

    this.scene.anims.create({
      key: 'player1-death',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'death-',
        end: 6
      }),
      duration: 1000
    })

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'jump-',
        end: 1
      }),
      frameRate: 12
    })
  }

  setColliders () {
    this.scene.physics.world.addCollider(this, this.scene.walls)

    this.scene.physics.world.addCollider(this, this.scene.jumpLayer, () => {
      this.canJump = true
    })
    const waterCollider = this.scene.physics.world.addCollider(this, this.scene.water, () => {
      this.getDamage(100)
      this.scene.physics.world.removeCollider(waterCollider)
    })
    this.scene.physics.world.addCollider(this.gun, this.scene.walls, (bullet) => {
      bullet.destroy()
    })
    this.scene.physics.world.addCollider(this.gun, this.scene.jumpLayer, (bullet) => {
      bullet.destroy()
    })
  }

  hitGround () {
    return !this.canJump
  }

  checkGodMode () {
    if (this.godMode) {
      this.speed = 660
      this.jump = 400
    } else {
      this.speed = 220
      this.jump = 220
    }
  }

  die () {
    this.setVelocityX(0)
    this.anims.play(this.name + '-death', true)
    this.once('animationcomplete', () => {
      console.log('animationcomplete')
      this.scene.scene.start('death-scene', { checkpoint: this.scene.sceneNum })
    })
  }

  update () {
    this.checkGodMode()

    if (this.active) {
      this.setVelocityX(0)
      this.body.setOffset(82, 55)

      if (this.keyShoot.isUp) {
        this.canShoot = true
      }
      if (this.keyW.isDown && this.canJump) {
        if (!this.godMode) {
          this.canJump = false
        }
        this.body.velocity.y = -this.jump
      }
      if (this.keyS.isDown && this.godMode) {
        this.body.velocity.y = this.jump
      }

      if (this.keyShoot.isDown) {
        if (this.canShoot) {
          this.fire()
        }
        this.canShoot = false
      }

      if (this.keyA.isDown) {
        if (this.canShoot) {
          this.anims.play('run', true)
        }
        this.body.velocity.x = -this.speed
        this.checkFlip()
        this.body.setOffset(95, 55)
      } else if (this.keyD.isDown) {
        if (this.canShoot) {
          this.anims.play('run', true)
        }
        this.body.velocity.x = this.speed
        this.checkFlip()
      } else if (this.canShoot) {
        this.anims.play('idle', true)

        if (this.flipX) {
          this.body.setOffset(95, 55)
        }
      }
    }
  }
}
