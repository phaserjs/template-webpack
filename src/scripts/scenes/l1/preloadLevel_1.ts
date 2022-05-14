export default class PreloadLevel_1 extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadLevel_1' })
  }

  preload() {
    this.load.image('background', 'assets/img/background/Background 07/PARALLAX/layer_08_2048 x 1546.png')
  }

  create() {
    this.scene.start('Level_1')
  }
}
