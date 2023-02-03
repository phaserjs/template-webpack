import Phaser from 'phaser';
//const logoImg = require('./assets/logo.png');

import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilterpipeline-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import 'phaser/plugins/spine/dist/SpinePlugin';
import Demo from './gridtable';
import Goblin from './spinework';


class MyGame extends Phaser.Scene
{
    preload ()
    {
        //this.load.image('logo', logoImg);
    }
      
    create ()
    {
        // const logo = this.add.image(400, 150, 'logo');
      
        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: "Power2",
        //     yoyo: true,
        //     loop: -1
        // });

    }
}

const GetValue = Phaser.Utils.Objects.GetValue;


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#cdcdcd',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,//window.innerWidth * window.devicePixelRatio,
        height: 600//window.innerHeight * window.devicePixelRatio,
    },

    //parent: 'phaser-example',

    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //       gravity: { y: 0 },
    //       debug: false,
    //     },
    //   },
    
    plugins: {
        global: [
            {
                key: 'rexGlowFilterPipeline',
                plugin: GlowFilterPipelinePlugin,
                start: true,
              },
              {
                key: 'rexOutlinePipeline',
                plugin: OutlinePipelinePlugin,
                start: true,
              },
        ],
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' },
            { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI'}
          ],
    },

    scene: [Goblin],
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
//const game = new Phaser.Game(config);