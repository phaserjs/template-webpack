class Game extends Phaser.Game {
    constructor ()
    {
        super(config);
        this.scene.add('game', gameScene);
        this.scene.add('boot', bootScene);
        this.scene.add('preload', preloadScene);
        this.scene.add('levelMenu', levelMenuScene);
        this.scene.add('menu', menuScene);
        this.scene.add('LevelScene', levelScene);
        this.scene.start('boot');
    }
}

window.onload = () => {
    window.game = new Game();
}