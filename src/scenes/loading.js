import { Scene } from "phaser";


export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }

    preload() {

        this.load.baseURL = 'assets/'

        // level 1
        this.load.image('clouds', 'tilemaps/level-1/clouds.png')
        this.load.image('sky', 'tilemaps/level-1/sky.png')
        this.load.image('ground', 'tilemaps/level-1/tilesetOpenGame.png')
        this.load.image('water', 'tilemaps/level-1/WaterTextures.png')
        this.load.image('foliage', 'tilemaps/level-1/grass-trees.png')
        this.load.tilemapTiledJSON('map', 'tilemaps/level-1/countryLevel.json')

        // parallax images
        this.load.image('background', 'tilemaps/level-1/country-platform-back.png')

        // level 3
        this.load.image('level3-tiles', 'tilemaps/level-3/Wasteland-Files.png')
        this.load.tilemapTiledJSON('level3-map', 'tilemaps/level-3/ahmad.json')

        // player sprite
        this.load.image('adventurer', 'sprites/img/adventurer-idle-00.png')

        // load sprite atlases
        this.load.atlas('mo-idle', 'sprites/anims/small_moidle.png', 'sprites/atlas/mo-idle-atlas.json')
        this.load.atlas('enemy', 'sprites/anims/enemy-1-idle.png', 'sprites/atlas/enemy-1-atlas.json')
        this.load.atlas('player', 'sprites/anims/wizard-sheet.png', 'sprites/atlas/wizard.json')

        
    }
    
    create() {
        console.log('Loading scene created')
        console.log(this)

        this.scene.start('level-1-scene')



    }
}