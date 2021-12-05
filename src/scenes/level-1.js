import { Scene, Math, Curves, Display } from 'phaser'
import { Mob } from '../classes/enemies/mob'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { MobSpawner } from '../classes/groups/mob-spawner'
import { Boss1 } from '../classes/bosses/boss'
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
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 3840, 540)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
    this.cameras.main.setBounds(0, 0, 3840, 540)
  }

  pathSetup () {
    const points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400]
    const points1 = [50, 400, 135, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    this.curve = new Curves.Spline(points1)
    this.flying = new Curves.Spline(flyingPoints)
  }

  enemySetup () {
    const mobConfig = {
      w: 30,
      h: 30,
      xOff: 50,
      yOff: 8,
      scale: 2,
      frameEnds: {
        idle: 4
      }
    }

    const vikingConfig = {
      w: 24,
      h: 24,
      xOff: 5,
      yOff: 8,
      scale: 1,
      frameEnds: {
        idle: 6
      }
    }

    this.enemy = new Mob(this, 500, 400, 'viking', vikingConfig)
    this.enemy4 = new Mob(this, 500, 200, 'enemy', mobConfig)
    this.enemy1 = new Patroller(this, this.curve, 818, 413, 'adventurer')
    this.enemy2 = new Patroller(this, this.curve, 1712, 412, 'adventurer')
    this.enemy3 = new Patroller(this, this.flying, 1535, 392, 'adventurer')

    this.spawner = new MobSpawner(this, 50, 100)
    this.spawner.create(750, 300, 'enemy', null, true, true)

    this.boss = new Boss1(this, 3300, 220)

    this.enemy1.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1,
      rotateToPath: true
    })

    this.enemy2.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1,
      rotateToPath: true
    })

    this.enemy3.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1,
      rotateToPath: true
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
    this.playerHealth = this.add.text(50, 65)
    this.playerAmmo = this.add.text(50, 80)

    this.getPlayer = this.input.keyboard.addKey('P')

    const graphics = this.add.graphics()

    graphics.lineStyle(1, 0xffffff, 1)

    this.curve.draw(graphics, 64)
    this.flying.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1)
  }

  update () {
    this.player.update()
    this.enemy.update()

    this.enemy3.update()
    this.enemy1.update()
    this.enemy2.update()

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }

    if (this.player.hp > 0) {
      this.player.update()
    } else {
      this.player.die()
    }

    this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
    this.mouseCoords.x = this.player.x
    this.godMode.setText('God mode: ' + this.player.godMode)
    this.godMode.x = this.player.x
    this.playerHealth.setText('Health: ' + this.player.hp)
    this.playerHealth.x = this.player.x
    this.playerAmmo.setText('Ammo: ' + this.player.gun.children.entries.length)
    this.playerAmmo.x = this.player.x

    if (this.getPlayer.isDown) {
      console.log(this.player)
    }
  }
}
