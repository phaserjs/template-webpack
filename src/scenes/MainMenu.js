import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    init ()
    {
        // Fadein camera
        this.cameras.main.fadeIn(500);
        this.lives = 10;
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        // Game Title
        this.add.text(512, 200, 'Set Matching Game', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 12,
            align: 'center'
        }).setOrigin(0.5);

        // Game Rules
        this.add.text(512, 300, `Match sets of 3 cards where each feature
(color, shape, number, shading) is either
all the same or all different`, {
            fontFamily: 'Arial', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Start Button
        const startButton = this.add.rectangle(512, 500, 300, 80, 0xffffff)
            .setInteractive();
        this.add.text(512, 500, 'START', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        startButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
