import { Scene, Math } from 'phaser'
import { BulletGroup } from '../classes/bullet-group'
import { Enemy1 } from '../classes/enemy-1'
import { Player } from '../classes/player'


export class Level3 extends Scene {
    constructor() {
        super('level-3-scene')
    }
    create() {

        //creating bg

        // Align.scaleToGameW(bg, 2)
        let level3Bg = this.add.image(400, 300,'level3Bg').setScale(3)
		.setScrollFactor(0)
        this.add.tileSprite(200, 450, 4500, 350,'level3Mountain1')
        .setScrollFactor(0.7, 0.7)
        this.add.tileSprite(200, 450, 4500, 350,'level3Mountain2')
        .setScrollFactor(0.4, 0.4)

        // creating tilemap
        this.initMap()

        this.player = new Player(this, 100, 300)
        this.enemy1 = new Enemy1(this, 1000, 400)
        this.bulletGroup = new BulletGroup(this)

        this.physics.world.addCollider(this.player, this.enemy1)
        this.physics.world.addCollider(this.player, this.platforms, (player) => {
            player.hitGround()
        })
        this.cameras.main.setViewport(0, 0, 960, 540)
        this.physics.world.setBounds(0, 0, 1920, 5760)
        this.cameras.main.startFollow(this.player, false, 0.5, 0.5, -400, 185)
        this.cameras.main.setBounds(0, 0, 1920, 5760)

        const points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400]
        const points1 = [50, 400, 135, 400]
        const curve = new Phaser.Curves.Spline(points1)

        const graphics = this.add.graphics()

        graphics.lineStyle(1, 0xffffff, 1)

        curve.draw(graphics, 64)

        graphics.fillStyle(0x00ff00, 1)

        for (let i = 0; i < points.length; i++) {
            graphics.fillCircle(points[i].x, points[i].y, 4)
        }

        const enemy = this.add.follower(curve, 818, 413, 'adventurer')

        enemy.startFollow({
            duration: 700,
            yoyo: true,
            repeat: -1
        })

        // this.debugWalls()
        // this.addEvents()

        console.log(this)
    }


    addEvents() {
        this.input.on('pointermove', (pointer) => {
            this.player.body.x = pointer.x
            this.player.body.y = pointer.y
            console.log(this.player)
        })
    }


    initMap() {
        // creating tilemap
        const level3map = this.make.tilemap({ key: 'level3-map' })
        const tileSetLevel2 = level3map.addTilesetImage('Wasteland-Files','level2-tiles')
        //linking pngs to tileset names in the map
        //creating layers to reflect tilemap layers - order matters for rendering
        this.platforms = level3map.createLayer('Platform', tileSetLevel2, 0, 0)
        // setting collision property to ground
        this.platforms.setCollisionByExclusion(-1, true)


    }

    debugWalls() {
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        this.platforms.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        })
    }

    // addEvents() {
    //     this.input.on('pointermove', (pointer) => {
    //         this.player.body.x = pointer.x
    //         this.player.body.y = pointer.y
    //     })
    // }

    update() {
        this.player.update()
        this.enemy1.update()

        this.physics.accelerateToObject(this.enemy1, this.player, 30, 140, 140)

    }
}