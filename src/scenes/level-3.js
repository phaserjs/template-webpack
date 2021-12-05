import { Scene, Math, Curves, Display } from 'phaser'
import { Boss3 } from '../classes/enemies/boss3'
import { Boss4 } from '../classes/enemies/boss4'
import { Enemy1 } from '../classes/enemies/enemy-1'
import { Player } from '../classes/player'
// import { Boss3 } from '../classes/enemies/boss3'

export class Level3 extends Scene {
  constructor () {
    super('level-3-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.colliderSetup()
    this.cameraSetup()
    this.debugSetup()
    this.enemySetup()
  }

  initMap () {
    // creating bg
    const level3Bg = this.add.image(400, 300, 'level3Bg').setScale(3)
      .setScrollFactor(0)
    this.add.tileSprite(200, 4000, 4500, 350, 'level3Mountain1')
      .setScrollFactor(0.7, 0.7)
    this.add.tileSprite(200, 3800, 4500, 350, 'level3Mountain2')
      .setScrollFactor(0.4, 0.4)

    // creating tilemap
    const level3map = this.make.tilemap({ key: 'level3-map' })
    const tileSetLevel2 = level3map.addTilesetImage('Wasteland-Files', 'level3-tiles')
    // linking pngs to tileset names in the map
    // creating layers to reflect tilemap layers - order matters for rendering
    this.platforms = level3map.createLayer('Platform', tileSetLevel2, 0, 0)
    level3map.createLayer('Water', tileSetLevel2, 0, 0)
    level3map.createLayer('Etc', tileSetLevel2, 0, 0)
    // setting collision property to ground
    this.platforms.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 100, 300)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 1920, 5760)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 20)
    this.cameras.main.setBounds(0, 0, 1920, 5760)
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

  enemySetup () {
    this.boss = new Boss3(this, 300, 200)
    this.bossTest = new Boss4(this, 600, 200)
    console.log(this.boss)
    console.log(this.bossTest)
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

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }
    if (this.bossTest.hp > 0) {
      this.bossTest.update()
    } else if (this.bossTest.active) {
      this.bossTest.die()
    }

    this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    this.mouseCoords.x = this.player.x
  }
}
