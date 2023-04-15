var gg = false;
var stopVelocity =false;
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
      
    create (){
        
        // create repeating tile sprite for background
        const background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, this.level.mapName);
            
        let prevFix=600;
        let prev=prevFix;
        // set origin to top-left corner
        background.setOrigin(0, 0);
            
        // set scale to fill the entire screen
        background.setScale(this.cameras.main.width / background.width, this.cameras.main.height / background.height);
        
        // create tiles


        
        // Hodnoty na nastavenie rychlosti vyskoku adopadu
        this.jumpSpedUp = 5;
        this.jumpSpedDown = 2;


        
        // Hodnoty na nastavenie rychlosti vyskoku adopadu
        // this.jumpSpedUp = 5;
        // this.jumpSpedDown = 2;
        
        this.playerPhysics();
        this.initTilesGenerator();
        //this.setupTiles();



        this.level.tileMap.forEach((tile, index) => {
          

              this.physics.add.collider(this.player, tile.id, function(player, block) {
                gg=false;
                stopVelocity=false;
                console.log("Player touched block with blockType:");
              });  

    
        });
        
       

        // // Iba na skusku
        this.cursors = this.input.keyboard.createCursorKeys();


              
    }

  



    update() {
        
       //Iba na skusku
        // console.log(this.showNumber);

         if (this.cursors.up.isDown) {
             this.moveDownTiles();
            
         }
         else if (this.cursors.down.isDown) {
             this.moveUpTiles();
         }

        // }
        // else if (this.cursors.down.isDown) {
        //     this.moveUpTiles();
        // }

        // Keeps slider in progressBarHorizontal
        if (this.sliderHorizontal.x < 60) {
            this.sliderHorizontal.emit('leftHorizontal');
        } else if (this.sliderHorizontal.x > 140) {
            this.sliderHorizontal.emit('rightHorizontal');
        }
        // Keeps slider in progressBarVertical
        if (this.sliderVertical.y > 550) {
            this.sliderVertical.emit('upVertical');
        } else if (this.sliderVertical.y < 470) {
            this.sliderVertical.emit('downVertical');
        }
        if(this.keys.A.isDown){   
            // DEBUG PURPOSE ONLY      
            // DELETE LATER     
           this.player.x -= this.movementSpeed
           this.directionFacing = "W"
        }
        if(this.keys.D.isDown){
            // DEBUG PURPOSE ONLY
            // DELETE LATER
           this.player.x += this.movementSpeed
           this.directionFacing = "E"
        }
        if(this.keys.W.isDown)
        {
            // DEBUG PURPOSE ONLY
            // DELETE LATER
           this.player.y -= this.movementSpeed
           this.directionFacing = "N"
        }
        if(this.keys.S.isDown)
        {
            // DEBUG PURPOSE ONLY
            // DELETE LATER
           this.player.y += this.movementSpeed
           this.directionFacing = "S"
        }
        if (this.player.body.velocity.y > 0 &&( playerJumpedUp || playerJumpedToSide)) {
            // Player fliying up
            this.player.setVelocity(0,0);
            // Reset vertical slider
            this.sliderVertical.body.position.set(188,537)                
            if(playerJumpedUp){
                this.physics.world.gravity = {x: 0, y:0}
                // Turn on horizontal slider
                this.sliderHorizontal.setVelocityX(25)
            }
        }
        if(this.player.body.velocity.y < 0){
            // Player flying dows
            this.moveDownTiles()
            // this.sliderVertical.setVelocityY(-25);
        }
        if (this.player.body.velocity.x < 0 ) {
            // Player flying to left
           
            // Turn on vertical slider
            this.sliderVertical.setVelocityY(-25)
            // Reset horizontal slider
            this.sliderHorizontal.body.position.set(90,538)
            if(playerJumpedToSide && this.physics.world.gravity.x < 0){
                // Reset player velocity
                this.player.setVelocity(0,0);
                this.physics.world.gravity = {x: 0, y:500}
                playerJumpedToSide =false
             
                //nastavenie reverznej gravitacie Martin
                gg = true;
            }
        }
   
        


        if (this.player.body.velocity.x > 0 ) {
            // Player flying to right
            
            // Turn on vertical slider
            this.sliderVertical.setVelocityY(-25)
            // Reset horizontal slider
            this.sliderHorizontal.body.position.set(90,538)
            if(playerJumpedToSide && this.physics.world.gravity.x > 0){
                // Reset player velocity
                this.player.setVelocity(0,0);
                this.physics.world.gravity = {x: 0, y:500}
                playerJumpedToSide =false
                
                 //nastavenie reverznej gravitacie Martin
                 gg=true;
            }
        }
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 300)) {
            if(playerJumpedUp == false){
                // Vertical Jump
                playerJumpedUp = true;
                playerJumpedToSide = false;
                // Calculating power of jump we are not using this value now
                // We use constant number
                const calculatePower = (600 - this.sliderVertical.body.position.y )/25
                this.jumpSpedUp = calculatePower
                playerJumpedToSide = false;
                // Making player jump
                this.player.setVelocity(0,-175);
                // Change gravity 
                this.physics.world.gravity = {x: 0, y: 500}
                // Reset vertical slider
                this.sliderVertical.setVelocityY(0)
                // this.sliderVertical.body.position.set(188,500)                
            }
            else if(playerJumpedUp == true){
                // Horizontal jump
                playerJumpedToSide = true
                playerJumpedUp = false
                // Power of jump
                const calculatePower = this.sliderHorizontal.body.position.x > 100 ? (this.sliderHorizontal.body.position.x-90) : -(80 - this.sliderHorizontal.body.position.x)
                // Change gravity depending on which side is player flying
                this.physics.world.gravity = {x: calculatePower > 0 ? -250: 250, y: 0}
                // Making player jump
                this.player.setVelocity(calculatePower*20, 0)
                // Reset horizontal slider
                this.sliderHorizontal.setVelocityX(0)
                this.sliderHorizontal.body.position.set(90,538)
            }
        }


      

        if(gg == true){
            this.moveUpTiles();
        }
        else{
           
        }
       
    }


    
    playerPhysics () {
        //Setting boundaries for our world
        this.physics.world.setBounds(0, 0, 800, 600);
        const logo = this.add.image(800, 900, 'logo');
      
        //Seting our movement speed for WASD movements
        this.movementSpeed = 6    

        // Player config
        let playerPosX = 400
        let playerPosY = 600
        this.player = this.physics.add.sprite(playerPosX,playerPosY,"person").setOrigin(0.5,0.5).setDisplaySize
        (45,45)
        this.player.setCollideWorldBounds(true)

        // ProgressBarHorizontal config
        let progressBarHorizontalPosX = 100
        let pprogressBarHorizontalPosY = 550
        this.progressBarHorizontal = this.physics.add.sprite(progressBarHorizontalPosX,pprogressBarHorizontalPosY,"progressBarHorizontal").setOrigin(0.5,0.5).setDisplaySize
        (100,25)
        this.progressBarHorizontal.setCollideWorldBounds(true)
        this.progressBarHorizontal.body.allowGravity = false

        // ProgressBarVertical config
        let progressBarVerticalPosX = 200
        let pprogressBarVerticalPosY = 510
        this.progressBarVertical = this.physics.add.sprite(progressBarVerticalPosX,pprogressBarVerticalPosY,"progressBarVertical").setOrigin(0.5,0.5).setDisplaySize
        (25,100)
        this.progressBarVertical.setCollideWorldBounds(true)
        this.progressBarVertical.body.allowGravity = false

         // Slider config
         let sliderHorizontalPosX = 100
         let sliderHorizontalPosY = 550
         this.sliderHorizontal = this.physics.add.sprite(sliderHorizontalPosX,sliderHorizontalPosY,"slider").setOrigin(0.5,0.5).setDisplaySize
         (24,24)
         this.sliderHorizontal.setCollideWorldBounds(true)
         this.sliderHorizontal.body.allowGravity = false

         // Slider config
         let sliderVerticalPosX = 200
         let sliderVerticalPosY = 540
         this.sliderVertical = this.physics.add.sprite(sliderVerticalPosX,sliderVerticalPosY,"slider").setOrigin(0.5,0.5).setDisplaySize
         (24,24)
         this.sliderVertical.setCollideWorldBounds(true)
         this.sliderVertical.body.allowGravity = false

        // Set event listener for reaching left and right edges
        this.sliderHorizontal.on('leftHorizontal', function () {
            this.sliderHorizontal.setVelocityX(25);
        }, this);
        this.sliderHorizontal.on('rightHorizontal', function () {
            this.sliderHorizontal.setVelocityX(-25);
        }, this);

        this.sliderVertical.setVelocityY(-25);
        // Set event listener for reaching left and right edges
        this.sliderVertical.on('downVertical', function () {
            this.sliderVertical.setVelocityY(25);
        }, this);
        this.sliderVertical.on('upVertical', function () {
            this.sliderVertical.setVelocityY(-25);
        }, this);

        // Keys config 
        // DEBUG PURPOSE ONLY
        let key_W = this.input.keyboard.addKey('W'); // Get key object
        let key_S = this.input.keyboard.addKey('S'); // Get key object
        let key_A = this.input.keyboard.addKey('A'); // Get key object
        let key_D = this.input.keyboard.addKey('D'); // Get key object
        this.keys = this.input.keyboard.addKeys('A,D,W,S')
    }

    moveDownTiles(){
        this.showNumber=this.showNumber+ this.jumpSpedUp;
        this.level.tileMap.forEach((tile, index) => {

            if(tile.showNum <= this.showNumber){
                for (let block of tile.id) {
                    block.y += this.jumpSpedUp;

                    
                }
            }
        });
    }

    moveUpTiles(){
        this.showNumber=this.showNumber - this.jumpSpedDown;
        this.level.tileMap.forEach((tile, index) => {
            if(tile.id.values().next().value.y > 0){
                for (let block of tile.id) {
                block.y -= this.jumpSpedDown;
            }
            }
        });
    }



    initTilesGenerator(){
        this.showNumber = 900;
        this.showNumPrev = 264;
        

           

            this.level.tileMap.forEach((tile, index) => {
                
                    tile.y=0
                    this.showNumPrev += tile.showNum;
                    tile.showNum = this.showNumPrev;
                    
                var tileWH = 32

                if(tile.showNum <= this.showNumber ){
                    tile.y= this.showNumber - tile.showNum;
                }

                    tile.id=[];
                    this.blockName;
                    var moveBlock=0;
                    for (let i = 0; i < tile.tileLenght; i++) {
                    
                        if(i==0 && tile.tileTypeFirst != null){
                            this.blockName=tile.tileTypeFirst;
                        }
                        else if(i==tile.tileLenght-1 && tile.tileTypeLast != null){
                            this.blockName=tile.tileTypeLast;

                        }
                        else{
                            this.blockName=tile.tileType;
                        }
                       
                        let block = this.physics.add.sprite(tile.x+moveBlock, tile.y, 'tileMap', this.blockName).setScale(2);;
                        block.setOrigin(0, 1);
                        console.log(block);
                        block.body.allowGravity=false;
                        block.body.immovable=true;
                        tile.id.push(block);
                        moveBlock +=tileWH; 
                      }
            
            });

            
    }

   

    

    setupTiles(){
        for(let x = 0; x<= this.game.canvas.width; x = x+32){
            this.add.sprite(x, this.game.canvas.height, 'tileMap', 'grassTopMid').setOrigin(1, 1).setScale(2);
        }
        this.add.sprite(200, 200, 'tileMap', 'grassTopLeft').setScale(2);
        this.add.sprite(232, 200, 'tileMap', 'grassTopMid').setScale(2);
        this.add.sprite(264, 200, 'tileMap', 'grassTopRight').setScale(2);
        this.add.sprite(200, 232, 'tileMap', 'groundDownLeft').setScale(2);
        this.add.sprite(232, 232, 'tileMap', 'groundDownMid').setScale(2);
        this.add.sprite(264, 232, 'tileMap', 'groundDownRight').setScale(2);

        this.add.sprite(300, 232, 'tileMap', 'spike1').setScale(2);
        this.add.sprite(332, 232, 'tileMap', 'spike1').setScale(2);
        this.add.sprite(364, 232, 'tileMap', 'spike1').setScale(2);
    }

    
}
