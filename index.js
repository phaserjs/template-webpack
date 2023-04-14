class Game extends Phaser.Game {
    constructor ()
    {
        super(config);
        this.scene.add('game', gameScene);
        this.scene.add('boot', bootScene);
        this.scene.add('preload', preloadScene);
        this.scene.add('levelMenu', levelMenuScene);
        this.scene.start('boot');
    }
}

window.onload = () => {
    window.game = new Game();
}