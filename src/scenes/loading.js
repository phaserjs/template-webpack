import { Scene } from 'phaser'

export class LoadingScene extends Scene {
  constructor () {
    super('loading-scene')
  }

  preload () {
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
    this.load.image('ground', 'tilemaps/level-1/tilesetOpenGame.png')
    this.load.image('water', 'tilemaps/level-1/WaterTextures.png')
    this.load.image('foliage', 'tilemaps/level-1/grass-trees.png')
    this.load.image('house', 'tilemaps/level-1/Village-Endesga-Buildings.png' )
    this.load.tilemapTiledJSON('map', 'tilemaps/level-1/countryLevel.json')
    // level 1 parallax images
    this.load.image('background', 'tilemaps/level-1/country-platform-back.png')
    this.load.image('foreground', 'tilemaps/level-1/country-platform-forest.png')

    // level 2
    this.load.image('level2-tiles', 'tilemaps/level-2/kitchen-shee-flattenedt.png')
    this.load.image('level2Bg', 'tilemaps/level-2/tileset.png')
    this.load.image('level2Water', 'tilemaps/level-2/Water.png')
    this.load.tilemapTiledJSON('level2-map', 'tilemaps/level-2/eleanor.json')

    // level 3
    this.load.image('level3-tiles', 'tilemaps/level-3/Wasteland-Files.png')
    this.load.tilemapTiledJSON('level3-map', 'tilemaps/level-3/Ahmad2.json')
    // level 3 parallax images
    this.load.image('level3Bg', 'tilemaps/level-3/Wasteland_Sky.png')
    this.load.image('level3Mountain1', 'tilemaps/level-3/Wasteland_Mountains_1.png')
    this.load.image('level3Mountain2', 'tilemaps/level-3/Wasteland_Mountains_2.png')

    // level 4
    this.load.image('level4Clouds', 'tilemaps/level-4/cloud_tileset.png')
    this.load.image('level4Ground', 'tilemaps/level-4/Terrain.png')
    this.load.tilemapTiledJSON('level4-map', 'tilemaps/level-4/caro.json')
    // level 4 parallax images
    this.load.image('level4Bg1', 'tilemaps/level-4/layer06_sky.png')
    this.load.image('level4Bg2', 'tilemaps/level-4/layer05_rocks.png')
    this.load.image('level4Bg4', 'tilemaps/level-4/layer03_trees.png')
    this.load.image('level4Bg5', 'tilemaps/level-4/layer02_cake.png')
    this.load.image('level4Bg6', 'tilemaps/level-4/layer01_ground.png')

    // level 4.5
    this.load.image('level45', 'tilemaps/level-4.5/Retro-Lines-Tiles-transparent.png')
    this.load.tilemapTiledJSON('level45-map', 'tilemaps/level-4.5/caro2.json')

    // player sprite
    this.load.image('adventurer', 'sprites/img/adventurer-idle-00.png')

    // load sprite atlases
    this.load.atlas('enemy', 'sprites/anims/testBoss.png', 'sprites/atlas/enemy-1-atlas.json')
    this.load.atlas('player', 'sprites/anims/wizard-sheet.png', 'sprites/atlas/wizard.json')
    this.load.atlas('viking', 'sprites/anims/viking2.png', 'sprites/atlas/viking-atlas.json')
    this.load.atlas('sushi-hands', 'sprites/anims/hand-sushi-boss.png', 'sprites/atlas/hand-sushi-boss-atlas.json')
  }

  create () {
    this.scene.start('title-scene')
  }
}
