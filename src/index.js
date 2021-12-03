import Phaser from 'phaser';
import { LoadingScene } from './scenes/loading';
import { Level1 } from './scenes/level-1';



const config = {
    type: Phaser.AUTO,
    title: 'SideScroller',
    parent: 'phaser-example',
    width: 3840,
    height: 540,
    scene: [LoadingScene, Level1],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 300 },
            tileBias: 32,
            fps: 60,
        }
    }
};


const game = new Phaser.Game(config);
