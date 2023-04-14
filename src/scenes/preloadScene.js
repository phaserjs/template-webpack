
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('person', 'src/assets/person.png');
        this.load.image('slider', 'src/assets/bullet.png');
        this.load.image('progressBarHorizontal', 'src/assets/progressBarHorizontal.png');
        this.load.image('progressBarVertical', 'src/assets/progressBarVertical.png');
        // load tile map
    }
      
    create ()
    {
        this.scene.start('game');
    }
}