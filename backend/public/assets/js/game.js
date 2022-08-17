let game, scores;
class Highscore extends Phaser.Scene {
  constructor() {
    super({
      key: 'Highscore',
      active: true
    });
    this.scores = [];
  }
  preload() {
    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
  }
  create() {
    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    for (let i = 1; i < 6; i++) {
      if (scores[i-1]) {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${scores[i-1].highScore}    ${scores[i-1].name}`).setTint(0xffffff);
      } else {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
      }
    }
  }
}
let config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [Highscore]
};
$.ajax({
  type: 'GET',
  url: '/scores',
  success: function(data) {
    game = new Phaser.Game(config);
    scores = data;
  },
  error: function(xhr) {
    console.log(xhr);
  }
});