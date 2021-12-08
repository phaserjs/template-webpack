import { Scene } from 'phaser'
var iter = 0
export class Credits extends Scene {
  constructor () {
    super('credits-scene')
  }

  create () {
    this.cameraSetup()
    // Load image assets for title screen
    this.add.image(480, 260, 'winBg').setScale(3.6)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.text = this.add.tileSprite(490, 0, 950, 2160, 'credits-text').setScale(0.8)
    const home = this.add.sprite(920, 500, 'arrow').setScale(0.08).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    home.on('pointerdown', () =>
      this.scene.start('title-scene'), console.log('loading title'))

    home.on('pointerover', () =>
      home.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      home.clearTint())

    tree.on('pointerover', () =>
      home.clearTint())

    mount.on('pointerover', () =>
      home.clearTint())

    farMount.on('pointerover', () =>
      home.clearTint())
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    // this.physics.world.setBounds(0, 0, 950, 2160)
    this.cameras.main.setBounds(0, 0, 950, 2160)
    this.cameras.main.setScroll(0, 1)
  }

  moveSprite () {
    this.scene.text.x += 8
  }

  update () {
    this.text.tilePositionY = iter * 100
    iter += 0.01
  }
}
