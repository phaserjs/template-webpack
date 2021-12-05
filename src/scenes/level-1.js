import { Scene, Math, Curves, Display } from 'phaser'
import { BulletGroup } from '../classes/groups/bullet-group'
import { Enemy1 } from '../classes/enemies/enemy-1'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { MobSpawner } from '../classes/groups/mob-spawner'
import { Boss1 } from '../classes/enemies/boss'
import { Trigger } from '../classes/triggers'

export class Level1 extends Scene {
  constructor () {
    super('level-1-scene')
  }

  create () {
    // this.input.on('pointerdown', () =>
    // this.scene.start('level-3-scene'), console.log('loading scene 2'))

    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.enemySetup()
    this.colliderSetup()
    this.cameraSetup()
    this.debugSetup()
    this.trigger = new Trigger(this, 3745, 448)

    this.input.on('pointerdown', () => {
      this.player.godMode = !this.player.godMode
    })
  }

  changeScene () {
    this.scene.start('level-2-scene')
  }

  initMap () {
    // creating bg
    this.bg = this.add.image(400, 300, 'background').setScale(3).setScrollFactor(0)
    this.add.tileSprite(200, 450, 4500, 350, 'foreground')
      .setScrollFactor(0.5)
    // creating tilemap
    const map = this.make.tilemap({ key: 'map' })
    // linking pngs to tileset names in the map
    const tilesetCloud = map.addTilesetImage('clouds', 'clouds')
    const tilesetGround = map.addTilesetImage('tilesetOpenGame2', 'ground')
    const tilesetWater = map.addTilesetImage('WaterTextures', 'water')
    const tilesetFoliage = map.addTilesetImage('grass-trees', 'foliage')
    const tilesetHouse = map.addTilesetImage('Village-Endesga-Buildings', 'house')

    // creating layers to reflect tilemap layers - order matters for rendering
    const clouds = map.createLayer('Clouds', tilesetCloud)
    const foliage = map.createLayer('Foliage', tilesetFoliage)
    this.water = map.createLayer('Water', tilesetWater)
    this.platforms = map.createLayer('Ground', tilesetGround, 0, 0)
    const bricks = map.createLayer('Bricks', tilesetHouse)
    const door = map.createLayer('Door', tilesetGround)
    const roof = map.createLayer('Roof', tilesetHouse)
    // setting collision property to ground
    this.platforms.setCollisionByExclusion(-1, true)
    this.water.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 100, 300)
    this.bulletGroup = new BulletGroup(this, 30, 50)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 3840, 540)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
    this.cameras.main.setBounds(0, 0, 3840, 540)
  }

  colliderSetup () {
    this.physics.world.addCollider(this.player, this.platforms, () => {
      this.player.canJump = true
      this.player.jumpCount = 2
    })

    this.physics.world.addCollider(this.player, this.enemy3, () => {
      this.player.getDamage()
      this.enemy3.destroy()
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
    this.enemy1 = new Enemy1(this, 500, 400, 'viking')
    this.enemy = new Patroller(this, this.curve, 818, 413, 'adventurer')
    this.enemy2 = new Patroller(this, this.curve, 1712, 412, 'adventurer')
    this.enemy3 = new Patroller(this, this.flying, 1535, 392, 'adventurer')

    this.boss = new Boss1(this, 3300, 220)

    this.enemy.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1
    })

    this.enemy2.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1
    })

    this.enemy3.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })
  }

  debugSetup () {
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.platforms.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.mouseCoords = this.add.text(50, 25)
    this.godMode = this.add.text(50, 45)

    const graphics = this.add.graphics()

    graphics.lineStyle(1, 0xffffff, 1)

    this.curve.draw(graphics, 64)
    this.flying.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1)
  }

  update () {
    this.enemy1.update()

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }

    if (this.player.hp > 0) {
      this.player.update()
    } else if (this.player.active) {
      this.player.die()
    }

    this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    this.mouseCoords.x = this.player.x
    this.godMode.setText('God mode: ' + this.player.godMode)
    this.godMode.x = this.player.x
  }
}
