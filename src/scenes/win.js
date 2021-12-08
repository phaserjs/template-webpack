import { Scene } from 'phaser'

export class Win extends Scene {
  constructor () {
    super('win-scene')
  }

  create () {
    this.sound.stopAll()
    this.sound.add('titleAudio', { loop: true })
    this.sound.play('titleAudio')
    // Load image assets for title screen
    this.add.image(480, 260, 'winBg').setScale(2)
    const farMount = this.add.image(490, 260, 'titleFarMount').setScale(3.6).setInteractive()
    const mount = this.add.image(490, 400, 'titleMount').setScale(3.6).setInteractive()
    const tree = this.add.image(490, 310, 'titleTrees').setScale(3.6).setInteractive()
    const fore = this.add.image(400, 310, 'titleForeground').setScale(3.6).setInteractive()
    this.add.image(480, 250, 'win-text').setScale(0.8)
    const banana = this.add.sprite(100, 330, 'banana').setScale(0.3).setInteractive()
    const arrow = this.add.sprite(900, 480, 'arrow').setScale(0.1).setInteractive()
    const credit = this.add.sprite(875, 30, 'credits-button').setScale(0.15).setInteractive()

    // Detect when pointer is hovering over button, and change scene on click
    banana.on('pointerdown', () => {
      banana.destroy()
      this.add.text(100, 450, 'You disrespectful fool! You murdered our banana!', { fontFamily: 'Press Start 2P', fontsize: '40px' })
    })
    credit.on('pointerdown', () =>
      this.scene.start('credits-scene'), console.log('loading credits'))

    credit.on('pointerover', () =>
      credit.setTint(0xff0000a160))

    fore.on('pointerover', () =>
      credit.clearTint())

    tree.on('pointerover', () =>
      credit.clearTint())

    mount.on('pointerover', () =>
      credit.clearTint())

    farMount.on('pointerover', () =>
      credit.clearTint())

    arrow.on('pointerdown', () =>
      this.scene.start('title-scene'), console.log('title'))

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
