import Phaser from 'phaser';
import bg0Image from '../../assets/bg/bg0.png';
import rainbowBitImage from '../../assets/items/rainbow-bit.png';
import defaultShipImage from '../../assets/ships/ship1/head.png';
import defaultTrailImage from '../../assets/ships/ship1/body.png';

class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.add.text(20, 20, 'Loading...');

    // Backgrounds
    this.load.image('bg0', bg0Image);

    // Object
    this.load.image('rainbowBit', rainbowBitImage);

    // Characters
    this.load.image('defaultShip', defaultShipImage);
    this.load.image('defaultTrail', defaultTrailImage);
  }

  create() {
    this.scene.start('map1');
  }
}

export default Preload;
