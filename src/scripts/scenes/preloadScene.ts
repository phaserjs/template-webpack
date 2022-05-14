export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
    this.load.image('background', 'assets/img/background/layer_08_1920 x 1080.png')
    this.load.image('layer_1', 'assets/img/background/layer_01_1920 x 1080.png')
    this.load.image('layer_2', 'assets/img/background/layer_02_1920 x 1080.png')
    this.load.image('layer_3', 'assets/img/background/layer_03_1920 x 1080.png')
    this.load.image('layer_4', 'assets/img/background/layer_04_1920 x 1080.png')
    this.load.image('layer_5', 'assets/img/background/layer_05_1920 x 1080.png')
    this.load.image('layer_6', 'assets/img/background/layer_06_1920 x 1080.png')
    this.load.image('layer_7', 'assets/img/background/layer_07_1920 x 1080.png')
    // this.load.image('layer_8', 'assets/img/background/layer_1920 x 1080.png')
    
    this.load.image('title', 'assets/img/Menu/Bug-buster.png')
    this.load.image('start-btn', 'assets/img/Menu/start.png')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
