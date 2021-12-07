import { Scene, Curves, Display } from 'phaser'
import { Mob } from '../classes/enemies/mob'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { BossHpTrigger } from '../classes/triggers/bossHpTrigger'
import { Boss2 } from '../classes/bosses/boss2'
import { Trigger } from '../classes/triggers/endLevel'
import { Mob2 } from '../classes/enemies/mob2'

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
    this.uISetup()
    this.cameraSetup()
    this.debugSetup()

    this.sound.stopAll()
    this.sound.add('stepsAudio')
    this.sound.add('playerFireAudio')
    this.sound.add('level2BgAudio')
    this.sound.play('level2BgAudio', { volume: 0.6, loop: true })
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
    this.jumpLayer = level2map.createLayer('JumpLayer', tilesetMain)
    this.walls = level2map.createLayer('Wall', tilesetMain)
    level2map.createLayer('Backdrop', tilesetSecond)
    this.water = level2map.createLayer('Water', tilesetWater)
    level2map.createLayer('Etc2', tilesetSecond)
    level2map.createLayer('Etc', tilesetMain)
    level2map.createLayer('Floor', tilesetSecond, 0, 0)
    level2map.createLayer('Platforms', tilesetMain, 0, 0)
    // setting collision property to ground
    this.jumpLayer.setCollisionByExclusion(-1, true)
    this.walls.setCollisionByExclusion(-1, true)
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
    this.circle = new Curves.Path(50, 500)
    this.circle.splineTo([164, 446, 274, 542, 412, 457, 522, 541, 664, 464])
    this.circle.lineTo(700, 300)
    this.circle.lineTo(600, 350)
    this.circle.ellipseTo(200, 100, 100, 250, false, 0)
    this.circle.cubicBezierTo(222, 119, 308, 107, 208, 368)
    this.circle.ellipseTo(60, 60, 0, 360, true)

    this.circleLoop = new Curves.Path(400, 300)
    this.circleLoop.circleTo(100)
    this.circleLoop.moveTo(400, 300)
    this.circleLoop.circleTo(100, true, 180)
  }

  triggerSetup () {
    this.endLevel = new Trigger(this, 5760, 390)
    this.bossHealth = new BossHpTrigger(this, 4500, 460, { healthBarX: 5400, healthBarY: 34 })
  }

  enemySetup () {
    const vikingConfig = {
      name: 'viking',
      key: '-idle',
      prefix: 'idle-',
      w: 24,
      h: 24,
      xOff: 5,
      yOff: 8,
      scale: 1,
      frameEnds: 6
    }

    const flymonConfig = {
      name: 'gen-mob-4',
      key: '-idle',
      prefix: 'idle-',
      w: 16,
      h: 16,
      xOff: 73,
      yOff: 69,
      scale: 5,
      frameEnds: 7
    }
    this.enemy1 = new Mob(this, 500, 400, 'viking', vikingConfig)
    this.enemy11 = new Mob2(this, 680, 210, 'gen-mob-4', flymonConfig)
    this.enemy1.spawn(500, 400, vikingConfig)
    this.enemy11.spawn(680, 210, flymonConfig)
    console.log(this.enemy2)
    console.log(this.enemy1)

    this.enemy = new Patroller(this, this.curve, 818, 413, 'gen-mob-3')
    this.enemy2 = new Patroller(this, this.curve, 1712, 412, 'gen-mob-3')
    this.enemy3 = new Patroller(this, this.flying, 1535, 392, 'gen-mob-3')
    this.enemy4 = new Patroller(this, this.circleLoop, 960, 100, 'gen-mob-3')
    this.enemy5 = new Patroller(this, this.flying, 420, 120, 'gen-mob-3')
    this.enemy6 = new Patroller(this, this.circleLoop, 1660, 110, 'gen-mob-3')
    this.enemy7 = new Patroller(this, this.circle, 2000, 400, 'gen-mob-4')
    this.enemy8 = new Patroller(this, this.curve, 2327, 390, 'gen-mob-4')
    this.enemy9 = new Patroller(this, this.circle, 2500, 96, 'fly-mon')
    this.enemy10 = new Patroller(this, this.flying, 2350, 200, 'gen-mob-4')
    this.enemy11 = new Patroller(this, this.circleLoop, 2900, 390, 'fly-mon')
    this.enemy12 = new Patroller(this, this.circle, 3100, 390, 'fly-mon')
    this.enemy13 = new Patroller(this, this.flying, 3300, 390, 'fly-mon')

    console.log(this.enemy2)
    this.boss = new Boss2(this, 5500, 220)

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

    this.enemy4.startFollow({
      duration: 2000,
      yoyo: true,
      repeat: -1
    })

    this.enemy5.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy6.startFollow({
      duration: 2500,
      yoyo: true,
      repeat: -1
    })

    this.enemy7.startFollow({
      duration: 4000,
      yoyo: true,
      repeat: -1
    })

    this.enemy8.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy9.startFollow({
      duration: 4000,
      yoyo: true,
      repeat: -1
    })

    this.enemy10.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy11.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy12.startFollow({
      duration: 2000,
      yoyo: true,
      repeat: -1
    })
    this.enemy13.startFollow({
      duration: 4000,
      yoyo: true,
      repeat: -1
    })
  }

  uISetup () {
    // change position if needed (but use same position for both images)
    var backgroundBar = this.add.image(150, 50, 'green-bar')
    backgroundBar.setScrollFactor(0)

    this.playerHealthBar = this.add.image(155, 50, 'red-bar')
    this.playerHealthBar.setScrollFactor(0)

    // add text label to left of bar
    this.healthLabel = this.add.text(40, 40, 'Health', { fontSize: '20px', fill: '#ffffff' })
    this.healthLabel.setScrollFactor(0)
  }

  debugSetup () {
    this.input.on('pointerdown', () => {
      this.player.godMode = !this.player.godMode
    })
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.jumpLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
    this.walls.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 20, 48, 255)
    })
    this.water.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(20, 234, 48, 255)
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
    this.enemy11.update()

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }

    if (this.player.hp > 0) {
      this.player.update()
    } else if (this.player.active) {
      this.player.die()
      this.scene.start('death-scene', { checkpoint: 2 })
    }
  }
}
