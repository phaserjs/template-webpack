
class gameRulesScene extends Phaser.Scene {
    constructor (){
        super('gameRules');
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

        this.add.text(game.config.width / 2, 200, 'GAME RULES', { fontSize: '60px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);

        // RULES
        this.add.image(230, 350, 'gameRules').setScale(0.7);
        this.add.text(380, 300, 'GET TO THE TOP', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')

        this.add.text(380, 330, 'PLATFORM AND SAVE', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text(380, 360, 'THE GHOST', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        // second segment
        this.add.image(550, 600, 'rulesLevel').setScale(0.7);
        this.add.text(130, 520, 'COMPLETE  LEVEL AND', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900')

        this.add.text(130, 550, 'UNLOCK THE NEXT.', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text(130, 580, 'COMPLETE EACH LEVEL', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text(130, 610, 'FROM NIGHTMARES TO', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

        this.add.text(130, 640, 'DREAMS', { fontSize: '20px', fill: '#fff', stroke: '#000000',strokeThickness: 8 })
        .setFontFamily('Montserrat')
        .setFontStyle('900');

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