
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

        
        // Hodnoty na nastavenie rychlosti vyskoku adopadu
        // this.jumpSpedUp = 5;
        // this.jumpSpedDown = 2;

        // this.initTilesGenerator();
       

        // // Iba na skusku
        // this.cursors = this.input.keyboard.createCursorKeys();
              
    }


    update() {
        
       //Iba na skusku
        // console.log(this.showNumber);

        // if (this.cursors.up.isDown) {
        //     this.moveDownTiles();
            
        // }
        // else if (this.cursors.down.isDown) {
        //     this.moveUpTiles();
        // }
       
    }



    moveDownTiles(){
        this.showNumber=this.showNumber+ this.jumpSpedUp;
        this.level.tileMap.forEach((tile, index) => {
            if(tile.showNum <= this.showNumber && tile.id.y < this.cameras.main.height*2 ){
                tile.id.y += this.jumpSpedUp;
            }

        });
    }

    moveUpTiles(){
        this.showNumber=this.showNumber - this.jumpSpedDown;
        this.level.tileMap.forEach((tile, index) => {
            if(tile.id.y > 0){
                console.log(tile.id._tilePosition.y);
                tile.id.y -= this.jumpSpedDown;
            }

        });
    }


    initTilesGenerator(){
        this.showNumber = 900;
        this.showNumPrev = 300;

            // create repeating tile sprite for background
            const background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, this.level.mapName);
            // set origin to top-left corner
            background.setScale(window.innerWidth / background.width, window.innerHeight / background.height);

            background.setOrigin(0, 0);


            const p = this.add.tileSprite(0, 0, 50, 50, "menuBtn");
                   p.setOrigin(0, 1);
            // set scale to fill the entire screen
           

            this.level.tileMap.forEach((tile, index) => {
                
                    tile.y=0
                    this.showNumPrev += tile.showNum;
                    tile.showNum = this.showNumPrev;
                    
                
                if(tile.showNum <= this.showNumber ){
                    tile.y= this.showNumber - tile.showNum;
                }
                    console.log(tile);
                    tile.id = this.add.tileSprite(tile.x, tile.y, 50, 50, "menuBtn");
                    tile.id.setOrigin(0, 1);
            
            });

            
    }

    setupTiles(){
        for(let x = 0; x<= this.game.canvas.width; x = x+16){
            this.add.sprite(x, this.game.canvas.height, 'tileMap', 'grassTopMid').setOrigin(1, 1);
        }
    }

    
}
