import { Physics } from 'phaser'

export class Trigger extends Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'adventurer')
    scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.setImmovable(true)

    const triggerZone = scene.physics.world.addOverlap(this, this.scene.player, () => {
      this.scene.time.addEvent({
        delay: 2500,
        callback: () => this.scene.changeScene()
      })

      this.scene.physics.world.removeCollider(triggerZone)
    })

    this.setSize(28, 65)
  }
}
