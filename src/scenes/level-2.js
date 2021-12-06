import { Scene, Curves, Display } from 'phaser'
import { Mob } from '../classes/enemies/mob'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { MobSpawner } from '../classes/groups/mob-spawner'
import { Boss2 } from '../classes/bosses/boss2'
// import { Boss1 } from '../classes/bosses/boss'
import { Trigger } from '../classes/triggers'

export class Level2 extends Scene {
  constructor () {
    super('level-2-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.enemySetup()
    this.triggerSetup()
    this.cameraSetup()
    this.debugSetup()

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
    this.jumpLayer = level2map.createLayer('Collision', tilesetMain)
    level2map.createLayer('Backdrop', tilesetSecond)
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
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 5760, 540)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
    this.cameras.main.setBounds(0, 0, 5760, 540)
  }

  pathSetup () {
    const points1 = [50, 400, 135, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    this.curve = new Curves.Spline(points1)
    this.flying = new Curves.Spline(flyingPoints)
  }

  triggerSetup () {
    this.endLevel = new Trigger(this, 5760, 390)
  }

  enemySetup () {
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
    this.enemy1 = new Mob(this, 500, 400, 'viking', vikingConfig)
    this.enemy = new Patroller(this, this.curve, 818, 413, 'adventurer')
    this.enemy2 = new Patroller(this, this.curve, 1712, 412, 'adventurer')
    this.enemy3 = new Patroller(this, this.flying, 1535, 392, 'adventurer')

    this.boss = new Boss2(this, 5500, 220)
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
  }
}
