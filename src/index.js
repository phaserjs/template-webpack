import Phaser from 'phaser';
import logoImg from './assets/logo.png';

import { LoadingScene } from './scenes/loading';
import { Level1 } from './scenes/level-1';



const config = {
    type: Phaser.AUTO,
    title: 'game practice',
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [LoadingScene, Level1],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 300 }
        }
    }
};

const game = new Phaser.Game(config);
