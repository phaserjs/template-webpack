import 'phaser';

export default class Scene extends Phaser.Scene {
    create() {
        this.add.image(400, 300, 'logo');
        console.log('BEEBUG: this', this);
    }
}
