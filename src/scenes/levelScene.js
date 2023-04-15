

class levelScene extends Phaser.Scene {
    constructor (){
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

        // create repeating tile sprite for background
        const background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, this.level.mapName);
            
        let prevFix=600;
        let prev=prevFix;
        // set origin to top-left corner
        background.setOrigin(0, 0);
            
        // set scale to fill the entire screen
        background.setScale(this.cameras.main.width / background.width, this.cameras.main.height / background.height);
        
        // create tiles
        this.setupTiles();

        // set scrolling speed
        const scrollSpeed = 2;
            
        // get reference to player object
        // const player = this.add.sprite(400,700, 'menuBtn');
        // player.setOrigin(0.5);
        // // assign player to scene object for later use
        // this.player = player;


        // assign update function to scene object
        // this.update = function () {
        //     var cursors = this.input.keyboard.createCursorKeys();

        //     if (cursors.left.isDown) {
        //         this.player.x -= 5;
        //     }
        //     else if (cursors.right.isDown) {
        //         this.player.x += 5;
        //     }

        //     if (cursors.up.isDown) {
        //         this.player.y -= 5;
        //     }
        //     else if (cursors.down.isDown) {
        //         this.player.y += 5;
        //     }

        //     if (this.player.y < prev) {
        //         let temp = prev - player.y;
                
        //         background.tilePositionY -= temp;
        //         prev = prev-temp;         
        //     }

        //     if (this.player.y > prevFix) {
        //         prev=prevFix;
        //     }
         
        // };
    }

    setupTiles(){
        for(let x = 0; x<= this.game.canvas.width; x = x+ (48 * 2)){
            this.add.sprite(x, this.game.canvas.height, 'tileMap', 'grassTop').setOrigin(1, 1).setScale(2);
        }
    }

    
}
