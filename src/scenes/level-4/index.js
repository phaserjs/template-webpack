import Phaser from "phaser";
import assetsMap from "../../assets/tilemap_packed.png";
import mapJson from "../../assets/map-04.json";
import playerPNG from "../../assets/player.png";
import Player from "../../classes/player";
import EventName from "../../consts/event-name";
import Enemy from "../../classes/enemy";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('level-4-scene');
  }

  preload() {
    this.load.image("tiles", assetsMap);
    this.load.tilemapTiledJSON("map", mapJson);

    this.load.spritesheet("player", playerPNG, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("tiles_spr", assetsMap, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tilemap_packed", "tiles");
    
    this.ground = this.map.createLayer("ground", this.tileset, 0, 0);
    this.objectCollider = this.map.createLayer("objectCollider", this.tileset, 0, 0);
    this.aboveObject = this.map.createLayer("aboveObject", this.tileset, 0, 0);

    // atribuida a colisão pela propriedade definida no map.json
    this.objectCollider.setCollisionByProperty({ collider: true });
    
    this.objectCollider.setDepth(10);

    // player
    const spawingPoint = this.map.findObject(
      "player",
      (obj) => obj.name === "spawing_point"
    );
    console.log({ spawingPoint });

    this.player = new Player(this, spawingPoint.x, spawingPoint.y)
    this.physics.add.collider(this.player, this.objectCollider)
    
    this.initEnemies()
    this.initReward()

    // camera
    const camera = this.cameras.main;
    // A camera vai seguir o personagem
    camera.startFollow(this.player);
    // Atribui um valor para a camera do mapa
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.input.keyboard.once("keydown-H", (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      this.objectCollider.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });
  }

  update() {
    this.player.update()
  }

  // Definir um point para definir a parta como fim do nível
  levelCompleted(player, goal) {
    this.scene.restart();
  }

  initReward() {
    // const rewards = this.map.createFromObjects('reward', 'reward', {})
    // const rewardPoints = rewards.forEach(sprite => {})
    // gameObjectsToObjectPoints = (gameObjects: unknown[]): ObjectPoint[] => {
    //   return gameObjects.map(gameObject => gameObject as ObjectPoint);
    // };
    const rewardPoints = this.map.filterObjects('reward', obj => obj.name === 'reward')

    this.rewards = rewardPoints.map(reward => 
      // sprite id - 113, 114, 115, 116 -> são as porções
      this.physics.add.sprite(reward.x, reward.y, 'tiles_spr', 89).setScale(0.8)
    )

    this.rewards.forEach(reward => {
      this.physics.add.overlap(this.player, reward, (obj1, obj2) => {
        this.game.events.emit(EventName.chestLoot)
        obj2.destroy()
        this.cameras.main.flash()
      })
    })
  }

  initEnemies () {
    const enemiesPoints = this.map.filterObjects('enemy', obj => obj.name === 'enemy')
    
    this.enemies = enemiesPoints.map(
      enemy => new Enemy(this, enemy.x, enemy.y, 'tiles_spr', this.player, 121)
        .setName(enemy.id.toString())
    )

    this.physics.add.collider(this.enemies, this.objectCollider)
    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      obj1.getDamage(1)
    })

  
  }
}