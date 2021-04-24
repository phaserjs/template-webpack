export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'assets', 'atlant_idle');

    this.setOrigin(0.5, 1);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCircle(14, 3, 6);
    this.setCollideWorldBounds(true);

    this.isAlive = true;

    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('atlant_idle', { start: 0, end: 7 }),
      frameRate: 5,
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('atlant_walk', { start: 0, end: 7 }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('atlant_swim', { start: 0, end: 5 }),
      frameRate: 5,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('atlant_jump', { start: 0, end: 7 }),
      frameRate: 5,
    });

    this.anims.create({
      key: 'enter_water',
      frames: this.anims.generateFrameNumbers('atlant_enter_water', { start: 0, end: 5 }),
      frameRate: 5,
    });

    this.play('idle');
  }

  start() {
    this.isAlive = true;

    // this.y = this.currentTrack.y;
    // this.play('idle');
    // this.play('idle', true);
  }

  moveUp() {
    this.y = this.y - 2;
  }

  moveDown() {
    this.y = this.y + 2;
  }

  moveRight() {
    this.x = this.x + 2;
  }

  moveLeft() {
    this.x = this.x - 2;
  }

  stop() {
    this.isAlive = false;

    this.body.stop();

    this.play('die');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.isAlive) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.up)) {
      this.moveUp();
    }
    else if (Phaser.Input.Keyboard.JustDown(this.down)) {
      this.moveDown();
    }
    else if (Phaser.Input.Keyboard.JustDown(this.right)) {
      this.moveRight();
    }
    else if (Phaser.Input.Keyboard.JustDown(this.left)) {
      this.moveLeft();
    }
  }
}