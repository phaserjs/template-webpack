import { Scene, Curves, Display } from 'phaser'
import { Player } from '../classes/player'
import { Patroller } from '../classes/enemies/patroller'
import { BossHpTrigger } from '../classes/triggers/bossHpTrigger'
import { Boss2 } from '../classes/bosses/boss2'
import { Trigger } from '../classes/triggers/endLevel'
import { TestBoss } from '../classes/bosses/testflymon'

export class Level2 extends Scene {
  constructor () {
    super('level-2-scene')
  }

  create () {
    this.sceneNum = 2

    this.initMap()
    this.initPlayer()
    this.pathSetup()
    this.enemySetup()
    this.triggerSetup()
    this.uISetup()
    this.cameraSetup()
    this.debugSetup()

    this.sound.stopAll()
    this.sound.add('portalAudio')
    this.sound.add('stepsAudio')
    this.sound.add('playerFireAudio')
    this.sound.add('level2BgAudio')
    this.sound.play('level2BgAudio', { volume: 0.4, loop: true })
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
    this.bossHealth = new BossHpTrigger(this, 4500, 200, { healthBarX: 5400, healthBarY: 34, sizeX: 28, sizeY: 500 })
  }

  enemySetup () {
    const genmob4Config = {
      key: {
        idle: '-idle',
        atk: '-atk'
      },
      w: 16,
      h: 16,
      xOff: 73,
      yOff: 69,
      scale: 5,
      prefix: '',
      frameEnds: {
        idle: 7,
        atk: 5,
        death: 3,
        run: 0
      }
    }
    const flymonConfig = {
      key: {
        idle: '-idle',
        atk: '-atk',
        run: '-run'
      },
      w: 480,
      h: 320,
      xOff: 0,
      yOff: 0,
      scale: 0.2,
      prefix: '',
      frameEnds: {
        idle: 3,
        atk: 0,
        run: 0,
        death: 4
      }
    }

    const dishesConfig = {
      key: {
        idle: '-idle',
        atk: '-atk',
        run: '-run'
      },
      w: 112,
      h: 80,
      xOff: 0,
      yOff: 0,
      scale: 2,
      prefix: '',
      frameEnds: {
        idle: 5,
        atk: 0,
        run: 0,
        death: 5
      }
    }

    const dishConfig = {
      key: {
        idle: '-idle',
        atk: '-atk',
        run: '-run'
      },
      w: 112,
      h: 80,
      xOff: 0,
      yOff: 0,
      scale: 2,
      prefix: '',
      frameEnds: {
        idle: 5,
        atk: 0,
        run: 0,
        death: 4
      }
    }

    this.enemy0 = new Patroller(this, this.curve, 818, 413, 'gen-mob-4', genmob4Config)
    this.enemy2 = new Patroller(this, this.curve, 1712, 412, 'gen-mob-4', genmob4Config)
    this.enemy3 = new Patroller(this, this.flying, 1535, 392, 'gen-mob-4', genmob4Config)
    this.enemy4 = new Patroller(this, this.circleLoop, 960, 100, 'gen-mob-4', genmob4Config)
    this.enemy5 = new Patroller(this, this.flying, 420, 120, 'gen-mob-4', genmob4Config)
    this.enemy6 = new Patroller(this, this.circleLoop, 1660, 110, 'gen-mob-4', genmob4Config)
    this.enemy7 = new Patroller(this, this.circle, 2000, 400, 'gen-mob-4', genmob4Config)
    this.enemy8 = new Patroller(this, this.curve, 2327, 390, 'gen-mob-4', genmob4Config)
    this.enemy9 = new Patroller(this, this.circle, 2500, 96, 'fly-mon', flymonConfig)
    this.enemy10 = new Patroller(this, this.flying, 2350, 200, 'gen-mob-4', genmob4Config)
    this.enemy11 = new Patroller(this, this.circleLoop, 2900, 390, 'fly-mon', flymonConfig)
    this.enemy12 = new Patroller(this, this.circle, 3100, 390, 'fly-mon', flymonConfig)
    this.enemy13 = new Patroller(this, this.flying, 3300, 390, 'fly-mon', flymonConfig)

    this.enemy14 = new Patroller(this, this.circleLoop, 3782, 371, 'dirty-dishes', dishesConfig)
    this.enemy15 = new Patroller(this, this.circle, 4038, 365, 'dirty-dishes', dishesConfig)
    this.enemy16 = new Patroller(this, this.flying, 4232, 370, 'dirty-dishes', dishesConfig)

    this.enemy17 = new Patroller(this, this.circleLoop, 3000, 374, 'dish', dishConfig)
    this.enemy18 = new Patroller(this, this.circle, 3400, 70, 'dish', dishConfig)
    this.enemy1 = new Patroller(this, this.curve, 4000, 374, 'dish', dishConfig)

    console.log(this.enemy2)
    this.boss = new Boss2(this, 5500, 220)
    this.testBoss = new TestBoss(this, 200, 220)
    console.log(this.testBoss)

    this.enemy0.startFollow({
      duration: 2000,
      yoyo: true,
      repeat: -1
    })

    this.enemy2.startFollow({
      duration: 2000,
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
    this.enemy14.startFollow({
      duration: 4000,
      yoyo: true,
      repeat: -1
    })

    this.enemy15.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy16.startFollow({
      duration: 1300,
      yoyo: true,
      repeat: -1
    })

    this.enemy17.startFollow({
      duration: 2000,
      yoyo: true,
      repeat: -1
    })
    this.enemy18.startFollow({
      duration: 4000,
      yoyo: true,
      repeat: -1
    })
    this.enemy1.startFollow({
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
    if (!this.enemy0.dying) {
      this.enemy0.update()
    }

    if (!this.enemy1.dying) {
      this.enemy1.update()
    }

    if (!this.enemy2.dying) {
      this.enemy2.update()
    }
    if (!this.enemy3.dying) {
      this.enemy3.update()
    }
    if (!this.enemy4.dying) {
      this.enemy4.update()
    }
    if (!this.enemy5.dying) {
      this.enemy5.update()
    }
    if (!this.enemy6.dying) {
      this.enemy6.update()
    }
    if (!this.enemy7.dying) {
      this.enemy7.update()
    }
    if (!this.enemy8.dying) {
      this.enemy8.update()
    }
    if (!this.enemy9.dying) {
      this.enemy9.update()
    }
    if (!this.enemy10.dying) {
      this.enemy10.update()
    }
    if (!this.enemy11.dying) {
      this.enemy11.update()
    }
    if (!this.enemy12.dying) {
      this.enemy12.update()
    }
    if (!this.enemy13.dying) {
      this.enemy13.update()
    }
    if (!this.enemy14.dying) {
      this.enemy14.update()
    }
    if (!this.enemy15.dying) {
      this.enemy15.update()
    }
    if (!this.enemy16.dying) {
      this.enemy16.update()
    }
    if (!this.enemy17.dying) {
      this.enemy17.update()
    }
    if (!this.enemy18.dying) {
      this.enemy18.update()
    }

    if (this.boss.hp > 0 && !this.boss.dying) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }

    if (this.testBoss.hp > 0) {
      this.testBoss.update()
    } else if (this.testBoss.active) {
      this.testBoss.die()
    }

    if (this.player.hp > 0) {
      this.player.update()
    } else if (this.player.active) {
      this.player.die()
    }
  }
}
