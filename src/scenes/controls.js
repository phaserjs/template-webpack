import { Scene } from 'phaser'

export class Controls extends Scene {
  constructor () {
    super('controls-scene')
  }

  create () {
    // Load image assets for title screen
    this.add.image(480, 260, 'deathBg').setScale(3.6)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.add.image(475, 260, 'controlsIntro')
    const arrow = this.add.sprite(900, 480, 'arrow').setScale(0.1).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    arrow.on('pointerdown', () =>
      this.scene.start('level-1-scene'), console.log('loading scene 1'))

    arrow.on('pointerover', () =>
      arrow.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      arrow.clearTint())

    tree.on('pointerover', () =>
      arrow.clearTint())

    mount.on('pointerover', () =>
      arrow.clearTint())

    farMount.on('pointerover', () =>
      arrow.clearTint())
  }
}
