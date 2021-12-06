import { Scene, Curves, Display } from 'phaser'
import { Player } from '../classes/player'
import { Trigger } from '../classes/triggers'

export class Level4 extends Scene {
  constructor () {
    super('level-4-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.enemySetup()
    this.triggerSetup()
    this.cameraSetup()


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
    this.scene.start('level-45-scene')
  }

  initMap () {
    // creating bg
    this.add.image(400, 300, 'level4Bg1').setScale(3)
      .setScrollFactor(0)
    this.add.image(400, 500, 'level4Bg2')
      .setScrollFactor(0.1)
    this.add.image(400, 220, 'level4Bg4')
      .setScrollFactor(0.3)
    this.add.image(400, 600, 'level4Bg5')
      .setScrollFactor(0.5)
    this.add.tileSprite(400, 450, 8000, 1000, 'level4Bg6')
      .setScrollFactor(0.8)
    // creating tilemap
    const level4map = this.make.tilemap({ key: 'level4-map' })
    const cloudTileSetLevel4 = level4map.addTilesetImage('cloud_tileset', 'level4Clouds')
    const tileSetLevel4 = level4map.addTilesetImage('Terrain', 'level4Ground')
    const breakTiles = level4map.addTilesetImage('Retro-Lines-Tiles-transparent', 'level45')
    // creating layers to reflect tilemap layers - order matters for rendering
    this.jumpLayer = level4map.createLayer('Collision', tileSetLevel4)
    this.water = level4map.createLayer('Water', cloudTileSetLevel4, 0, 0)
    level4map.createLayer('Etc', cloudTileSetLevel4, 0, 0)
    this.platforms = level4map.createLayer('Platforms', cloudTileSetLevel4, 0, 0)
    this.ground = level4map.createLayer('Land', tileSetLevel4, 0, 0)
    level4map.createLayer('Break', breakTiles)
    // setting collision property to ground
    this.ground.setCollisionByExclusion(-1, true)
    this.water.setCollisionByExclusion(-1, true)
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

  enemySetup () {

  }

  triggerSetup () {
    this.trigger = new Trigger(this, 4320, 944)
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
    if (this.player.hp > 0) {
      this.player.update()
    } else {
      this.player.die()
    }
  }
}
