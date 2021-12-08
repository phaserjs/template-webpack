import { Physics } from 'phaser'

export class BossHpTrigger extends Physics.Arcade.Sprite {
  constructor (scene, x, y, config) {
    super(scene, x, y)
    scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.setImmovable(true)

    const triggerZone = scene.physics.world.addOverlap(this, this.scene.player, () => {
      this.scene.enemyHealthBar = this.scene.add.image(875, 32, 'enemy-shadow-bar').setScrollFactor(0)
      this.scene.add.image(875, 20, 'enemy-red-bar').setScrollFactor(0)
      this.scene.add.text(675, 38, 'Boss Health', { fontSize: '20px', fill: '#ffffff' }).setScrollFactor(0)
      this.scene.physics.world.removeCollider(triggerZone)
    })

    this.setSize(28, 65)
  }

  update () {
    // this.anims.play('portal', true)
  }
}
