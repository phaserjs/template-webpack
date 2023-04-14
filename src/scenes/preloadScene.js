
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
        this.load.image('level1preview', 'src/assets/Level1ScenePreview.png');
        this.load.image('level2preview', 'src/assets/Level2ScenePreview.png');
        this.load.image('level3preview', 'src/assets/Level3ScenePreview.png');
        this.load.image('level4preview', 'src/assets/Level4ScenePreview.png');
    }
      
    create ()
    {
        this.scene.start('levelMenu');
    }
}