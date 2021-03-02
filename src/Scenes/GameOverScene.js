/* eslint-disable */
import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';
import { save } from '../Objects/apiScore';
import 'regenerator-runtime';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get('World');
  }

  preload() {
    this.load.image('gameOverTitle', 'assets/ui/blue_button02.png');
    this.load.image('bg', 'assets/bg.png');
  }

  async create() {
    const user = this.sys.game.globals.model.userName;

    this.add.image(this.game.config.width * 0.5, 240, 'bg').setScale(0.35);

    this.score = this.add.text(230, 30,
      `${user}, your score is: ${this.sys.game.globals.model.score}`, {
      fontSize: 24,
      fontStyle: 'bold',
      color: '#dddddd',
      align: 'center',
    });

    await save(this.model.userName, this.model.score);

    this.gameButton = new Button(this, 400, (config.height / 2) + 170,
      'blueButton1', 'blueButton2', 'Submit', 'Score');
  }
}