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
    this.load.atlas(
      'monkey',
      'public/assets/monkey.png',
      'public/assets/monkey.json'
    );

    this.load.image('tiles', 'public/assets/platformersheet.png');
    this.load.image('tilesbg', 'public/assets/backgroundColorForest.png');

    this.load.tilemapTiledJSON('tilemap', 'public/assets/levelOne.json');

    for (let i = 1; i <= 15; i++) {
      this.load.image(`block${i}`, `public/assets/block${i}.png`);
    }
  }

  generateBlock(x, y, blockName) {
    return this.matter.add
      .image(x, y, blockName)
      .setInteractive()
      .setFixedRotation();
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('levelOne', 'tiles');
    const backgroundSet = map.addTilesetImage('forestBackground', 'tilesbg');
    const ground = map.createLayer('ground', tileset);

    const background = map.createLayer('background', backgroundSet);
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);
    this.matter.world.convertTilemapLayer(background);

    this.zone = new Zone(this);
    this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);
    this.outlineOne = this.zone.renderOutline(this.dropZOne, 0xff09d2);

    this.monkey = this.matter.add
      .sprite(105, 1700, 'monkey')
      .setScale(0.75)
      .setFixedRotation();

    const block4 = this.generateBlock(490, 1900, 'block4');
    const block2 = this.generateBlock(block4.x + 105, 1900, 'block2');
    const block1 = this.generateBlock(block2.x + 105, 1900, 'block1');
    const block3 = this.generateBlock(block1.x + 105, 1900, 'block3');
    const block7 = this.generateBlock(1520, 1800, 'block7');
    const block6 = this.generateBlock(block7.x + 120, 1800, 'block6');
    const block5 = this.generateBlock(block6.x + 120, 1800, 'block5');
    const block9 = this.generateBlock(block5.x + 120, 1800, 'block9');
    const block8 = this.generateBlock(block9.x + 120, 1800, 'block8');

    const block15 = this.generateBlock(4028, 1600, 'block15');
    const block10 = this.generateBlock(block15.x + 80, 1600, 'block10');
    const block14 = this.generateBlock(block10.x + 80, 1600, 'block14');
    const block11 = this.generateBlock(block14.x + 80, 1600, 'block11');
    const block13 = this.generateBlock(block11.x + 80, 1600, 'block13');
    const block12 = this.generateBlock(block13.x + 80, 1600, 'block12');

    this.input.dragDistanceThreshold = 0;

    let draggableBlocks = [
      block1,
      block2,
      block3,
      block4,
      block5,
      block6,
      block7,
      block8,
      block9,
      block10,
      block11,
      block12,
      block13,
      block14,
      block15,
    ];
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

    this.cameras.main.startFollow(this.monkey);
    this.cameras.main.setBounds(45, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.matter.world.setBounds(0, 0, 2150 * 3, 1080 * 2);
    this.createMonkeyAnimations();
  }

  update() {
    //moves our character left, right, and jumping
    const speed = 10;
    const monkey = this.monkey;
    if (this.cursors.left.isDown) {
      monkey.flipX = true;
      monkey.setVelocityX(-speed);
      monkey.play('run', true);
    } else if (this.cursors.right.isDown) {
      monkey.flipX = false;
      monkey.setVelocityX(speed);
      monkey.play('run', true);
    } else {
      monkey.setVelocityX(0);
      monkey.play('idle', true);
    }

    // const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    // if (justPressedSpace) {
    //   this.monkey.setVelocityY(-15);
    // }

    const justPressedSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (justPressedSpace && this.monkey.body.velocity.y === 0) {
      this.monkey.play('jump', true);
      this.monkey.setVelocityY(-15);
    }
  }

  createMonkeyAnimations() {
    this.anims.create({
      key: 'run',
      frameRate: 10,
      frames: this.anims.generateFrameNames('monkey', {
        start: 1,
        end: 8,
        prefix: 'monkey_run_',
        suffix: '.png',
      }),
      repeat: -1,
    }),
      this.anims.create({
        key: 'idle',
        frameRate: 10,
        frames: [{ key: 'monkey', frame: 'monkey_idle.png' }],
      }),
      this.anims.create({
        key: 'jump',
        frameRate: 10,
        frames: this.anims.generateFrameNames('monkey', {
          start: 1,
          end: 3,
          prefix: 'monkey_jump_swing_',
          suffix: '.png',
        }),
        repeat: -1,
      }),
      this.anims.create({
        key: 'celebrate',
        frameRate: 10,
        frames: [{ key: 'monkey', frame: 'monkey_armsup_happy.png' }],
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
      debug: true,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
