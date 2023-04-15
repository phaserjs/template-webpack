
class controlsScene extends Phaser.Scene {
    constructor (){
        super('controls');
    }

    preload ()
    {
        
    }
      
    create ()
    {
        // background image
        const menuBackground = this.add.image(0, 0, 'menuBackgroundBlur');
        menuBackground.setOrigin(0);
        menuBackground.setScale(this.cameras.main.width / menuBackground.width, this.cameras.main.height / menuBackground.height);

        this.add.text(game.config.width / 2, 200, 'CONTROLS', { fontSize: '60px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        // RULES
        this.add.image(230, 350, 'spaceBar').setScale(0.7);
        this.add.image(550, 350, 'powerBar').setScale(0.7);

        this.add.text(game.config.width / 2, 500, 'USE SPACEBAR TO', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        this.add.text(game.config.width / 2, 530, 'CONTROLS POWER OF', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        this.add.text(game.config.width / 2, 560, 'YOUR JUMP TO THE NEXT', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        this.add.text(game.config.width / 2, 590, 'PLATFORM', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        const menuBtn = this.add.image(400, 800, 'menuBtn');
        menuBtn.setScale(0.9);
        menuBtn.setInteractive({ useHandCursor: true });
        menuBtn.setInteractive();

        var text = this.add.text(400, 800, 'BACK', { 
            fontSize: '40px',  
            fontFamily:'Montserrat',
            color:'white',
            fontStyle:'900',
            stroke: '#000000',
            strokeThickness: 8
        });
        text.setOrigin(0.5);

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
            currentScene.scene.start('menu');
        });
    }
}