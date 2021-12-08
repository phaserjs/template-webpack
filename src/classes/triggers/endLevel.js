import { Physics } from 'phaser'

export class Trigger extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.setImmovable(true)
    this.body.setSize(45, 80)
    this.body.setOffset(45, 22)
    this.setScale(0.8)

    this.setColliders(scene)
    this.setVisible(true)
    this.setActive(true)
    // this.scene.add.image(875, 20, 'static-portal').setScrollFactor(0)

    this.scene.anims.create({
      key: 'portal-idle',
      frames: this.scene.anims.generateFrameNames('end-level', {
        prefix: 'idle-',
        end: 4
      }),
      framerate: 1.25
    })

    const triggerZone = scene.physics.world.addOverlap(this, this.scene.player, () => {
      this.scene.time.addEvent({
        delay: 2500,
        callback: () => this.scene.changeScene()
      })

      this.scene.physics.world.removeCollider(triggerZone)
    })
  }

  update () {
    if (this.active) {
      console.log('Sup g')
      this.anims.play('portal-idle', true)
    }
  }

  setColliders (scene) {
    scene.physics.world.addCollider(this, scene.wall)
    scene.physics.world.addCollider(this, scene.jumpLayer)
    scene.physics.world.addCollider(this, scene.water, () => {
      this.destroy()
    })
  }
}
