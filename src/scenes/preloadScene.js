
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        this.load.image('menuBackground', 'src/assets/menuBackground.png');
        
        // button
        this.load.image('button', 'src/assets/button.png');
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');

        this.load.image('person', 'src/assets/person.png');
        this.load.image('slider', 'src/assets/bullet.png');
        this.load.image('progressBarHorizontal', 'src/assets/progressBarHorizontal.png');
        this.load.image('progressBarVertical', 'src/assets/progressBarVertical.png');
        

        // load level preview images
        this.load.image('level1preview', 'src/assets/Level1ScenePreview.png');
        this.load.image('level2preview', 'src/assets/Level2ScenePreview.png');
        this.load.image('level3preview', 'src/assets/Level3ScenePreview.png');
        this.load.image('level4preview', 'src/assets/Level4ScenePreview.png');

        this.load.image('level1', 'src/assets/Level1Scene.jpeg');
        this.load.image('level2', 'src/assets/Level2Scene.jpeg');
        this.load.image('level3', 'src/assets/Level3Scene.jpeg');
        this.load.image('level4', 'src/assets/Level4Scene.jpeg');

        this.load.image('menuBtn', 'src/assets/btn1.png');
        this.load.image('background', 'src/assets/movementBackground.png');
        // load tile map



        // add a loading bar ################
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff // white
            }
        });
        
        // update the loading bar as assets are loaded
        this.load.on('progress', function (value) {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * value, 50);
        }, this);
        
        // remove the loading bar when loading is complete
        this.load.on('complete', function () {
            loadingBar.destroy();
        });
        //loading ################

    }
      
    create ()
    {   
        this.scene.start('levelMenu');
    }
}