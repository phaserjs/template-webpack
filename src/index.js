import Phaser from 'phaser';
import config from './config/config';
import gameScene from './scenes/gameScene';
import bootScene from './scenes/bootScene';
import preloadScene from './scenes/preloadScene';

class Game extends Phaser.Game {
    constructor ()
    {
        super(config);
        this.scene.add('game', gameScene);
        this.scene.add('boot', bootScene);
        this.scene.add('preload', preloadScene);
        this.scene.start('boot');
    }
}

window.onload = () => {
    window.game = new Game();
}