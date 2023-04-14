class Game extends Phaser.Game {
    constructor ()
    {
        super(config);
        this.scene.add('game', gameScene);
        this.scene.add('boot', bootScene);
        this.scene.add('preload', preloadScene);
        this.scene.add('levelMenu', levelMenuScene);
        this.scene.add('menu', menuScene);
        this.scene.add('Level1Scene', level1Scene);
        this.scene.add('Level2Scene', level2Scene);
        this.scene.add('Level3Scene', level3Scene);
        this.scene.add('Level4Scene', level4Scene);
        this.scene.start('boot');
    }
}

window.onload = () => {
    window.game = new Game();
}