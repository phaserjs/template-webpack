import 'phaser';
import config from './config/default-config';
import game from './game';
import Boot from './core/boot';
import Loader from './core/loader';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', Boot);
        this.scene.add('Loader', Loader);
        game.scenes.forEach((cfg) => this.scene.add(cfg.key, cfg.scene));
        this.scene.start('Boot');
    }
}

window.game = new Game();
