import { Scene } from 'phaser'

export class Title extends Scene {
  constructor () {
    super('title-scene')
  }

  create () {
    this.add.image(480, 260, 'titleBg').setScale(3.6)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.add.image(480, 100, 'game-logo').setScale(0.34)
    const start = this.add.sprite(490, 430, 'start-game').setScale(0.4).setInteractive()

    start.on('pointerover', () =>
      start.setTint(0xff0000a160))

    start.on('pointerdown', () =>
      this.scene.start('level-3-scene'), console.log('loading scene 1'))

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

  }
}
