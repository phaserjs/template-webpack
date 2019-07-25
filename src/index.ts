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
//END PHASER CONGIG


//GLOBAL VARIABLES
var platforms; //GLOBAL PLATFORMS
var stars; //GLOBAL COLLECTABLES
var player; //GLOBAL PLAYER
var cursors; //GLOBAL CONTROLLER


function preload() {

  //PRELOAD IMAGES
  this.load.image('sky', 'src/assets/sky.png');
  this.load.image('ground', 'src/assets/platform.png');
  this.load.image('star', 'src/assets/star.png');
  this.load.image('bomb', 'src/assets/bomb.png');

  //PRELOAD SPRITES
  this.load.spritesheet('dude',
      'src/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );

}

function create() {


  //DRAW BACKGROUND
  this.add.image(400, 300, 'sky');


  //CREATE PLATFORMS
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');


  //CREATE PLAYER
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //CREATE COLLECTABLES
  stars = this.physics.add.group({ //CREATE GROUP OF COLLECTABLES
      key: 'star', //NAME OF SPRITE
      repeat: 11, //NUMBER OF STARS TO CREATE
      setXY: { x: 12, y: 0, stepX: 70 } //XY ORIGIN
  });

  stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  //OVERLAP ALL
  this.physics.add.overlap(player, stars, collectStar, null, this);

  //COLLECTABLES COLLISION
  this.physics.add.collider(stars, platforms);

  //PLATFORM + PLAYER COLLISION
  this.physics.add.collider(player, platforms);


  //ADD CONTROLLER
  cursors = this.input.keyboard.createCursorKeys();


  //PLAYER ANIMATIONS
  //LEFT MOVEMENT ANIMATION
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  //TURN ANIMATION (LOOKING FORWARD)
  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  //RIGHT MOVEMENT ANIMATION
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  //ACTION WHEN COLLE
  function collectStar (player, star)
  {
      star.disableBody(true, true);
  }

}

function update(){


  //MOVE PLAYER & ANIMATE
  if (cursors.left.isDown) //IS LEFT ARROW DOWN?
  {
      player.setVelocityX(-160); //MOVE LEFT
      player.anims.play('left', true); //& PLAY LEFT ANIMATION
  }
  else if (cursors.right.isDown) //IS RIGHT ARROW DOWN?
  {
      player.setVelocityX(160); //MOVE RIGHT
      player.anims.play('right', true); //& PLAY RIGHT ANIMATION
  }
  else //IF NO KEYS ARE PRESSED
  {
      player.setVelocityX(0); //NO MOVEMENT
      player.anims.play('turn'); //PLAY TURN ANIMATION
  }


  //JUMP!
  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330); //ADD UPWARD VELOCITY
  }

}
