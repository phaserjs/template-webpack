var gg = false;
var gameOver= {
    is: false,
    reason: null,
  };
var score=0;
var gameOverOverlay = false;
var time= 0;


class levelScene extends Phaser.Scene {
    constructor (){
        super('LevelScene');
    }

    init(data) {
        //console.log(data);
        this.level = data.level;
        
    }

    preload ()
    {
    }
      
    create (){
        gg=false;
        gameOver.is=false;
        gameOver.reason=null;
        score=0;
        gameOverOverlay=false;
        time = 0; // začiatočný čas

        // Spustenie časovača každú sekundu
        this.time.addEvent({
          delay: 1,
          callback: function() {
            time++; // Inkrementujeme čas
          },
          callbackScope: this,
          loop: true
        });
        
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

        this.tileBlocks.forEach((tile, index) => {
              this.physics.add.collider(this.player, tile.id, function(player, block) {
                if (block.blockType === 'dead'){
                    gameOver.is=true;
                    gameOver.reason=block.blockType;
                }
                if (block.blockType === 'bonus'){
                    score ++;
                }
                if (block.blockType === 'finish'){
                    gameOver.is=true;
                    gameOver.reason=block.blockType;
                }
                if (block.blockType === 'standard'){
                    
                }
                //console.log(block.blockType);
                gg=false;
                player.setVelocityX(0);
                player.setVelocityY(0);
                //console.log("Player touched block with blockType:");
              });  
        });
        // // Iba na skusku
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }
    
    update() {
        if(gameOver.is && !gameOverOverlay){
            //akcia 4o sa stane;
            console.log(gameOver);
            this.createGameOverPopup();
        }
        else{

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
        // Vertical movement of sliderDot
        if (this.sliderDot.y > 774) {
            this.sliderDot.emit('up');
        } else if (this.sliderDot.y < 626) {
            this.sliderDot.emit('down');
        }
        // Horizontal movement of sliderDot
        if (this.sliderDot.x > 224) {
            this.sliderDot.emit('left');
        } else if (this.sliderDot.x < 76) {
            this.sliderDot.emit('right');
        }
        if (this.player.body.velocity.y > 0 &&( playerJumpedUp || playerJumpedToSide)) { 
            // Player fliying up
            this.player.setVelocity(0,0);
            // Reset vertical slider           
            this.sliderDot.setVelocityX(140) 
            console.log("z")
            if(playerJumpedUp){
                this.physics.world.gravity = {x: 0, y:0}
                // Turn on horizontal slider
            }
        }
        if(this.player.body.velocity.y < 0){
            // Turn off horizontal movement
            this.sliderDot.setVelocityY(0)
            // Set sliderDot to center after vertical jump
            this.sliderDot.body.position.set(137,688) 
            this.moveDownTiles()
        }
        if (this.player.body.velocity.x < 0 ) {
            // Player flying to left
           console.log("left")
            // Turn off vertical movement
            this.sliderDot.setVelocityX(0)
            // Set sliderDot to bottom after horizontal jump
            this.sliderDot.body.position.set(137,762) 

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
            console.log("right")
            // Turn off vertical movement
            this.sliderDot.setVelocityX(0)
            // Set sliderDot to bottom after horizontal jump
            this.sliderDot.body.position.set(137,762) 
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
            
            console.log(playerJumpedUp)
            console.log(playerJumpedToSide)
            if(playerJumpedUp == false){
                console.log("Vertical Jump")
                // Vertical Jump
                playerJumpedUp = true;
                playerJumpedToSide = false;
                // Calculating power of jump we are not using this value now
                // We use constant number
                console.log(this.sliderDot.body.position.y)
                // console.log(this.sliderDot.body.position.x)
                const calculateVerticalPower = (770-this.sliderDot.body.position.y) / 15
                this.jumpSpedUp = calculateVerticalPower
                playerJumpedToSide = false;
                // Making player jump
                this.player.setVelocity(0,-100);
                // Change gravity 
                this.physics.world.gravity = {x: 0, y: 500}
                this.sliderDot.body.position.set(137,688) 
                this.sliderDot.setVelocityX(140)
                // Reset vertical slider
            }
            else if(playerJumpedUp == true){
                console.log("Horizontal Jump")
                // Horizontal jump
                playerJumpedToSide = true
                playerJumpedUp = false
                // Power of jump
                const calculatePowerHorizontal = -((138 - this.sliderDot.body.position.x) * 15) / 33
                // Change gravity depending on which side is player flying
                this.physics.world.gravity = {x: calculatePowerHorizontal > 0 ? -200: 200, y: 0}
                // Making player jump
                this.player.setVelocity(calculatePowerHorizontal*20, 0)
            }
        }
        if(gg == true){
            this.moveUpTiles();
        }
        else{           
        }

    }
       

    }
    
