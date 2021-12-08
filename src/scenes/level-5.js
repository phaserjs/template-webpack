import { Scene, Curves, Display } from 'phaser'
import { Boss5 } from '../classes/bosses/boss5'
import { Player } from '../classes/player'
import { Trigger } from '../classes/triggers/endLevel'
import { BossHpTrigger } from '../classes/triggers/bossHpTrigger'
import { Patroller } from '../classes/enemies/patroller'

export class Level5 extends Scene {
  constructor () {
    super('level-5-scene')
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
    this.sound.add('portalAudio')
    this.sound.add('stepsAudio')
    this.sound.add('playerFireAudio')
    this.sound.add('level5BgAudio')
    this.sound.play('level5BgAudio', { volume: 0.2, loop: true })
  }

  changeScene () {
    this.scene.start('win-scene')
  }

  initMap () {
    // creating tilemap
    const map = this.make.tilemap({ key: 'level5-map' })
    const tilesetBackground = map.addTilesetImage('background', 'level5-bg')
    const tilesetGround = map.addTilesetImage('tiles', 'level5-ground')
    const tilesetProps = map.addTilesetImage('props', 'props')
    const tilesetPlatforms = map.addTilesetImage('platform', 'platforms')

    // linking pngs to tileset names in the map
    // creating layers to reflect tilemap layers - order matters for rendering
    this.walls = map.createLayer('Collision Layer', tilesetGround, 0, 0)
    this.jumpLayer = map.createLayer('Jump Layer', tilesetGround, 0, 0)
    map.createLayer('Background', tilesetBackground)
    this.add.tileSprite(200, 1000, 8000, 2000, 'level5-Bg2')
      .setScrollFactor(0.6)
    this.add.tileSprite(200, 1450, 8000, 220, 'level5-Bg3')
      .setScrollFactor(0.8)
    map.createLayer('Platforms', tilesetPlatforms)
    this.water = map.createLayer('Ground Cover', tilesetGround)
    map.createLayer('Rock1', tilesetGround)
    map.createLayer('Rock2', tilesetGround)
    map.createLayer('Props', tilesetProps)
    // setting collision property to ground
    this.jumpLayer.setCollisionByExclusion(-1, true)
    this.walls.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 0, 1600)
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 5755, 5760)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, 0, 20)
    this.cameras.main.setBounds(0, 0, 5755, 1920)
  }

  enemySetup () {
    this.boss = new Boss5(this, 4200, 1200)
    const mob3Config = {
      key: {
        idle: '-idle',
        atk: '-atk',
        run: '-run'
      },
      w: 15,
      h: 16,
      xOff: 9,
      yOff: 3,
      scale: 2,
      hasGun: true,
      frameEnds: {
        idle: 4,
        atk: 10,
        run: 7,
        death: 4
      }
    }
    const bigFishConfig = {
      key: {
        idle: '-run'
      },
      w: 48,
      h: 48,
      xOff: 0,
      yOff: 0,
      scale: 2,
      hasGun: true,
      frameEnds: {
        run: 3,
        death: 10
      }
    }
    const bigMineConfig = {
      key: {
        idle: '-idle'
      },
      w: 64,
      h: 64,
      xOff: 0,
      yOff: 0,
      scale: 2,
      hasGun: false,
      frameEnds: {
        death: 3,
        idle: 0
      }
    }
    const lilMineConfig = {
      key: {
        idle: '-idle'
      },
      w: 64,
      h: 64,
      xOff: 0,
      yOff: 0,
      scale: 0.5,
      hasGun: false,
      frameEnds: {
        death: 3,
        idle: 0
      }
    }

    this.enemy1 = new Patroller(this, this.curve, 775, 465, 'gen-mob-2', mob3Config)
    this.enemy2 = new Patroller(this, this.march, 2400, 545, 'gen-mob-2', mob3Config)
    this.enemy3 = new Patroller(this, this.flying, 1650, 480, 'big-fish', bigFishConfig)
    this.enemy4 = new Patroller(this, this.bob, 1350, 460, 'big-mine', bigMineConfig)
    this.enemy5 = new Patroller(this, this.march, 600, 1775, 'gen-mob-2', mob3Config)
    this.enemy6 = new Patroller(this, this.march, 670, 1775, 'gen-mob-2', mob3Config)
    this.enemy7 = new Patroller(this, this.march, 740, 1775, 'gen-mob-2', mob3Config)
    this.enemy8 = new Patroller(this, this.bob, 800, 1650, 'big-mine', bigMineConfig)
    this.enemy9 = new Patroller(this, this.curve, 1765, 1472, 'gen-mob-2', mob3Config)
    this.enemy10 = new Patroller(this, this.flying, 1850, 1350, 'big-fish', bigFishConfig)
    this.enemy11 = new Patroller(this, this.bob, 960, 1160, 'big-mine', lilMineConfig)
    this.enemy12 = new Patroller(this, this.bob, 860, 1150, 'big-mine', lilMineConfig)
    this.enemy13 = new Patroller(this, this.bob, 760, 1050, 'big-mine', lilMineConfig)
    this.enemy14 = new Patroller(this, this.bob, 660, 1170, 'big-mine', lilMineConfig)
    this.enemy15 = new Patroller(this, this.bob, 950, 1000, 'big-mine', lilMineConfig)
    this.enemy16 = new Patroller(this, this.bob, 840, 1100, 'big-mine', lilMineConfig)
    this.enemy17 = new Patroller(this, this.bob, 700, 1050, 'big-mine', lilMineConfig)
    this.enemy18 = new Patroller(this, this.bob, 620, 1070, 'big-mine', lilMineConfig)
    this.enemy19 = new Patroller(this, this.march, 2700, 545, 'gen-mob-2', mob3Config)
    this.enemy20 = new Patroller(this, this.march, 2850, 545, 'gen-mob-2', mob3Config)

    this.enemy1.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1
    })

    this.enemy2.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })

    this.enemy3.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })

    this.enemy4.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy5.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy6.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy7.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy8.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy9.startFollow({
      duration: 700,
      yoyo: true,
      repeat: -1
    })
    this.enemy10.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy11.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy12.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy13.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy14.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy15.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy16.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy17.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy18.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy19.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
    this.enemy20.startFollow({
      duration: 1500,
      yoyo: true,
      repeat: -1
    })
  }

  triggerSetup () {
    this.endLevel = new Trigger(this, 3050, 1750)
    this.bossHealth = new BossHpTrigger(this, 4800, 1245, { healthBarX: 5400, healthBarY: 34, sizeX: 28, sizeY: 1200 })
  }

  pathSetup () {
    const bob = [0, 20, 0, 40, 0, 20, 0, 0]
    const march = [50, 400, 650, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    const platformPoints = [50, 400, 135, 400]

    this.curve = new Curves.Spline(platformPoints)
    this.march = new Curves.Spline(march)
    this.bob = new Curves.Spline(bob)
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
    } else if (this.player.active) {
      this.player.die()
      this.scene.start('death-scene', { checkpoint: 5 })
    }

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
    }
  }
}
