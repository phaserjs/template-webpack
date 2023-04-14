const GAME_HEIGHT = 600;
const GAME_WIDTH = 800
const config = {                 //Creating game config
    width: GAME_WIDTH,            //Setting game width and height
    height: GAME_HEIGHT,
    renderType : Phaser.CANVAS,   //Render type for rendering
    scene: {                      //Definig scene object and its functions
        preload: preload,
        create: create
    },
    physics: {                    //Seting up basic physics
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
}

let game = new Phaser.Game(config)

function preload() {
    this.load.image("logo", "src/assets/logo.png")   
}

function create (){
    //Setting boundaries for our world
    this.physics.world.setBounds(0, 0, 1600, 1200);
    const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
}