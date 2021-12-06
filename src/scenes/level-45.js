import { Scene, Curves, Display } from 'phaser'
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
    this.enemySetup()
    this.triggerSetup()
    this.cameraSetup()
    this.debugSetup()

    // change position if needed (but use same position for both images)
    var backgroundBar = this.add.image(150, 50, 'green-bar')
    backgroundBar.setScrollFactor(0)

    this.playerHealthBar = this.add.image(155, 50, 'red-bar')
    this.playerHealthBar.setScrollFactor(0)
    console.log(this.playerHealthBar)

    // add text label to left of bar
    this.healthLabel = this.add.text(40, 40, 'Health', { fontSize: '20px', fill: '#ffffff' })
    this.healthLabel.setScrollFactor(0)

    this.enemyHealthBar = this.add.image(3450, 34, 'enemy-shadow-bar')
    this.add.image(3450, 22, 'enemy-red-bar')
    this.add.text(3250, 40, 'Boss Health', { fontSize: '20px', fill: '#ffffff' })
  }

  changeScene () {
    this.scene.start('level-5-scene')
  }

  initMap () {
    // creating tilemap
    const level45map = this.make.tilemap({ key: 'level45-map' })
    const tileSetLevel45 = level45map.addTilesetImage('Retro-Lines-Tiles-transparent', 'level45')
    this.jumpLayer = level45map.createLayer('Collision', tileSetLevel45)
    level45map.addTilesetImage('Background', tileSetLevel45)
    level45map.createLayer('Etc', tileSetLevel45)
    // creating layers to reflect tilemap layers - order matters for rendering
    this.platforms = level45map.createLayer('Platform', tileSetLevel45, 0, 0)
    this.water = level45map.createLayer('Waterfall', tileSetLevel45)
    // setting collision property to ground
    this.platforms.setCollisionByExclusion(-1, true)
    this.water.setCollisionByExclusion(-1, 0)
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

  enemySetup () {

  }

  triggerSetup () {
    this.endLevel = new Trigger(this, 1000, 300)
  }

  pathSetup () {
    const points1 = [50, 400, 135, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    this.curve = new Curves.Spline(points1)
    this.flying = new Curves.Spline(flyingPoints)
  }

  debugSetup () {
    this.input.on('pointerdown', () => {
      this.player.godMode = !this.player.godMode
    })

    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.platforms.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.mouseCoords = this.add.text(50, 25)
    this.godMode = this.add.text(50, 45)
    this.playerHealth = this.add.text(50, 65)
    this.playerAmmo = this.add.text(50, 85)

    this.getPlayer = this.input.keyboard.addKey('P')

    const graphics = this.add.graphics()

    graphics.lineStyle(1, 0xffffff, 1)

    this.curve.draw(graphics, 64)
    this.flying.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1)

    this.scene1 = this.input.keyboard.addKey('ONE')
    this.scene2 = this.input.keyboard.addKey('TWO')
    this.scene3 = this.input.keyboard.addKey('THREE')
    this.scene4 = this.input.keyboard.addKey('FOUR')
    this.scene5 = this.input.keyboard.addKey('FIVE')
  }

  debugUpdate () {
    this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    this.mouseCoords.x = this.player.x
    this.mouseCoords.y = this.player.y - 80
    this.godMode.setText('God mode: ' + this.player.godMode)
    this.godMode.x = this.player.x
    this.godMode.y = this.player.y - 100
    this.playerHealth.setText('Health: ' + this.player.hp)
    this.playerHealth.x = this.player.x
    this.playerHealth.y = this.player.y - 120
    this.playerAmmo.setText('Ammo: ' + this.player.gun.children.entries.length)
    this.playerAmmo.x = this.player.x
    this.playerAmmo.y = this.player.y - 140

    if (this.getPlayer.isDown) {
      console.log(this.player)
    }
    if (this.scene1.isDown) {
      this.scene.start('level-1-scene')
    }
    if (this.scene2.isDown) {
      this.scene.start('level-2-scene')
    }
    if (this.scene3.isDown) {
      this.scene.start('level-3-scene')
    }
    if (this.scene4.isDown) {
      this.scene.start('level-4-scene')
    }
    if (this.scene5.isDown) {
      this.scene.start('level-5-scene')
    }
  }

  update () {
    this.debugUpdate()

    if (this.player.hp > 0) {
      this.player.update()
    } else {
      this.player.die()
    }
  }
}
