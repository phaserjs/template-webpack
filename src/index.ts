import * as Phaser from 'phaser';
const logoImg =  require('./assets/logo.png');

import ButtonPlugin from 'phaser3-rex-plugins/plugins/button-plugin.js';

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
        createBtn(this, {
            x: 400,
            y: 300,
            color: 0x00cccc,
            name: 'btn0'
        });
        createBtn(this, {
            x: 390,
            y: 360,
            color: 0xcc00cc,
            name: 'btn1'
        });
        createBtn(this, {
            x: 480,
            y: 280,
            color: 0xcccc00,
            name: 'btn2'
        });
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createBtn = function (scene: any, config: any) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var color = GetValue(config, 'color', 0xffffff);
    var name = GetValue(config, 'name', '');

    var btn = scene.add.rectangle(x, y, 120, 120, color)
        .setName(name);
    scene.add.text(x, y, name, {
        fontSize: '20pt'
    })
        .setOrigin(0.5, 0.5)
    btn.button = scene.plugins.get('rexButton').add(btn, {
        // clickInterval: 1000  // ms
    });
    btn.button.on('click', function (button: any, gameObject: any) {
        scene.print.text += `click ${gameObject.name}\n`;
    });
    return btn;
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    plugins: {
        global: [{
            key: 'rexButton',
            plugin: ButtonPlugin,
            start: true
        },
        // ...
        ]
    }
};

const game = new Phaser.Game(config);