import { Scene } from 'phaser'

export class Title extends Scene {
  constructor () {
    super('title-scene')
  }

  create () {
    // Test tool to allow loading of any scene from title screen
    this.scene1 = this.input.keyboard.addKey('ONE')
    this.scene2 = this.input.keyboard.addKey('TWO')
    this.scene3 = this.input.keyboard.addKey('THREE')
    this.scene4 = this.input.keyboard.addKey('FOUR')
    this.scene5 = this.input.keyboard.addKey('FIVE')

    // Load image assets for title screen
    this.add.image(480, 260, 'titleBg').setScale(3.6)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.add.image(480, 100, 'game-logo').setScale(0.34)
    const start = this.add.sprite(490, 430, 'start-game').setScale(0.4).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    start.on('pointerdown', () =>
      this.scene.start('level-4-scene'), console.log('loading scene 1'))

    start.on('pointerover', () =>
      start.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      start.clearTint())

    tree.on('pointerover', () =>
      start.clearTint())

    mount.on('pointerover', () =>
      start.clearTint())

    farMount.on('pointerover', () =>
      start.clearTint())
  }

  update () {
    if (this.scene1.isDown) {
      this.scene.start('level-1-scene')
    }
    if (this.scene2.isDown) {
      this.scene.start('level-2-scene')
    }
    if (this.scene3.isDown) {
      this.scene.start('level-3-scene')
    }
    if (this.scene4.isDown) {
      this.scene.start('level-4-scene')
    }
    if (this.scene5.isDown) {
      this.scene.start('level-5-scene')
    }
  }
}
