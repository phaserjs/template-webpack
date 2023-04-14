
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // button
        this.load.image('button', 'src/assets/button.png');
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('menuBackground', 'src/assets/menuBackground.png');
        // load level preview images
        this.load.image('level1preview', 'src/assets/level1preview.png');
        this.load.image('level2preview', 'src/assets/level2preview.png');
        this.load.image('level3preview', 'src/assets/level3preview.png');
        this.load.image('level4preview', 'src/assets/level4preview.png');
    }
      
    create ()
    {
        this.scene.start('levelMenu');
    }
}