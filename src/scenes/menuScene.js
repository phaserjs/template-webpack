class menuScene extends Phaser.Scene {
    constructor (){
        super('menu');
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

        const menuBtn = this.add.image(400, 700, 'menuBtn');
        menuBtn.setScale(0.9);
        menuBtn.setInteractive({ useHandCursor: true });
        menuBtn.setInteractive();

      

        menuBtn.on('pointerover', function () {
            // akcia pre hover
            this.scene.tweens.add({
                targets: menuBtn,
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 200,
                ease: 'Power2'
            });
            
        });
    
        menuBtn.on('pointerout', function () {
            // akcia pre opustenie hoveru
            this.scene.tweens.add({
                targets: menuBtn,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 200,
                ease: 'Power2'
            });
        });
    
        var currentScene = this;
        menuBtn.on('pointerdown', function () {
            // akcia pre kliknutie
            currentScene.scene.start('levelMenu');
        });
       
        
        this.createTextOnBtn();
        this.createLabel();

        
        
    }


    createLabel(){

        var text1 = this.add.text(150, 300, 'FROM', { 
            fontSize: '50px',  
            fontFamily:'Montserrat',
            color:'white',
            fontStyle:'900',
        });
        text1.setOrigin(0.5);
    

        var text2 = this.add.text(430, 300, 'NIGHTMARES', { 
            fontSize: '50px',  
            fontFamily:'Montserrat',
            color:'#121212',
            fontStyle:'900',
        });
        text2.setOrigin(0.5);
    
        var text3 = this.add.text(110, 360, 'TO', { 
            fontSize: '50px',  
            fontFamily:'Montserrat',
            color:'white',
            fontStyle:'900',
        });
        text3.setOrigin(0.5);
    
        var text4 = this.add.text(280, 360, 'DREAMS', { 
            fontSize: '50px',  
            fontFamily:'Montserrat',
            color:'#F184CC',
            fontStyle:'900',
        });
        text4.setOrigin(0.5);
    }

    createTextOnBtn(){

        var text = this.add.text(400, 700, 'START', { 
            fontSize: '40px',  
            fontFamily:'Montserrat',
            color:'white',
            fontStyle:'900',
        });
        text.setOrigin(0.5);

    }
}


