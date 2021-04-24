import Phaser from 'phaser';
import atlant_walk from './assets/atlant_walk.png';

class MyGame extends Phaser.Scene
{

    constructor ()
    {
        super();
        let player;
    }

    preload ()
    {
        this.load.spritesheet('atlant_walk', atlant_walk, {frameWidth: 16, frameHeight: 16});

    }
      
    create ()
    {

        this.player = this.physics.add.sprite(100, 75, 'atlant_walk');

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('atlant_walk', {start: 0, end: 8}),
            frameRate: 10,
        });
    }

    update(){
        this.player.anims.play('right', true);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        //mode: Phaser.Scale.FIT,
        width: 200,
        height: 150,
        zoom:4
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
