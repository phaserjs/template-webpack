// import Phaser from "phaser";

let player, ball, blueBrick, greenBrick, redBrick, yellowBrick, cursors
let gameStart = false;

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false
    }
  }
}

const game = new Phaser.Game(config)

function preload() {

  // this.load.audio('rick', './public/assests/rick-rolled.oog')
  this.load.image('ball', './public/assets/images/ball.png')
  this.load.image('brick1', './public/assets/images/brick-blue.png')
  this.load.image('brick2', './public/assets/images/brick-green.png')
  this.load.image('brick3', './public/assets/images/brick-red.png')
  this.load.image('brick4', './public/assets/images/brick-yellow.png')
  this.load.image('paddle', './public/assets/images/paddle.png')
}

function create() {
  //Rick roll 'em
  //  this.rickRolled = this.sound.add('rick')
  //   this.rickRolled.play()

  //creating player via paddle
  player = this.physics.add.sprite(
    400, //x position
    600, //y position
    'paddle'
  ).setScale(.15),

  //create ball
  ball = this.physics.add.sprite(
    400,
    565,
    'ball'
  ).setScale(.015)

  ball.body.setBounce(1)

  //add bricks
  blueBricks = this.physics.add.group({
    key: 'brick1',
    repeat: 8,
    setXY: {
      x: 120,
      y: 45,
      stepX:70
    },
    setScale: {
      x: .13,
      y: .13
    }
  })
  greenBricks = this.physics.add.group({
    key: 'brick2',
    repeat: 7,
    setXY: {
      x: 150,
      y: 80,
      stepX:70
    },
    setScale: {
      x: .13,
      y: .13
    }
  })
  redBricks = this.physics.add.group({
    key: 'brick3',
    repeat: 9,
    setXY: {
      x: 87,
      y: 115,
      stepX:70
    },
    setScale: {
      x: .13,
      y: .13
    }
  })
  yellowBricks = this.physics.add.group({
    key: 'brick4',
    repeat: 8,
    setXY: {
      x: 120,
      y: 150,
      stepX:70
    },
    setScale: {
      x: .13,
      y: .13
    }
  })

  //add keyboard movement - up, down, left, right, shift, space
  cursors = this.input.keyboard.createCursorKeys()
}

function update(){
  if (gameOver(this.physics.world)) {
    TODO: "you lose"
  } else if (win()) {
    TODO: "you win"
  } else {
    //while the game is live
    player.body.setVelocityX(0) //keeps player still if not pressing keyboard

    //controls the paddle left and right at px/s
    if(cursors.left.isDown) {
      player.body.setVelocityX(-350) //num is px per second to the left
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(350) //num is px per second to the right
    }

    //GameStart on space
    if (!gameStart) {
      ball.setX(player.x)

      if(cursors.space.isDown) {
        gameStart = true
        ball.setVelocityY(-250)
      }
    }
  }
}


//Game Status
function gameOver(world){
  return ball.body.y > world.bounds.height
}

function win(){
  return blueBricks.countActive() + greenBricks.countActive() + redBricks.countActive() + yellowBricks.countActive() === 0
}