    playerPhysics () {
        //Setting boundaries for our world
        this.physics.world.setBounds(0, 0, 800, 600);
      
        //Seting our movement speed for WASD movements
        this.movementSpeed = 10    

        // Player config
        let playerPosX = 400
        let playerPosY = 600
        this.player = this.physics.add.sprite(playerPosX,playerPosY,"person").setOrigin(0.5,0.5).setDisplaySize
        (45,45)
        this.player.setCollideWorldBounds(true)

        // Slider Cross config
        let sliderPosX = 150
        let sliderPosY = 700
        this.slider = this.physics.add.sprite(sliderPosX,sliderPosY,"sliderCross").setOrigin(0.5,0.5).setDisplaySize
        (176,176)
        this.slider.setCollideWorldBounds(false)
        this.slider.body.allowGravity = false

        // Slider dot config
        // 774 dole v strede
        let sliderDotPosX = 150
        let sliderDotPosY = 774
        this.sliderDot = this.physics.add.sprite(sliderDotPosX,sliderDotPosY,"sliderDot").setOrigin(0.5,0.5).setDisplaySize
        (25,25)
        this.sliderDot.setCollideWorldBounds(false)
        this.sliderDot.body.allowGravity = false

        this.sliderDot.setVelocityY(-140);
        // Set event listener for reaching left and right edges
        this.sliderDot.on('down', function () {
            this.sliderDot.setVelocityY(140);
        }, this);
        this.sliderDot.on('up', function () {
            this.sliderDot.setVelocityY(-140);
        }, this);
        // Set event listener for reaching left and right edges
        this.sliderDot.on('left', function () {
            this.sliderDot.setVelocityX(-140);
        }, this);
        this.sliderDot.on('right', function () {
            this.sliderDot.setVelocityX(140);
        }, this);
    }

    moveDownTiles(){
        if(gameOver.is == false){

        this.showNumber=this.showNumber+ this.jumpSpedUp;
        this.tileBlocks.forEach((tile, index) => {

            if(tile.showNum <= this.showNumber){
                for (let block of tile.id) {
                    block.y += this.jumpSpedUp;
                }
            });
        }
    }

    moveUpTiles(){
        if(gameOver.is == false){
        this.showNumber=this.showNumber - this.jumpSpedDown;
        this.tileBlocks.forEach((tile, index) => {
            if(this.showNumber<800){
                //koniec hry bo spadol;
                gameOver.is=true;
                gameOver.reason="fallDown";
            }
            if(tile.id.values().next().value.y > 0){
                for (let block of tile.id) {
                block.y -= this.jumpSpedDown;
            }
            }
        });
    }
    }



    initTilesGenerator(){
        this.showNumber = 900;
        this.showNumPrev = 265;
    
            this.tileBlocks= JSON.parse(JSON.stringify(this.level.tileMap));  

            this.tileBlocks.forEach((tile, index) => {
                
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
                        //console.log(block);
                        block.body.allowGravity=false;
                        block.body.immovable=true;
                        block.body.allowDrag=false;
                        block.body.mass=1000;
                        block.blockType = tile.blockType;
                        tile.id.push(block);
                        moveBlock +=tileWH; 
                      }
            
            });

            
    }

    resetLevel() {
        // Re-initialize the tilemap and game entities
        this.create();
    
        // Reset any other game state variables as necessary
        this.score = 0;
    
        // Start the game loop again
        this.gameOver = {
            is: false,
            reason: null
        };
    }

    createGameOverPopup(){
        const won = gameOver.reason === 'finish' ? true : false;
        if (won) this.level.complete(3);
        // need to change this it will display only once
        gameOverOverlay = true;
        // black overlay
        var overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.5);
        overlay.fillRect(0, 0, this.game.config.width, this.game.config.height);

        // game over box
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'gameOver');
        this.add.text(this.cameras.main.width/2, 270, won ? 'YOU WON' : 'YOU LOSE', {fontSize: '35px',color: won ? '#58FF55' : '#FF5555',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        // score display
        this.add.text(this.cameras.main.width/2, 430, 'SCORE', {fontSize: '20px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text(this.cameras.main.width/2, 470, score, {fontSize: '35px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        // time display
        this.add.text((this.cameras.main.width/2)-120, 530, 'TIME', {fontSize: '20px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text((this.cameras.main.width/2)-120, 560, '35:00', {fontSize: '20px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');


        // picked items display
        this.add.text((this.cameras.main.width/2)+120, 530, 'PICKED ITEMS', {fontSize: '20px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text((this.cameras.main.width/2)+120, 560, '9', {fontSize: '20px',color: '#ffffff',stroke: '#000000',strokeThickness: 8 })
        .setOrigin(0.5)
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        // buttons
        const retry = this.add.image((this.cameras.main.width/2)-50, 670, 'retry').setScale(0.7);
        const continueB = this.add.image((this.cameras.main.width/2)+50, 670, 'continue').setScale(0.7);
        
        retry.setInteractive();
        continueB.setInteractive();

        retry.on('pointerup', () => {
            this.resetLevel();
            this.scene.start('LevelScene', {level: this.level});
        });

        continueB.on('pointerup', () => {
            this.scene.start('levelMenu');
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
