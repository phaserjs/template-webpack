

class levelMenuScene extends Phaser.Scene {
    constructor (){
        super('levelMenu');
    }

    preload ()
    {
    }
      
    create ()
    {
        // background image
        const menuBackground = this.add.image(0, 0, 'menuBackground');
        menuBackground.setOrigin(0);
        menuBackground.setScale(this.cameras.main.width / menuBackground.width, this.cameras.main.height / menuBackground.height);


    }
}