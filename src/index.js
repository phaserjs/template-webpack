import Phaser from 'phaser';
import logoImg from './assets/logo.png';
// import assetsMap from  './assets/assetsmap.png'
import assetsMap from  './assets/tilemap_packed.png'
import mapJson from './assets/map.json'
import playerPNG from './assets/player.png'
import enemyPNG from './assets/enimy.png'
import Enemies from './Enemies';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super()
    }

    preload ()
    {   
        // console.log({assetsMap, mapJson})
        this.load.image('tiles', assetsMap)
        this.load.tilemapTiledJSON('map', mapJson)

        this.load.spritesheet('player', playerPNG, {frameWidth: 32, frameHeight: 32} )
        this.load.spritesheet('enimy', enemyPNG, {frameWidth: 32, frameHeight: 32} )
    }
      
    create ()
    {
        const map = this.make.tilemap({ 'key': 'map'})
        const tileset = map.addTilesetImage('tilemap_packed', 'tiles')
        
        const ground = map.createLayer('ground', tileset, 0, 0)
        const objectCollider = map.createLayer('objectCollider', tileset, 0, 0)
        const aboveObject = map.createLayer('aboveObject', tileset, 0, 0)
    
        // atribuida a colisão pela propriedade definida no map.json
        objectCollider.setCollisionByProperty({collides: true})
        objectCollider.setDepth(10)

        // player
        const spawingPoint = map.findObject("player", obj => obj.name === 'spawing_point')
        console.log({spawingPoint})

        this.player = this.physics.add.sprite(spawingPoint.x, spawingPoint.y, 'player')
        console.log({player: this.player})
        
        // adicionado fisica de colisão 
        this.physics.add.collider(this.player, objectCollider)

        // enimy
        this.enemies = map.createFromObjects("enimy", 'enimy', {})
        console.log({ enemy: this.enemies })
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies)
        
        this.physics.add.collider(this.enemiesGroup, this.player, this.hitEnemy, null, this)

        // colisão dos enimigos com o mapa
        this.physics.add.collider(this.enemiesGroup, objectCollider)


        // animations
        const animate = this.anims
        animate.create({
            key: 'left',
            frames: animate.generateFrameNames('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        animate.create({
            key: 'right',
            frames: animate.generateFrameNames('player', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        animate.create({
            key: 'front',
            frames: animate.generateFrameNames('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        })

        animate.create({
            key: 'back',
            frames: animate.generateFrameNames('player', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        // camera
        const camera = this.cameras.main
        // A camera vai seguir o personagem
        camera.startFollow(this.player)
        // Atribui um valor para a camera do mapa
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    }

    update ()
    {   
        this.prevVelocity = this.player.body.velocity.clone()

        this.player.setVelocity(0)
        this.cursor = this.input.keyboard.createCursorKeys()
        // console.log({ cursor: this.cursor })
        
        if(this.cursor.left.isDown)
        {
            this.player.body.setVelocityX(-100);
        }
        else if(this.cursor.right.isDown)
        {
            this.player.body.setVelocityX(100);
        } else if(this.cursor.up.isDown)
        {
            this.player.body.setVelocityY(-100);
        }
        else if(this.cursor.down.isDown)
        {
            this.player.body.setVelocityY(100);
        }

        if(this.cursor.left.isDown)
        {
            this.player.anims.play("left", true)
        }
        else if(this.cursor.right.isDown)
        {
            this.player.anims.play("right", true)
        } else if(this.cursor.up.isDown)
        {
            this.player.anims.play("back", true);
        }
        else if(this.cursor.down.isDown)
        {
            this.player.anims.play("front", true);
        } else
        {
            this.player.anims.stop()
            
            if(this.prevVelocity.x < 0) this.player.setTexture("player", "left")
            else if(this.prevVelocity.x > 0) this.player.setTexture("player", "right")
            else if(this.prevVelocity.y < 0) this.player.setTexture("player", "back")
            else if(this.prevVelocity.y > 0) this.player.setTexture("player", "front")
        }
    }

    hitEnemy (player, enemiesGroup) {
        this.scene.restart()
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 650,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
