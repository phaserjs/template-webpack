import { Scene, Math, Curves, Display } from 'phaser'
// import { Enemy1 } from '../classes/enemies/enemy-1'
import { Player } from '../classes/player'

export class Level5 extends Scene {
  constructor () {
    super('level-5-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    // this.pathSetup()
    this.colliderSetup()
    this.cameraSetup()
    this.debugSetup()
  }

  initMap () {
    // creating tilemap
    const map = this.make.tilemap({ key: 'level5-map' })
    const tilesetBackground = map.addTilesetImage('background', 'level5-bg')
    const tilesetGround = map.addTilesetImage('tiles', 'level5-ground')
    const tilesetPlatforms = map.addTilesetImage('platform', 'platforms')

    // linking pngs to tileset names in the map
    // creating layers to reflect tilemap layers - order matters for rendering
    this.jumpLayer = map.createLayer('Collision Horizontal', tilesetGround, 0, 0)
    map.createLayer('Background', tilesetBackground)
    this.platforms = map.createLayer('Platforms', tilesetPlatforms)
    map.createLayer('Ground Cover', tilesetGround)
    map.createLayer('Rock1', tilesetGround)
    map.createLayer('Rock2', tilesetGround)
    // setting collision property to ground
    this.jumpLayer.setCollisionByExclusion(-1, true)
    this.platforms.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 0, 1600)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 6000, 5760)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 20)
    this.cameras.main.setBounds(0, 0, 6000, 1920)
  }

  colliderSetup () {
    this.physics.world.addCollider(this.player, this.jumpLayer, () => {
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
    this.jumpLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.platforms.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.mouseCoords = this.add.text(50, 25)

    const graphics = this.add.graphics()

    graphics.lineStyle(1, 0xffffff, 1)

    // this.curve.draw(graphics, 64)
    // this.flying.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1)
  }

  update () {
    this.player.update()

    // this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    // this.mouseCoords.x = this.player.x
  }
}
