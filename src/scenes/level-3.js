import { Scene, Curves, Display } from 'phaser'
import { Player } from '../classes/player'
import { Boss3 } from '../classes/bosses/boss3'
import { Facilitator } from '../classes/npc'
import { Trigger } from '../classes/triggers/endLevel'

// import { Boss4 } from '../classes/bosses/boss4'
// import { TempBoss } from '../classes/bosses/tempBoss'
// import { TempBoss2 } from '../classes/bosses/tempBoss2'
// import { TempBoss3 } from '../classes/bosses/tempBoss3'
// import { TempBoss4 } from '../classes/bosses/tempBoss4'
// import { Enemy1 } from '../classes/enemies/enemy-1'
// import { Boss3 } from '../classes/enemies/boss3'

export class Level3 extends Scene {
  constructor () {
    super('level-3-scene')
  }

  create () {
    this.initMap()
    this.initPlayer()
    this.initNpc()
    this.pathSetup()
    this.enemySetup()
    this.triggerSetup()
    this.uISetup()
    this.cameraSetup()
    this.debugSetup()

    this.sound.stopAll()
    this.sound.add('stepsAudio')
    this.sound.add('playerFireAudio')
    this.sound.add('level3BgAudio')
    this.sound.play('level3BgAudio', { volume: 0.9, loop: true })
  }

  changeScene () {
    this.scene.start('level-4-scene')
  }

  initMap () {
    // creating tilemap
    const level3map = this.make.tilemap({ key: 'level3-map' })
    const tileSetLevel2 = level3map.addTilesetImage('Wasteland-Files', 'level3-tiles')

    this.walls = level3map.createLayer('Wall', tileSetLevel2)
    // creating bg
    this.add.image(400, 300, 'level3Bg').setScale(3)
      .setScrollFactor(0)
    this.add.tileSprite(200, 4000, 4500, 350, 'level3Mountain1')
      .setScrollFactor(0.7, 0.7)
    this.add.tileSprite(200, 3800, 4500, 350, 'level3Mountain2')
      .setScrollFactor(0.4, 0.4)

    this.jumpLayer = level3map.createLayer('jumpLayer', tileSetLevel2, 0, 0)
    // creating layers to reflect tilemap layers - order matters for rendering
    level3map.createLayer('Platform', tileSetLevel2, 0, 0)
    this.water = level3map.createLayer('Water', tileSetLevel2, 0, 0)
    level3map.createLayer('Etc', tileSetLevel2, 0, 0)
    // setting collision property to ground
    this.jumpLayer.setCollisionByExclusion(-1, true)
    this.walls.setCollisionByExclusion(-1, true)
    this.water.setCollisionByExclusion(-1, true)
  }

  initPlayer () {
    this.player = new Player(this, 100, 600)
  }

  initNpc () {
    this.jared = new Facilitator(this, 3000, 200, 'jared')
  }

  cameraSetup () {
    this.cameras.main.setViewport(0, 0, 960, 540)
    this.physics.world.setBounds(0, 0, 1920, 5760)
    this.cameras.main.startFollow(this.player, false, 0.5, 0.5, 0, 20)
    this.cameras.main.setBounds(0, 0, 1920, 5760)
  }

  // cameraUpdate () {
  //   if(this.player.velocity.x < 0) {
  //     this.cameras.
  //   }
  // }

  pathSetup () {
    const points1 = [50, 400, 135, 400]
    const flyingPoints = [50, 400, 125, 320, 200, 400]
    this.curve = new Curves.Spline(points1)
    this.flying = new Curves.Spline(flyingPoints)
  }

  triggerSetup () {
    this.endLevel = new Trigger(this, 1800, 5540)
  }

  enemySetup () {
    // set 1200, 5200
    this.boss = new Boss3(this, 1200, 5200)
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

    if (this.player.hp > 0) {
      this.player.update()
    } else if (this.player.active) {
      this.player.die()
      this.scene.start('death-scene', { checkpoint: 3 })
    }

    if (this.boss.hp > 0) {
      this.boss.update()
    } else if (this.boss.active) {
      this.boss.die()
      // this.jared.setVisible(true)
      // this.jared.setActive(true)
      // if (this.jared.active) {
      //   this.jared.update()
      // }
    }
  }
}
