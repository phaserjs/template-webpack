
let player;
let playerJumpedUp = false;
let playerJumpedToSide = false;


class gameScene extends Phaser.Scene {
    constructor (){
        super('game');
        
    }

    preload ()
    {
    }
      
    create ()
    {
        //Setting boundaries for our world
        this.physics.world.setBounds(0, 0, 800, 600);
      
        //Seting our movement speed
        this.movementSpeed = 6    

        // Player config
        let playerPosX = 400
        let playerPosY = 600
        this.player = this.physics.add.sprite(playerPosX,playerPosY,"person").setOrigin(0.5,0.5).setDisplaySize
        (75,75)
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
         let sliderVerticalPosY = 510
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
        let key_W = this.input.keyboard.addKey('W'); // Get key object
        let key_S = this.input.keyboard.addKey('S'); // Get key object
        let key_A = this.input.keyboard.addKey('A'); // Get key object
        let key_D = this.input.keyboard.addKey('D'); // Get key object
        this.keys = this.input.keyboard.addKeys('A,D,W,S')
    }

    update() {
        if (this.sliderHorizontal.x < 60) {
            this.sliderHorizontal.emit('leftHorizontal');
        } else if (this.sliderHorizontal.x > 140) {
            this.sliderHorizontal.emit('rightHorizontal');
        }
        if (this.sliderVertical.y > 550) {
            this.sliderVertical.emit('upVertical');
        } else if (this.sliderVertical.y < 470) {
            this.sliderVertical.emit('downVertical');
        }
        if(this.keys.A.isDown){              
           this.player.x -= this.movementSpeed
           this.directionFacing = "W"
        }
        if(this.keys.D.isDown){
           this.player.x += this.movementSpeed
           this.directionFacing = "E"
        }
        if(this.keys.W.isDown)
        {
           this.player.y -= this.movementSpeed
           this.directionFacing = "N"
        }
        if(this.keys.S.isDown)
        {
           this.player.y += this.movementSpeed
           this.directionFacing = "S"
        }
        if (this.player.body.velocity.y > 0 &&( playerJumpedUp || playerJumpedToSide)) {
            this.player.setVelocity(0,0);
            this.physics.world.gravity = {x: 0, y:0}
            if(playerJumpedUp){
                this.sliderHorizontal.setVelocityX(25);
            }
            
        }
        if (this.player.body.velocity.x < 0 ) {
            // Player on right
            this.sliderHorizontal.body.position.set(90,538)
            if(playerJumpedToSide && this.physics.world.gravity.x < 0){
                this.player.setVelocity(0,0);
                this.physics.world.gravity = {x: 0, y:200}
                playerJumpedToSide =false
                this.sliderVertical.setVelocityY(25);
            }
        }
        if (this.player.body.velocity.x > 0 ) {
            // Player on left
            this.sliderHorizontal.body.position.set(90,538)
            if(playerJumpedToSide && this.physics.world.gravity.x > 0){
                this.player.setVelocity(0,0);
                this.physics.world.gravity = {x: 0, y:200}
                playerJumpedToSide =false
            }
        }
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 300)) {
            if(playerJumpedUp == false){
                // this.sliderHorizontal.setVelocityX(0); 
                playerJumpedUp = true;
                // var jumpPower = 200; 
                const calculatePower = this.sliderHorizontal.body.position.y /100
                this.player.setVelocity(0,-calculatePower *50);
                // this.sliderHorizontal.setVelocity(0,0);
                playerJumpedToSide = false;
                this.physics.world.gravity = {x: 0, y: 500}
                this.sliderVertical.setVelocity(0,0)

                this.sliderVertical.body.position.set(188,495)
            }
            else if(playerJumpedUp == true){

                // this.sliderHorizontal.setVelocityX(0);
                playerJumpedToSide = true
                playerJumpedUp = false
                const calculatePower = this.sliderHorizontal.body.position.x > 100 ? (this.sliderHorizontal.body.position.x-100) : -(85 - this.sliderHorizontal.body.position.x)
                this.physics.world.gravity = {x: calculatePower > 0 ? -250: 250, y: 0}
                this.player.setVelocity(calculatePower*20, 0)
                this.sliderHorizontal.setVelocity(0,0)
                this.sliderHorizontal.body.position.set(90,538)
            }
        }
    }
}