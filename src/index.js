import Phaser from 'phaser';
import MyGame from './Scenes/MyGame';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    scene: MyGame
};

const game = new Phaser.Game(config);




