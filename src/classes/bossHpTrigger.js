import { Physics } from 'phaser'

export class BossHpTrigger extends Physics.Arcade.Sprite {
  constructor (scene, x, y, config) {
    super(scene, x, y)
    scene.physics.add.existing(this)
    this.body.allowGravity = false
    this.body.setImmovable(true)

    const triggerZone = scene.physics.world.addOverlap(this, this.scene.player, () => {
      this.scene.enemyHealthBar = this.scene.add.image(config.healthBarX, config.healthBarY + 12, 'enemy-shadow-bar')
      this.scene.add.image(config.healthBarX, config.healthBarY, 'enemy-red-bar')
      this.scene.add.text(config.healthBarX - 200, config.healthBarY + 18, 'Boss Health', { fontSize: '20px', fill: '#ffffff' })
      this.scene.physics.world.removeCollider(triggerZone)
    })

    this.setSize(28, 65)
  }

  update () {
    this.anims.play('portal', true)
  }
}
