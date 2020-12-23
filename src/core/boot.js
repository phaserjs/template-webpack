export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create() {
        this.scene.start('Loader');
    }
}
