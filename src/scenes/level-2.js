import { Scene, Math, Curves } from 'phaser'
import { BulletGroup } from '../classes/groups/bullet-group'
import { Enemy1 } from '../classes/enemies/enemy-1'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { MobSpawner } from '../classes/groups/mob-spawner'
import { Boss2 } from '../classes/enemies/boss2'
import { Trigger } from '../classes/triggers'

export class Level2 extends Scene {
  constructor () {
    super('level-2-scene')
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
    this.trigger = new Trigger(this, 5760, 448)

    this.input.on('pointerdown', () => {
      this.player.godMode = !this.player.godMode
    })
  }

  changeScene () {
    this.scene.start('level-3-scene')
  }

  initMap () {
    // creating tilemap
    const level2map = this.make.tilemap({ key: 'level2-map' })
    // linking pngs to tileset names in the map
    const tilesetMain = level2map.addTilesetImage('kitchen-shee-flattenedt', 'level2-tiles')
    const tilesetSecond = level2map.addTilesetImage('tileset', 'level2Bg')
    const tilesetWater = level2map.addTilesetImage('Water', 'level2Water')

    // creating layers to reflect tilemap layers - order matters for rendering
    const background = level2map.createLayer('Backdrop', tilesetSecond)
    this.water = level2map.createLayer('Water', tilesetWater)
    level2map.createLayer('Etc2', tilesetSecond)
    level2map.createLayer('Etc', tilesetMain)
    this.floor = level2map.createLayer('Floor', tilesetSecond, 0, 0)
    this.platforms = level2map.createLayer('Platforms', tilesetMain, 0, 0)
    // setting collision property to ground
    this.platforms.setCollisionByExclusion(-1, true)
    this.floor.setCollisionByExclusion(-1, true)
    this.water.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 100, 300)
    this.bulletGroup = new BulletGroup(this, 30, 50)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 5760, 540)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
    this.cameras.main.setBounds(0, 0, 5760, 540)
  }

  colliderSetup () {
    this.physics.world.addCollider(this.player, this.platforms, () => {
      this.player.canJump = true
      this.player.jumpCount = 2
    })

    this.physics.world.addCollider(this.player, this.floor, () => {
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

    this.boss = new Boss2(this, 400, 220)
    console.log(this.boss)
    console.log(this.boss.setSize)

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
    // this.platforms.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255)
    // })
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
