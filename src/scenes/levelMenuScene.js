

class levelMenuScene extends Phaser.Scene {
    constructor (){
        super('levelMenu');
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

        this.add.text(100, 100, 'CHOSE LEVEL', { fontSize: '60px', fill: '#fff' }).setFontFamily('Montserrat')
        .setFontStyle('900');
        
        // add level selection
        // Create a button for each level
        levels.forEach((level, index) => {
            const x = this.cameras.main.centerX;
            const y = 200 + index * 80;
    
            const button = this.add.text(x, y, `${level.name} (Difficulty: ${level.difficulty})`, {
            fontSize: '32px',
            fontFamily: 'Montserrat',
            fill: level.completed ? '#00ff00' : '#ffffff'
            }).setOrigin(0.5);
    
            button.setInteractive();
    
            // Add a click event to the button
            button.on('pointerup', () => {
            this.scene.start(level.scene);
            });
        });

    }
}