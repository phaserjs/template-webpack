import { Scene } from "phaser";


export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }



    preload() {

        this.load.baseURL = 'assets/'
// title scene
        this.load.image('titleBg', 'title/parallax-mountain-bg.png')
        this.load.image('titleFarMount', 'title/parallax-mountain-montain-far.png')
        this.load.image('titleMount', 'title/parallax-mountain-mountains.png')
        this.load.image('titleTrees', 'title/parallax-mountain-trees.png')
        this.load.image('titleForeground', 'title/parallax-mountain-foreground-trees.png')
        this.load.image('start-game', 'title/start-game.png')
        this.load.image('game-logo', 'title/game-logo.png')
// level 1
        this.load.image('clouds', 'country-level/clouds.png')
        this.load.image('sky', 'country-level/sky.png')
        this.load.image('ground', 'country-level/tilesetOpenGame.png')
        this.load.image('water', 'country-level/WaterTextures.png')
        this.load.image('foliage', 'country-level/grass-trees.png')
        this.load.tilemapTiledJSON('map', 'country-level/countryLevel.json')
// level 1 parallax images
        this.load.image('background', 'level1-bg/country-platform-back.png')
        this.load.image('foreground', 'level1-bg/country-platform-forest.png')
// level 3
        this.load.image('level2-tiles', 'level3-ahmad-tiles/Wasteland-Files.png')
        this.load.tilemapTiledJSON('level3-map', 'level3-ahmad-tiles/Ahmad2.json')
// level 3 parallax images
        this.load.image('level3Bg', 'level3-ahmad-tiles/Wasteland_Sky.png')
        this.load.image('level3Mountain1', 'level3-ahmad-tiles/Wasteland_Mountains_1.png')
        this.load.image('level3Mountain2', 'level3-ahmad-tiles/Wasteland_Mountains_2.png')

// player sprite
        this.load.image('adventurer', 'adventurer-idle-00.png')
        

        this.load.atlas('mo-idle', 'small_moidle.png', 'mo-idle-atlas.json')
        this.load.atlas('mo-run', 'small_morun.png', 'mo-run-atlas.json')
        this.load.atlas('idle', 'idle.png', 'player-idle-atlas.json')
        this.load.atlas('player', 'wizard-sheet.png', 'wizard.json')
        console.log(this);
    }

    create() {
        console.log('Loading scene created')

        this.scene.start('title-scene')
       
    }
}