import FpsText from '../objects/fpsText'
export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this);

    this.add.image(330, 200, 'background');
    this.add.image(800, 500, 'layer_7');
    // this.add.image(260, 0, 'layer_6');
    // this.add.image(260, 0, 'layer_5');
    this.add.image(330, 200, 'layer_2');
    this.add.image(330, 200, 'layer_1');
    // this.add.image(260, 0, 'layer_4');
    this.add.image(window.innerWidth + 100, 200, 'title')
    this.add.image(window.innerWidth + 100, 450, 'start-btn')
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


