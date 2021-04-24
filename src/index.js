import Phaser from 'phaser';
import player from './player';
import preload from './preloader';

class MyGame extends Phaser.Scene {

  constructor() {
    super();
    this.player;
  }

  preload() {
    preload.call(this);
  }

  create() {
    this.player = new player(this, 100, 75);
  }

  update() {

  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scale: {
    //mode: Phaser.Scale.FIT,
    width: 200,
    height: 150,
    zoom: 4
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: MyGame
};

const game = new Phaser.Game(config);
