import { Scene, Math, Curves, Display } from 'phaser'
import { Player } from '../classes/player'
import { Trigger } from '../classes/triggers'

export class Level45 extends Scene {
  constructor () {
    super('level-45-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.colliderSetup()
    this.cameraSetup()
    this.debugSetup()
  }

  initMap () {
    // creating tilemap
    const level45map = this.make.tilemap({ key: 'level45-map' })
    const tileSetLevel45 = level45map.addTilesetImage('Retro-Lines-Tiles-transparent', 'level45')
    level45map.addTilesetImage('Background', tileSetLevel45)
    level45map.createLayer('Etc', tileSetLevel45)
    // creating layers to reflect tilemap layers - order matters for rendering
    this.platforms = level45map.createLayer('Platform', tileSetLevel45, 0, 0)
    this.water = level45map.createLayer('Waterfall', tileSetLevel45)
    // setting collision property to ground
    this.platforms.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 4320, 944)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 4800, 1088)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 20)
    this.cameras.main.setBounds(0, 0, 4800, 1088)
  }

  colliderSetup () {
    this.physics.world.addCollider(this.player, this.platforms, () => {
      this.player.canJump = true
      this.player.jumpCount = 2
    })
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
    // this.platforms.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Display.Color(243, 234, 48, 255)
    // })
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
