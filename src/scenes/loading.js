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
        this.load.image('clouds', 'tilemaps/level-1/clouds.png')
        this.load.image('sky', 'tilemaps/level-1/sky.png')
        this.load.image('ground', 'tilemaps/level-1/tilesetOpenGame.png')
        this.load.image('water', 'tilemaps/level-1/WaterTextures.png')
        this.load.image('foliage', 'tilemaps/level-1/grass-trees.png')
        this.load.tilemapTiledJSON('map', 'tilemaps/level-1/countryLevel.json')
        // level 1 parallax images
        this.load.image('background', 'tilemaps/level-1/country-platform-back.png')
        this.load.image('foreground', 'tilemaps/level-1/country-platform-forest.png')

        // level 3
        this.load.image('level2-tiles', 'tilemaps/level-3/Wasteland-Files.png')
        this.load.tilemapTiledJSON('level3-map', 'tilemaps/level-3/Ahmad2.json')
        // level 3 parallax images
        this.load.image('level3Bg', 'tilemaps/level-3/Wasteland_Sky.png')
        this.load.image('level3Mountain1', 'tilemaps/level-3/Wasteland_Mountains_1.png')
        this.load.image('level3Mountain2', 'tilemaps/level-3/Wasteland_Mountains_2.png')

        // player sprite
        this.load.image('adventurer', 'sprites/img/adventurer-idle-00.png')

        this.load.atlas('mo-idle', 'sprites/anims/small_moidle.png', 'sprites/atlas/mo-idle-atlas.json')
        this.load.atlas('mo-run', 'sprites/anims/small_morun.png', 'sprites/atlas/mo-run-atlas.json')
        this.load.atlas('player', 'sprites/anims/wizard-sheet.png', 'sprites/atlas/wizard.json')

    }

    create() {
        console.log('Loading scene created')

        this.scene.start('title-scene')
       
    }
}