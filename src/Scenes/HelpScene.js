/* eslint-disable */ 
import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.textKeys = this.add.text(325, 100, 'Key Controls', { fontSize: 20 });

    this.upKey = new Button(this, 400, 160, 'up', 'up');
    this.leftKey = new Button(this, 350, 185, 'left', 'left');
    this.rightKey = new Button(this, 450, 185, 'right', 'right');

    this.textInstructions = this.add.text(210, 270,
      'Use the left right keys to move'
      + '\nUse the Up key to jump',
      +'\ntry collect coins without touch fire',
      { fontSize: 20 });

    this.menuButton = new Button(this, 400, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.intro = this.add.text(215, 400, ' your pseudoname: ', { fontSize: 22 });

    const input = this.add.dom(510, 410, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
    });
    input.scaleX = 0.4;
    input.scaleY = 0.6;
    const style = 'background: url(assets/ui/blue_button02.png); border-radius: 5px; color: #fff;';
    const gameButton = this.add.dom(615, 412, 'button', style, 'Play');
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.userName = input.node.value;
        this.scene.start('World');
      }
    });
  }
}
