import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.add.text(20, 20, 'Loading...');

    // Backgrounds
    this.load.image('bg0', 'assets/bg/bg0.png');

    // Object
    this.load.image('rainbowBit', 'assets/items/rainbow-bit.png');

    // Characters
    this.load.image('defaultShip', 'assets/ships/ship1/head.png');
    this.load.image('defaultTrail', 'assets/ships/ship1/body.png');
  }

  create() {
    this.scene.start('map1');
  }
}

export default Preload;
