import { Scene } from "phaser";


export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }



    preload() {

        this.load.baseURL = 'assets/'

        this.load.image('clouds', 'country-level/clouds.png')
        this.load.image('sky', 'country-level/sky.png')
        this.load.image('ground', 'country-level/tilesetOpenGame.png')
        this.load.image('water', 'country-level/WaterTextures.png')
        this.load.image('foliage', 'country-level/grass-trees.png')
        this.load.tilemapTiledJSON('map', 'country-level/countryLevel.json')
// parallax images
        this.load.image('background', 'level1-bg/country-platform-back.png')

        this.load.image('adventurer', 'adventurer-idle-00.png')
        

        this.load.atlas('mo-idle', 'small_moidle.png', 'mo-idle-atlas.json')
        this.load.atlas('mo-run', 'small_morun.png', 'mo-run-atlas.json')
        this.load.atlas('idle', 'idle.png', 'player-idle-atlas.json')
        this.load.atlas('player', 'wizard-sheet.png', 'wizard.json')
        console.log(this);
    }

    create() {
        console.log('Loading scene created')

        this.scene.start('level-1-scene')

        // this.cameras.main.setBounds(0, 0, 540, 3840)
       
    }
}