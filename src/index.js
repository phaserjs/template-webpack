import Phaser from 'phaser';
import { LoadingScene } from './scenes/loading';
import { Level1 } from './scenes/level-1';
import { Level3 } from './scenes/level-3';
import { Title } from './scenes/title';


const config = {
    type: Phaser.AUTO,
    title: 'SideScroller',
    parent: 'phaser-example',
    width: 960,
    height: 540,
    scene: [LoadingScene, Title, Level1, Level3],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 300 },
            fps: 60,
        }
    }
};


const game = new Phaser.Game(config);
