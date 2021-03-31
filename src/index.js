import Phaser from 'phaser';
import Zone from '../src/entity/Zone';

class MyGame extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    for (let i = 1; i <= 4; i++) {
      this.load.image(`block${i}`, `public/assets/block${i}.png`);
    }
  }

  generateBlock(x, y, blockName) {
    return this.matter.add.image(x, y, blockName).setInteractive();
  }

  create() {
    this.zone = new Zone(this);
    this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);
    this.outlineOne = this.zone.renderOutline(this.dropZOne, 0xff09d2);

    const block4 = this.generateBlock(490, 1900, 'block4');
    const block2 = this.generateBlock(block4.x + 105, 1900, 'block2');
    const block1 = this.generateBlock(block2.x + 105, 1900, 'block1');
    const block3 = this.generateBlock(block1.x + 105, 1900, 'block3');

    this.input.dragDistanceThreshold = 0;

    this.cameras.main.setBounds(45, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.cameras.main.setBounds(0, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.startFollow(block4);

    let draggableBlocks = [block1, block2, block3, block4];
    this.input.setDraggable(draggableBlocks);

    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint();
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 2 },
      debug: false,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
