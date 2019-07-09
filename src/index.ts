import "phaser";
// @ts-ignore // this works via webpack file-loader

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

//GLOBAL VARIABLES
var platforms; //PLATFORMS
var player; //PLAYER
var cursors; //CONTROLLER

function preload() {

  this.load.image('sky', 'src/assets/sky.png');
  this.load.image('ground', 'src/assets/platform.png');
  this.load.image('star', 'src/assets/star.png');
  this.load.image('bomb', 'src/assets/bomb.png');

  this.load.spritesheet('dude',
      'src/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );

}

function create() {
  
  //BACKGROUND
  this.add.image(400, 300, 'sky');

  //PLATFORMS
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //PLAYER
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //PLATFORM + PLAYER COLLISION
  this.physics.add.collider(player, platforms);
  
  //CONTROLLER
  cursors = this.input.keyboard.createCursorKeys();

  //PLAYER ANIMATIONS
  //MOVE LEFT
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  //TURN (LOOKING FORWARD)
  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  //MOVE RIGHT
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

}

function update(){
  
  //MOVE PLAYER + SET ANIMATIONS
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
  
}
