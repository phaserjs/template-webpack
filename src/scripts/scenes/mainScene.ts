import FpsText from '../objects/fpsText'
export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this);

    this.add.image(400, 300, 'background');
    this.add.image(window.innerWidth + 120, 200, 'title')
    this.add.image(window.innerWidth + 120, 450, 'start-btn')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.start('Level_1')
 })


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


