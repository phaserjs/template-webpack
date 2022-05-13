import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    var style = { font: "bold 100px GlitchFont", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    this.fpsText = new FpsText(this);

    this.add.image(400, 300, 'background');
    this.add.text(window.innerWidth - 200, 200, 'Angry Dev', style)


    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`
      )
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }
}

// TODO make this mine 
// add new font and use
