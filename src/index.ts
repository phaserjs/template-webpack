import * as Phaser from 'phaser';
const logoImg =  require('./assets/logo.png');


class MyGame extends Phaser.Scene
{
    preload ()
    {
        this.load.image('logo', logoImg);
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

const GetValue = Phaser.Utils.Objects.GetValue;



const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    plugins: {
        global: [
            {}
        ]
    }
};

const game = new Phaser.Game(config);