

class levelMenuScene extends Phaser.Scene {
    constructor (){
        super('levelMenu');
    }

    preload ()
    {
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
    }
}