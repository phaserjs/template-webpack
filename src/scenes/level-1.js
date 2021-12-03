import { Scene, Math } from 'phaser'
import { Enemy1 } from '../classes/enemy-1'
import { Player } from '../classes/player'





export class Level1 extends Scene {
    constructor() {
        super('level-1-scene')
    }
    create() {

        // creating tilemap
        const map = this.make.tilemap({ key: 'map' })
        //linking pngs to tileset names in the map
        const tilesetCloud = map.addTilesetImage('clouds', 'clouds')
        const tilesetSky = map.addTilesetImage('Sky', 'sky')
        const tilesetGround = map.addTilesetImage('tilesetOpenGame', 'ground')
        const tilesetWater = map.addTilesetImage('WaterTextures', 'water')
        const tilesetFoliage = map.addTilesetImage('grass-trees', 'foliage')
        //creating layers to reflect tilemap layers - order matters for rendering
        const sky = map.createLayer('Sky', tilesetSky, 0, -16)
        const clouds = map.createLayer('Clouds', tilesetCloud)
        const water = map.createLayer('Water', tilesetWater)
        const platforms = map.createDynamicLayer('Ground', tilesetGround, 0, -16)
        const foliage = map.createLayer('Foliage', tilesetFoliage)
        // setting collision property to ground
         platforms.setCollisionBetween(-1, true)

        this.player = new Player(this, 100, 300)
        this.enemy1 = new Enemy1(this, 1000, 400)

        console.log(sky)

        this.physics.world.addCollider(this.player, this.enemy1)
        this.physics.world.addCollider(this.player, platforms)

        console.log(this)
    }

    update() {
        this.player.update()
        this.enemy1.update()

        if (Math.Distance.Between(this.player.body.x, this.player.body.y, this.enemy1.body.x, this.enemy1.body.y) < 50) {

            this.physics.accelerateToObject(this.enemy1, this.player)
        }
    }
}