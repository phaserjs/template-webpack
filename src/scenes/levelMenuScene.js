

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

        this.add.text(game.config.width / 2, 200, 'CHOSE LEVEL', { fontSize: '60px', fill: '#fff' })
        .setFontFamily('Montserrat')
        .setFontStyle('900')
        .setOrigin(0.5);
        
        // add level selection
        // Create a button for each level
        levels.forEach((level, index) => {
            const x = 180 + index * 150;
            const y = 400;

            // level preview image
            const levelImage = this.add.image(x, y+55, level.mapName + 'preview');
            levelImage.setScale(0.5);

            // create a graphics object
            const graphics = this.add.graphics();

            // draw a circle
            graphics.fillStyle(0x7bcffe, 1);
            graphics.fillCircle(x, y, 30);

            // create number of level
            this.add.text(x, y, index+1, {fontSize: '20px',color: '#ffffff',})
            .setFontFamily('Montserrat')
            .setFontStyle('900')
            .setOrigin(0.5);

            // display level difficulty
            const difficultyColor = this.getDifficultycolor(level.difficulty);
            this.add.text(x, y+90, level.difficulty, {fontSize: '20px',color: difficultyColor,})
            .setFontFamily('Montserrat')
            .setFontStyle('900')
            .setOrigin(0.5);


            if(level.completed){
                for (let i=0; i<level.score; i++) {
                    this.add.text(x - 20 + i*20, y+60, '⭐️', {fontSize: '15px'})
                    .setOrigin(0.5);
                }
            }

            // display lock on level or add button start
            if (!level.unlocked){
                this.add.text(x, y+60, 'Locked', {fontSize: '15px',color: '#ffffff',})
                .setFontFamily('Montserrat')
                .setFontStyle('600')
                .setOrigin(0.5);
            }else{
                const buttonImage = this.add.image(x, y+150, 'button');
                buttonImage.setScale(0.35);
                const button = this.add.text(x, y+150, 'START', {fontSize: '20px',color: '#ffffff',})
                .setFontFamily('Montserrat')
                .setFontStyle('900')
                .setOrigin(0.5);
        
                button.setInteractive();
        
                // Add a click event to the button
                button.on('pointerup', () => {
                    this.scene.start(level.scene);
                });
            }
        });
    }

    getDifficultycolor(difficulty){
        switch(difficulty){
            case 'EASY': return '#58FF55';
            case 'MEDIUM': return '#FFBB55';
            case 'HARD':return '#FF5555';
        }
    }
}