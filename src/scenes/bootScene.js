
class bootScene extends Phaser.Scene {
    constructor (){
        super('boot');
    }

    preload ()
    {
        
    }
      
    create ()
    {
        this.scene.start('preload');
    }
}