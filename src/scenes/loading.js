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

    // load audio
    this.load.audio('level1BgAudio', ['ui/audio/Idea.mp3'])
    this.load.audio('playerDamageAudio', ['ui/audio/TakeDamage.mp3'])
    this.load.audio('enemyDamage', ['ui/audio/enemy-hurt.mp3'])

    // enemy health
    this.load.image('enemy-red-bar', 'ui/health/Pixel1_Healthbar_border.png')
    this.load.image('enemy-shadow-bar', 'ui/health/Pixel1_Healthbar.png')
    // player health
    this.load.image('green-bar', 'ui/health/health_bar_decoration.png')
    this.load.image('red-bar', 'ui/health/health_bar.png')

    // level 1
    this.load.image('clouds', 'tilemaps/level-1/clouds.png')
    this.load.image('ground', 'tilemaps/level-1/tilesetOpenGame.png')
    this.load.image('water', 'tilemaps/level-1/WaterTextures.png')
    this.load.image('foliage', 'tilemaps/level-1/grass-trees.png')
    this.load.image('house', 'tilemaps/level-1/Village-Endesga-Buildings.png')
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

    // level 5
    this.load.image('level5-bg', 'tilemaps/level-5/background.png')
    this.load.image('level5-ground', 'tilemaps/level-5/tiles.png')
    this.load.image('platforms', 'tilemaps/level-5/platform.png')
    this.load.tilemapTiledJSON('level5-map', 'tilemaps/level-5/underwater-level.json')

    // player sprite
    this.load.image('adventurer', 'sprites/img/adventurer-idle-00.png')

    // load sprite atlases
    this.load.atlas('gen-mob-1', 'sprites/anims/gen-mob-1.png', 'sprites/atlas/gen-mob-1-atlas.json')
    this.load.atlas('gen-mob-2', 'sprites/anims/gen-mob-2.png', 'sprites/atlas/gen-mob-2-atlas.json')
    this.load.atlas('gen-mob-3', 'sprites/anims/gen-mob-3.png', 'sprites/atlas/gen-mob-3-atlas.json')
    this.load.atlas('gen-mob-4', 'sprites/anims/gen-mob-4.png', 'sprites/atlas/gen-mob-4-atlas.json')
    this.load.atlas('player', 'sprites/anims/wizard-sheet.png', 'sprites/atlas/wizard.json')
    this.load.atlas('viking', 'sprites/anims/viking2.png', 'sprites/atlas/viking-atlas.json')
    this.load.atlas('sushi-hands', 'sprites/anims/sushi-hands.png', 'sprites/atlas/hand-sushi-boss-atlas.json')
    this.load.atlas('prue-boss', 'sprites/anims/prue-boss.png', 'sprites/atlas/prue-boss-atlas.json')
    this.load.atlas('ahmad-boss', 'sprites/anims/ahmad-boss.png', 'sprites/atlas/ahmad-boss-atlas.json')

    // bullets
    this.load.atlas('mon-bullet', 'sprites/anims/mon-bullet.png', 'sprites/atlas/mon-bullet-atlas.json')
    this.load.atlas('ice-bullet', 'sprites/anims/ice-bullet.png', 'sprites/atlas/ice-bullet-atlas.json')

    this.load.atlas('water-bullet', 'sprites/anims/water-bullet.png', 'sprites/atlas/water-bullet-atlas.json')
    this.load.atlas('water-bullet-impact', 'sprites/anims/water-bullet-impact.png', 'sprites/atlas/water-bullet-impact-atlas.json')

    // golem
    this.load.atlas('golem-dead', 'sprites/anims/golempack/GolemDead.png', 'sprites/atlas/golemAtlas/dead-atlas.json')
    this.load.atlas('golem-punch', 'sprites/anims/golempack/GolemDoublePunch.png', 'sprites/atlas/golemAtlas/punch-atlas.json')
    this.load.atlas('golem-idle', 'sprites/anims/golempack/GolemIdle.png', 'sprites/atlas/golemAtlas/idle-atlas.json')
    this.load.atlas('golem-walk', 'sprites/anims/golempack/GolemWalk.png', 'sprites/atlas/golemAtlas/walk-atlas.json')

    // them peeps
    this.load.atlas('jared', 'sprites/anims/jared-spritesheet.png', 'sprites/atlas/facilitator-atlas.json')
  }

  create () {
    this.scene.start('title-scene')
  }
}
