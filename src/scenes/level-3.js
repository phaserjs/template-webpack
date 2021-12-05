import { Scene, Math } from 'phaser'
import { Player } from '../classes/player'

export class Level3 extends Scene {
    constructor() {
        super('level-3-scene')
    }
    create() {
        this.initMap()
        this.initPlayer()
        this.pathSetup()
        this.colliderSetup()
        this.cameraSetup()
        this.debugSetup()
    }


    initMap() {
        //creating bg
        let level3Bg = this.add.image(400, 300,'level3Bg').setScale(3)
		.setScrollFactor(0)
        this.add.tileSprite(200, 450, 4500, 350,'level3Mountain1')
        .setScrollFactor(0.7, 0.7)
        this.add.tileSprite(200, 450, 4500, 350,'level3Mountain2')
        .setScrollFactor(0.4, 0.4)

        // creating tilemap
        const level3map = this.make.tilemap({ key: 'level3-map' })
        const tileSetLevel2 = level3map.addTilesetImage('Wasteland-Files','level2-tiles')
        //linking pngs to tileset names in the map
        //creating layers to reflect tilemap layers - order matters for rendering
        this.platforms = level3map.createLayer('Platform', tileSetLevel2, 0, 0)
        level3map.createLayer('Water', tileSetLevel2, 0, 0)
        level3map.createLayer('Etc', tileSetLevel2, 0, 0)
        // setting collision property to ground
        this.platforms.setCollisionByExclusion(-1, true)
    }

    initPlayer() {
        this.player = new Player(this, 100, 300)
    }

    cameraSetup() {
        this.cameras.main.setViewport(0, 0, 960, 540)
        this.physics.world.setBounds(0, 0, 1920, 5760)
        this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
        this.cameras.main.setBounds(0, 0, 1920, 5760)
    }

    colliderSetup() {
        this.physics.world.addCollider(this.player, this.platforms, () => {
            this.player.canJump = true
            this.player.jumpCount = 2
        })
    }

    pathSetup() {
        const points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400]
        const points1 = [50, 400, 135, 400]
        const flyingPoints = [50, 400, 125, 320, 200, 400]
        this.curve = new Phaser.Curves.Spline(points1)
        this.flying = new Phaser.Curves.Spline(flyingPoints)
    }

    debugSetup() {
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        this.platforms.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        })
        this.mouseCoords = this.add.text(50, 25)

        const graphics = this.add.graphics()

        graphics.lineStyle(1, 0xffffff, 1)

        this.curve.draw(graphics, 64)
        this.flying.draw(graphics, 64)

        graphics.fillStyle(0x00ff00, 1)
    }

    update() {
        this.player.update()

        this.mouseCoords.setText('X: ' + this.input.activePointer.worldX + ' Y: ' + this.input.activePointer.worldY)
        this.mouseCoords.x = this.player.x

      

    }
}
