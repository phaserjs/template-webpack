import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.gameData = data;
    }

    create() {
        // Use same background image as Game scene
        this.add.image(512, 384, 'background').setAlpha(0.5);
        
        const style = { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' };
        const titleStyle = { 
            fontFamily: 'Arial Black', 
            fontSize: 48, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8
        };

        // Result message at top
        this.add.text(512, 80, this.gameData.message, titleStyle).setOrigin(0.5);

        // Top left - Player's selected set
        let leftY = 240;  // Increased from 180 for more vertical space
        if (this.gameData.foundSet) {
            this.add.text(150, leftY - 60, 'Your selected set:', style).setOrigin(0, 0.5);
            leftY += 60;  // Increased from 40 for more space between text and cards
            
            let xPos = 150;
            this.gameData.foundSet.forEach(card => {
                const sprite = this.add.sprite(xPos, leftY, card.assetKey);
                sprite.setScale(0.25);
                xPos += 140;
            });
            leftY += 120;
        }

        // Top right - Set stats
        let rightY = 180;
        this.add.text(874, rightY, `Time: ${this.gameData.secondsTaken}`, style).setOrigin(1, 0.5);
        rightY += 40;
        
        if (this.gameData.foundSet && this.gameData.setStats) {
            this.add.text(874, rightY, 'Set characteristics:', style).setOrigin(1, 0.5);
            rightY += 40;
            this.add.text(874, rightY, `Color: ${this.gameData.setStats.colors}`, style).setOrigin(1, 0.5);
            rightY += 30;
            this.add.text(874, rightY, `Number: ${this.gameData.setStats.numbers}`, style).setOrigin(1, 0.5);
            rightY += 30;
            this.add.text(874, rightY, `Shape: ${this.gameData.setStats.shapes}`, style).setOrigin(1, 0.5);
            rightY += 30;
            this.add.text(874, rightY, `Fill: ${this.gameData.setStats.fills}`, style).setOrigin(1, 0.5);
            rightY += 50;
        }

        // All sets from last round (below both columns)
        let allSetsY = Math.max(leftY, rightY) + 60;
        if (this.gameData.validSets && this.gameData.validSets.length > 0) {
            // Single title with tight spacing
            this.add.text(512, allSetsY, `All Sets Last Round (${this.gameData.validSets.length}):`, 
                { ...style, fontSize: 24, align: 'center' }).setOrigin(0.5, 0.5);
            
            // Calculate exact positioning
            const baseScale = 0.1;
            const minScale = 0.07;
            const cardHeight = 150 * baseScale;
            const verticalSpacing = 50; // Increased from 40 for small gap
            const columnSpacing = 150;
            
            // Calculate maximum scale that fits in available space
            const maxSets = this.gameData.validSets.length;
            const availableHeight = 650 - allSetsY - 100; // Space between title and button
            const neededHeight = 3 * cardHeight + 2 * verticalSpacing;
            const heightScale = Math.min(1, availableHeight / neededHeight);
            
            const availableWidth = 900;
            const neededWidth = maxSets * (100 * baseScale) + (maxSets - 1) * columnSpacing;
            const widthScale = Math.min(1, availableWidth / neededWidth);
            
            const scale = Math.max(minScale, baseScale * Math.min(heightScale, widthScale));
            
            // Position sets immediately below title
            const startX = 100;
            const startY = allSetsY + 20; // Adjusted to compensate for extra spacing
            
            // Draw each set in vertical column
            this.gameData.validSets.forEach((set, colIndex) => {
                const columnX = startX + colIndex * (100 * scale + columnSpacing);
                
                // Position cards vertically in column
                set.forEach((card, rowIndex) => {
                    const cardY = startY + rowIndex * (cardHeight + verticalSpacing);
                    const sprite = this.add.sprite(
                        columnX,
                        cardY,
                        card.assetKey
                    ).setScale(scale);
                    sprite.setOrigin(0.5, 0); // Anchor to top center
                });
            });
            
            // Update Y position
            allSetsY = startY + (3 * (cardHeight + verticalSpacing));
        }

        // Continue button at bottom
        this.add.text(512, 700, 'Click anywhere to play again', 
            { ...style, fontSize: 28 }).setOrigin(0.5);
        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
