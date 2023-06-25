import Phaser, { GameObjects } from "phaser";

export default class Text extends GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      fontSize: 'calc(100vw / 25)',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4
    });
    this.setOrigin(0, 0)
    scene.add.existing(this)
  }
}