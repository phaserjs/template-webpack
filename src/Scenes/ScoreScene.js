import Phaser from 'phaser';
import Button from '../Objects/Button';
import { get } from '../Objects/apiScore';
import 'regenerator-runtime';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  async create() {
    this.add.text(400, 100, 'Leader Board', {
      color: 'white',
      fontSize: '32px ',
    }).setOrigin(0.5, 0.5);

    const data = (await get()).data.result;
    const leaderBoard = data.sort((x, y) => y.score - x.score);
    const scoreStyle = {
      color: 'white',
      fontSize: '32px ',
    };
    for (let i = 0; i < 10; i += 1) {
      if (leaderBoard[i] !== undefined) {
        this.add.text(60, 170 + (i * 30),
          `${i + 1}. Name: ${leaderBoard[i].user} -- Score: ${leaderBoard[i].score}`,
          scoreStyle);
      }
    }

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Restart', 'Title');

    this.menuButton.on('click', () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      this.scene.start('Title');
    });
  }
}
