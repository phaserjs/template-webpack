import Phaser from 'phaser';
import LoadingScene from './scenes/loading';
import Level1 from './scenes/level-1';
import Level2 from './scenes/level-2';
import UIScene from './scenes/ui';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 650,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [LoadingScene, Level1, Level2, UIScene]
};

const game = new Phaser.Game(config);
