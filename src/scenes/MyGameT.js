import Phaser from 'phaser';
import Zone from '../entity/Zone.js';

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.atlas('monkey', 'assets/monkey.png', 'assets/monkey.json');

    this.load.image('tiles', 'assets/platformersheet.png');
    this.load.image('tilesbg', 'assets/backgroundColorForest.png');

    this.load.tilemapTiledJSON('tilemap', 'assets/levelOne.json');

    for (let i = 1; i <= 15; i++) {
      this.load.image(`block${i}`, `assets/blocks/block${i}.png`);
    }
  }

  generateBlock(x, y, blockName) {
    return this.add.sprite(x, y, blockName).setInteractive();
  }

  create() {
    //create map
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('levelOne', 'tiles');
    const backgroundSet = map.addTilesetImage('forestBackground', 'tilesbg');
    const ground = map.createLayer('ground', tileset);

    const background = map.createLayer('background', backgroundSet);
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);
    this.matter.world.convertTilemapLayer(background);

    //adding test zone
    this.zone = new Zone(this);

    //this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);

    this.dropZOne = this.zone.renderZone(650, 1800, 400, 1000);
    this.dropZTwo = this.zone.renderZone(1780, 1800, 600, 1100);
    this.dropZThree = this.zone.renderZone(4267, 2200, 600, 2200);

    //this.dropZTwo = this.zone.renderZone(680, 1800, 200, 1000);

    //this.dropZThree = this.zone.renderZone(570, 1800, 200, 1000);

    //this.dropZFour = this.zone.renderZone(1780, 1800, 600, 1100);

    //this.outlineOne = this.zone.renderOutline(this.dropZFour, 0xff09d2);
    // this.outlineTwo = this.zone.renderOutline(this.dropZTwo, 0xff09d2);
    // this.outlineThree = this.zone.renderOutline(this.dropZThree, 0xff09d2);
    // overall zone 750, 2100, 700, 1200

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

    this.input.setDraggable(block4, true);
    this.input.setDraggable(block6, true);
    this.input.setDraggable(block10, true);

    this.input.setDraggable(block10, true);

    this.input.dragDistanceThreshold = 0;
    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // this.input.on('drag', function (pointer, gameObject) {
    //   // console.log('X', gameObject.x, 'Y', gameObject.y);
    //   //console.log(gameObject.x);
    // });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      //while dragging, when dropped, return object back to original starting pos.
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      console.log(gameObject.texture.key, gameObject.x, gameObject.y);
    });

    ////BUBBLE SORT ////
    this.add.text(
      886,
      2000,
      `Stack these blocks from shortest to tallest!\n
      Start by moving the tallest block in each pair to the right`,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      }
    );

    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;

      if (currentBlock === 'block4' && xPos > 589 && xPos < 600) {
        window.alert('Thats right!');
        // if its the wrong move we reset it
      } else if (currentBlock === 'block4' && xPos > 680 && xPos < 690) {
        window.alert('Thats right!');
      } else if (currentBlock === 'block4' && xPos > 780 && xPos < 790) {
        window.alert('Thats right!');
        block4.input.draggable = false;
        block2.input.draggable = true;
      } else if (currentBlock === 'block2' && xPos > 585 && xPos < 595) {
        window.alert('Thats right! Good job solving your first bubble sort!');
        block2.input.draggable = false;
      }
    });

    /////////INSERTION SORT //////////////
    this.add.text(
      837,
      1150,
      `To the left to the left!\n
      Sort the blocks by moving the \n
      shortest blocks to the left.`,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      }
    );

    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      console.log(currentBlock);
      let xPos = gameObject.x;

      if (currentBlock === 'block6' && xPos > 1360 && xPos < 1600) {
        window.alert('Thats right!');
        block6.input.draggable = false;
        block5.input.draggable = true;
      } else if (currentBlock === 'block5' && xPos > 1360 && xPos < 1600) {
        window.alert('Thats right!');
        block5.input.draggable = false;
        block8.input.draggable = true;
      } else if (currentBlock === 'block8' && xPos > 1820 && xPos < 1895) {
        window.alert('Congrats on solving insertion sortttttttt!');
        block8.input.draggable = false;
      }
    });
    /////////
    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;
      if (currentBlock === 'block10' && xPos > 4000 && xPos < 4051) {
        window.alert('Thats right!');
        block10.input.draggable = false;
        block14.input.draggable = true;
      } else if (currentBlock === 'block14' && xPos > 4105 && xPos < 4200) {
        window.alert('Thats right!');
        block14.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4372 && xPos < 4432) {
        window.alert('Thats right!');
        block12.input.draggable = false;
        block11.input.draggable = true;
      } else if (currentBlock === 'block11' && xPos > 4110 && xPos < 4120) {
        window.alert('Thats right!');
        block11.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4185 && xPos < 4225) {
        window.alert('Thats right!');
        block12.input.draggable = false;
        block13.input.draggable = true;
      } else if (currentBlock === 'block13' && xPos > 4296 && xPos < 4308) {
        window.alert('Congratulations on solving merge sort!');
        block13.input.draggable = false;
      }
    });

    ///////////

    // this.cameras.main.setBounds (0, 0, 1920 * 2, 1080 * 2);
    // this.matter.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    // set the monkey animation
    //this.createMonkeyAnimations();

    this.cameras.main.startFollow(this.monkey);
    this.cameras.main.setBounds(45, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.matter.world.setBounds(0, 0, 2150 * 3, 1080 * 2);
    this.createMonkeyAnimations();

    this.input.on('dragend', function (pointer, gameObject) {
      let currentBlock = gameObject.texture.key;
      let xPos = gameObject.x;
      if (currentBlock === 'block10' && xPos > 4000 && xPos < 4051) {
        window.alert('Thats right!');
        block10.input.draggable = false;
        block14.input.draggable = true;
      } else if (currentBlock === 'block14' && xPos > 4105 && xPos < 4200) {
        window.alert('Thats right!');
        block14.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4372 && xPos < 4432) {
        window.alert('Thats right!');
        block12.input.draggable = false;
        block11.input.draggable = true;
      } else if (currentBlock === 'block11' && xPos > 4110 && xPos < 4120) {
        window.alert('Thats right!');
        block11.input.draggable = false;
        block12.input.draggable = true;
      } else if (currentBlock === 'block12' && xPos > 4185 && xPos < 4225) {
        window.alert('Thats right!');
        block12.input.draggable = false;
        block13.input.draggable = true;
      } else if (currentBlock === 'block13' && xPos > 4296 && xPos < 4308) {
        window.alert('Congratulations on solving merge sort!');
        block13.input.draggable = false;
      }
    });

    //victory coordinates 705 6293
    this.cameras.main.startFollow(this.monkey);
    this.cameras.main.setBounds(45, 0, 2150 * 3, 1080 * 2);
    this.cameras.main.zoom = 0.75;
    this.matter.world.setBounds(0, 0, 2150 * 3, 1080 * 2);

    this.createMonkeyAnimations();
  }

  update() {
    //moves our character left, right, and jumping
    const speed = 20;
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
        frameRate: 1,
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

// //INSERTION SORT
//  [] Make the drop zone prevent user from dragging block foreword
//  [] Enable drag for the block in question
//  [] Drag to proper position, then disable drag.
//  [] Enable drag for block that is 'next in line'
//
