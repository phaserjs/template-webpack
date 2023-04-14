

class levelScene extends Phaser.Scene {
    constructor (level){
        super('LevelScene');
    }

    init(data) {
        this.level = data.level;
    }

    preload ()
    {
       
    }
      
    create ()
    {
        console.log(this.level);

            // create repeating tile sprite for background
            const background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, this.level.mapName);
            // set origin to top-left corner
            background.setScale(window.innerWidth / background.width, window.innerHeight / background.height);

            background.setOrigin(0, 0);
            
            // set scale to fill the entire screen
            
           
    }

    
}
