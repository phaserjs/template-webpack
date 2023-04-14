
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');

        // load tile map
    }
      
    create ()
    {
        this.scene.start('game');
    }
}