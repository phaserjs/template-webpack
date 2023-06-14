import Phaser from 'phaser';
import logoImg from './assets/logo.png';
// import assetsMap from  './assets/assetsmap.png'
import assetsMap from  './assets/tilemap_packed.png'
import mapJson from './assets/map.json'

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {   
        console.log({assetsMap, mapJson})
        this.load.image('tiles', assetsMap)
        this.load.tilemapTiledJSON('map', mapJson)
    }
      
    create ()
    {
        const map = this.make.tilemap({ 'key': 'map'})
        const tileset = map.addTilesetImage('tilemap_packed', 'tiles')

        const ground = map.createLayer('ground', tileset, 0, 0)
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 650,
    height: 650,
    scene: MyGame
};

const game = new Phaser.Game(config);
