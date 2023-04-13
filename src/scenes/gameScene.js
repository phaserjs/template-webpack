import 'phaser';
import logoImg from '../assets/logo.png';

export default class gameScene extends Phaser.Scene {
    constructor (){
        super('game');
    }

    preload ()
    {
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}