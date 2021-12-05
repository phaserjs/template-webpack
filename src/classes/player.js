import { Actor } from './actor'

export class Player extends Actor {
  constructor (scene, x, y) {
    super(scene, x, y, 'adventurer')

    this.keyW = this.scene.input.keyboard.addKey('W')
    this.keyA = this.scene.input.keyboard.addKey('A')
    this.keyS = this.scene.input.keyboard.addKey('S')
    this.keyD = this.scene.input.keyboard.addKey('D')
    this.keyShoot = this.scene.input.keyboard.addKey('SPACE')

    this.setScale(0.5)

    this.godMode = false

    this.name = 'player'

    this.speed = 220
    this.jump = 220

    this.canShoot = true
    this.canJump = true

    this.body.setSize(55, 85)
    this.body.setOffset(82, 55)

    this.initAnimations()
  }

  fire () {
    if (this.flipX) {
      this.scene.bulletGroup.fireBullet(this.x - 20, this.y, this.flipX)
    } else {
      this.scene.bulletGroup.fireBullet(this.x + 20, this.y, this.flipX)
    }
  }

  initAnimations () {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'idle-',
        end: 5
      }),
      frameRate: 12
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
        end: 3
      }),
      frameRate: 12
    })

    this.scene.anims.create({
      key: 'player-death',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'death-',
        end: 6
      }),
      framerate: 12,
      repeat: 0
    })
  }

  hitGround () {
    return !this.canJump
  }

  checkGodMode () {
    if (this.godMode) {
      this.speed = 440
      this.jump = 300
    } else {
      this.speed = 220
      this.jump = 220
    }
  }

  update () {
    this.checkGodMode()

    if (this.active) {
      this.setVelocityX(0)
      this.body.setOffset(82, 55)

      if (this.keyShoot.isDown && this.canShoot) {
        this.canShoot = false
        this.fire()
      }

      if (this.keyShoot.isUp) {
        this.canShoot = true
      }
      if (this.keyW.isDown && this.canJump) {
        if (!this.godMode) {
          this.canJump = false
        }
        this.body.velocity.y = -this.jump
      }

      if (this.keyA.isDown) {
        this.anims.play('run', true)
        this.body.velocity.x = -this.speed
        this.checkFlip()
        this.body.setOffset(95, 55)
      } else if (this.keyD.isDown) {
        this.anims.play('run', true)
        this.body.velocity.x = this.speed
        this.checkFlip()
      } else {
        this.anims.play('idle', true)
        if (this.flipX) {
          this.body.setOffset(95, 55)
        }
      }
    }
  }
}
