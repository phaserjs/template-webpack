import { Scene } from 'phaser'

export class Death extends Scene {
  constructor () {
    super('death-scene')
  }

  create () {
    // Load image assets for title screen
    this.add.image(480, 260, 'deathBg').setScale(3.6)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.add.image(500, 230, 'death-text').setScale(0.8)
    const restart = this.add.sprite(490, 460, 'play-again').setScale(0.4).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    restart.on('pointerdown', () =>
      this.scene.start(this.scene), console.log('loading scene 1'))

    restart.on('pointerover', () =>
      restart.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      restart.clearTint())

    tree.on('pointerover', () =>
      restart.clearTint())

    mount.on('pointerover', () =>
      restart.clearTint())

    farMount.on('pointerover', () =>
      restart.clearTint())
  }
}
