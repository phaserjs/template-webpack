import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/zenva_logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}