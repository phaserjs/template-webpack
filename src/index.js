import Phaser from 'phaser';
import atlant from './assets/atlant_walk.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.spritesheet('atlant', atlant, {frameWidth: 16, frameHeight: 16});
    }
      
    create ()
    {
        const atlant = this.add.image(100, 75, 'atlant');
      
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
    scene: MyGame
};

const game = new Phaser.Game(config);
