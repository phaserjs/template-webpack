
class preloadScene extends Phaser.Scene {
    constructor (){
        super('preload');
    }

    preload ()
    {
        // load all assets for the game
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('menuBackground', 'src/assets/menuBackground.png');
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
        this.scene.start('level1');
    }
}