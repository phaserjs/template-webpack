
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('menuBackground', 'src/assets/menuBackground.png');
        // load tile map
    }
      
    create ()
    {
        this.scene.start('levelMenu');
    }
}