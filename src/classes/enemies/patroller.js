import { GameObjects, Math } from 'phaser'
import { Gun } from '../groups/gun'

export class Patroller extends GameObjects.PathFollower {
  constructor (scene, path, x, y, texture) {
    super(scene, path, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false

    this.gun = new Gun(this.scene, x, y - 400, true, 1000)
    this.name = texture
    this.setColliders(scene)
    this.setAnims()

    this.scene.time.addEvent({
      callback: this.fireGun,
      callbackScope: this,
      delay: 500,
      loop: true
    })
  }

  die () {
    this.anims.play(this.name + '-death', true)
    this.once('animationcomplete', () => {
      console.log('animationcomplete')
      this.destroy()
    })
  }

  setAnims () {
    this.scene.anims.create({
      key: 'adventurer-death',
      frames: this.scene.anims.generateFrameNames('player', {
        prefix: 'death-',
        end: 6
      }),
      framerate: 12
    })
  }

  setColliders (scene) {
    scene.physics.world.addOverlap(scene.player, this, (player) => {
      player.getDamage(20)
      console.log(this.scene.playerHealthBar)
      this.scene.playerHealthBar.scaleX = (this.scene.player.hp / this.scene.player.maxHealth)
      this.scene.playerHealthBar.x -= (this.scene.player.hp / this.scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { loop: false })
      this.die()
    })

    scene.physics.world.addOverlap(scene.player, this.gun, (player, bullet) => {
      player.getDamage(10)
      scene.playerHealthBar.scaleX = (scene.player.hp / scene.player.maxHealth)
      scene.playerHealthBar.x -= (scene.player.hp / scene.player.maxHealth) - 1
      scene.sound.play('playerDamageAudio', { loop: false })
      bullet.destroy()
    })

    scene.physics.world.addOverlap(scene.player.gun, this, (mob, bullet) => {
      bullet.destroy()
      this.destroy()
    })
  }

  fireGun () {
    if (this.active && this.scene.player.active && Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 350) {
      this.gun.fireBullet(this.x, this.y, this.flipX, true)
    }
  }

  update () {

  }
}
