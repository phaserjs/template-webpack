import { Scene, Math, Curves, Display } from 'phaser'
import { Player } from '../classes/player'
import { Trigger } from '../classes/triggers'

export class Level4 extends Scene {
  constructor () {
    super('level-4-scene')
  }

  create () {
    //   this.input.on('pointerdown', () =>
    // this.scene.start('level-45-scene'), console.log('loading scene 4.5'))

    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.colliderSetup()
    this.cameraSetup()
    this.debugSetup()
    this.trigger = new Trigger(this, 4320, 944)
  }

  changeScene () {
    this.scene.start('level-45-scene')
  }

  initMap () {
    // creating bg
    const level4Bg = this.add.image(400, 300, 'level4Bg1').setScale(3)
      .setScrollFactor(0)
    this.add.image(400,500, 'level4Bg2')
    .setScrollFactor(0.1)
    this.add.image(400, 220, 'level4Bg4')
    .setScrollFactor(0.3)
    this.add.image(400,600, 'level4Bg5')
    .setScrollFactor(0.5)
    this.add.tileSprite(400,450, 8000, 1000, 'level4Bg6')
    .setScrollFactor(0.8)
    // creating tilemap
    const level4map = this.make.tilemap({ key: 'level4-map' })
    const cloudTileSetLevel4 = level4map.addTilesetImage('cloud_tileset', 'level4Clouds')
    const tileSetLevel4 = level4map.addTilesetImage('Terrain', 'level4Ground')
    const breakTiles = level4map.addTilesetImage('Retro-Lines-Tiles-transparent', 'level45')
    // creating layers to reflect tilemap layers - order matters for rendering
    this.collider = level4map.createLayer('Collision', tileSetLevel4)
    level4map.createLayer('Water', cloudTileSetLevel4, 0, 0)
    level4map.createLayer('Etc', cloudTileSetLevel4, 0, 0)
    this.platforms = level4map.createLayer('Platforms', cloudTileSetLevel4, 0, 0)
    this.ground = level4map.createLayer('Land', tileSetLevel4, 0, 0)
    level4map.createLayer('Break', breakTiles)
    // setting collision property to ground
    this.ground.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 100, 930)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 4800, 1088)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 20)
    this.cameras.main.setBounds(0, 0, 4800, 1088)
  }

  colliderSetup () {
    this.physics.world.addCollider(this.player, this.collider, () => {
        this.player.canJump = true
        this.player.jumpCount = 2
      })
      this.physics.world.addCollider(this.player, this.ground)
  }

  pathSetup () {
    const points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400]
    const points1 = [50, 400, 135, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    this.curve = new Curves.Spline(points1)
    this.flying = new Curves.Spline(flyingPoints)
  }

  debugSetup () {
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.platforms.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.mouseCoords = this.add.text(50, 25)

    const graphics = this.add.graphics()

    graphics.lineStyle(1, 0xffffff, 1)

    this.curve.draw(graphics, 64)
    this.flying.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1)
  }

  update () {
    this.player.update()

    this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    this.mouseCoords.x = this.player.x
  }
}
