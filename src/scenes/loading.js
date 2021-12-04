import { Scene } from "phaser";


export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }

    preload() {

        this.load.baseURL = 'assets/'

        this.load.image('clouds', 'tilemaps/country-level/clouds.png')
        this.load.image('sky', 'tilemaps/country-level/sky.png')
        this.load.image('ground', 'tilemaps/country-level/tilesetOpenGame.png')
        this.load.image('water', 'tilemaps/country-level/WaterTextures.png')
        this.load.image('foliage', 'tilemaps/country-level/grass-trees.png')
        this.load.tilemapTiledJSON('map', 'tilemaps/country-level/countryLevel.json')
        // parallax images
        this.load.image('background', 'tilemaps/country-level/level1-bg/country-platform-back.png')

        this.load.image('adventurer', 'sprites/img/adventurer-idle-00.png')


        this.load.atlas('mo-idle', 'sprites/anims/small_moidle.png', 'sprites/atlas/mo-idle-atlas.json')
        this.load.atlas('mo-run', 'sprites/anims/small_morun.png', 'sprites/atlas/mo-run-atlas.json')
        this.load.atlas('player', 'sprites/anims/wizard-sheet.png', 'sprites/atlas/wizard.json')

    }

    create() {
        console.log('Loading scene created')

        this.scene.start('level-1-scene')



    }
}