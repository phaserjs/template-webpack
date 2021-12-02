// import Phaser from 'phaser';
// import water from './assets/country-level/WaterTextures.png'
// import map from './assets/country-level/test2.json'


// class MyGame extends Phaser.Scene
// {
//     constructor (key)
//     {
//         super(key);
//     }

//     preload ()
//     {
//       this.load.image("water", water, {
//         frameWidth: 16,
//         frameHeight: 16
//       });
//       this.load.tilemapTiledJSON("map", map, {
//         frameWidth: 16,
//         frameHeight: 16
//       });
//     }

//     create ()
//     {
//       // this.add.image(0,0, 'grass')
//       const map = this.make.tilemap({key:'map'});
//       const tileset = map.addTilesetImage("tiles", "water", 16, 16);
//       console.log(tileset);
//       map.createLayer( "water", tileset);
//       console.log(map.layers);
//     }
// }

// const config = {
//     type: Phaser.WEBGL,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     scene: MyGame
// };

// const game = new Phaser.Game(config);
