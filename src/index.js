import 'phaser';
import Map1 from './scenes/map1.js';
import Preload from './scenes/preload.js';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Preload, Map1],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
