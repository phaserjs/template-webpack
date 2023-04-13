import 'phaser';
import logoImg from '../assets/logo.png';

export default class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // load all assets for the game
        this.load.image('logo', logoImg);

        // load tile map
    }
      
    create ()
    {
        this.scene.start('game');
    }
}