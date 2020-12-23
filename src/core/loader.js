import 'phaser';
import logoImg from '../assets/logo.png';

export default class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    preload() {
        this.load.image('logo', logoImg);
    }

    create() {
        startGame(this);
    }
}

const startGame = (scene) => scene.scene.start(scene.scene.manager.getAt(2));
