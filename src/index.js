import Phaser from 'phaser';
import LoadingScene from './scenes/loading';
import Level1 from './scenes/level-1';
import Level2 from './scenes/level-2';
import Level4 from './scenes/level-4';
import Level4Test from './scenes/level-4-test';
import UIScene from './scenes/ui';
import MainMenuScene from './scenes/main-menu';
import MovementScene from './scenes/movement';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 736,
    height: 640,
    backgroundColor: "#763B36",
    // zoom: 1.25,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    // scene: [ Level1, Level4, Level4Test, MovementScene, MainMenuScene, LoadingScene,  Level2, UIScene]
    scene: [ Level1, Level4, MovementScene, MainMenuScene, LoadingScene, UIScene]
    
};

const game = new Phaser.Game(config);
