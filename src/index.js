import Phaser from 'phaser';
import PlayerController from './PlayerController';
import dudeImg from './assets/dude.png';
import groundImg from './assets/platform.png';
import skyImg from './assets/sky.png';

class Level extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('sky', skyImg);
        this.load.image('ground', groundImg);
        this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
    }
      
    create ()
    {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(10, 45, 'dude');
        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.playerController = new PlayerController(this.player);
        this.playerController.setState('idle');
    }

    update() 
    {
        if (this.cursors.left.isDown) {
            this.playerController.setState('moveLeft');
        }
        else if (this.cursors.right.isDown) {
            this.playerController.setState('moveRight');
        } else {
            this.playerController.setState('idle');
        }
        

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-400);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Level,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
