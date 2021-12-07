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
    const credit = this.add.sprite(875, 30, 'credits-button').setScale(0.15).setInteractive()
    const start = this.add.sprite(490, 430, 'start-game').setScale(0.4).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    start.on('pointerdown', () =>
      this.scene.start('controls-scene'), console.log('loading controls'))

    credit.on('pointerdown', () =>
      this.scene.start('credits-scene'), console.log('loading credits'))

    start.on('pointerover', () =>
      start.setTint(0xff0000a160))

    credit.on('pointerover', () =>
      credit.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      start.clearTint())

    fore.on('pointerover', () =>
      credit.clearTint())

    tree.on('pointerover', () =>
      start.clearTint())

    tree.on('pointerover', () =>
      credit.clearTint())

    mount.on('pointerover', () =>
      start.clearTint())

    mount.on('pointerover', () =>
      credit.clearTint())

    farMount.on('pointerover', () =>
      start.clearTint())

    farMount.on('pointerover', () =>
      credit.clearTint())
  }

  update () {
    if (this.scene1.isDown) {
      this.scene.start('level-1-scene')
      this.sound.stopByKey('titleAudio')
    }
    if (this.scene2.isDown) {
      this.scene.start('level-2-scene')
      this.sound.stopByKey('titleAudio')
    }
    if (this.scene3.isDown) {
      this.scene.start('level-3-scene')
      this.sound.stopByKey('titleAudio')
    }
    if (this.scene4.isDown) {
      this.scene.start('level-4-scene')
      this.sound.stopByKey('titleAudio')
    }
    if (this.scene5.isDown) {
      this.scene.start('level-5-scene')
      this.sound.stopByKey('titleAudio')
    }
  }
}
