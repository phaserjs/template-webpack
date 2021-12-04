import { Scene, Math } from 'phaser'
import { Enemy1 } from '../classes/enemy-1'
import { Player } from '../classes/player'


var foreground


export class Level1 extends Scene {
    constructor() {
        super('level-1-scene')
    }
    create() {

        //creating bg
        const width = this.scale.width
        const height = this.scale.height
        // Align.scaleToGameW(bg, 2)
        let bg = this.add.image(400, 300,'background').setScale(3)
		.setScrollFactor(0)
        foreground = this.add.tileSprite(200, 450, width, 350, 'foreground')
        .setScrollFactor(0.5)

        // creating tilemap
        const map = this.make.tilemap({ key: 'map' })
        //linking pngs to tileset names in the map
        const tilesetCloud = map.addTilesetImage('clouds', 'clouds')
        const tilesetGround = map.addTilesetImage('tilesetOpenGame', 'ground')
        const tilesetWater = map.addTilesetImage('WaterTextures', 'water')
        const tilesetFoliage = map.addTilesetImage('grass-trees', 'foliage')
        //creating layers to reflect tilemap layers - order matters for rendering
        const clouds = map.createLayer('Clouds', tilesetCloud)
        const water = map.createLayer('Water', tilesetWater)
        const foliage = map.createLayer('Foliage', tilesetFoliage)
        this.platforms = map.createLayer('Ground', tilesetGround, 0, 0)
        // setting collision property to ground
        this.platforms.setCollisionByExclusion(-1, true)
        
        this.player = new Player(this, 100, 300)
        this.enemy1 = new Enemy1(this, 1000, 400)



        this.physics.world.addCollider(this.player, this.enemy1)
        this.physics.world.addCollider(this.player, this.platforms)
        this.cameras.main.setViewport(0,0, 960, 540)
        // this.physics.world.setBounds(0,0, 20, 20)
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5, -400, 185)
        this.cameras.main.setBounds(0, 0, 6500, 6500)

        this.debugWalls()
        this.addEvents()

        console.log(this)
    }

    debugWalls() {
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        this.platforms.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        })
    }

    addEvents() {
        this.input.on('pointermove', (pointer) => {
            this.player.body.x = pointer.x
            this.player.body.y = pointer.y
            console.log(this.player)
        })
    }

    update() {
        this.player.update()
        this.enemy1.update()
        // foreground.tilePositionX += 0.5
        // foreground.tilePosition += 0.5
        // foreground.tilePosition += 0.5

        if (Math.Distance.Between(this.player.body.x, this.player.body.y, this.enemy1.body.x, this.enemy1.body.y) < 50) {

            this.physics.accelerateToObject(this.enemy1, this.player)
        }
    }
}