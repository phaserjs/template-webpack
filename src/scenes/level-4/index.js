import Phaser from "phaser";
import assetsMap from "../../assets/tilemap_packed.png";
import mapJson from "../../assets/map-04.json";
import playerPNG from "../../assets/player.png";
import Player from "../../classes/player";
import EventName from "../../consts/event-name";
import Enemy from "../../classes/enemy";
import direction from "../../consts/direction";
import gameStatus from "../../consts/game-status";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('level-4-scene');
  }

  preload() {
    this.load.image("tiles", assetsMap);
    this.load.tilemapTiledJSON("map_4", mapJson);

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
    this.map = this.make.tilemap({ key: "map_4" });
    this.tileset = this.map.addTilesetImage("tilemap_packed", "tiles");

    console.log("level 4 ", { map: this.map, game: this.game })
    
    this.ground = this.map.createLayer("ground", this.tileset, 0, 0);
    this.objectCollider = this.map.createLayer("objectCollider", this.tileset, 0, 0);
    this.aboveObject = this.map.createLayer("aboveObject", this.tileset, 0, 0);

    // atribuida a colisão pela propriedade definida no map.json
    this.objectCollider.setCollisionByProperty({ collider: true });
    this.objectCollider.setCollisionByProperty({ winner: true });
    
    this.objectCollider.setDepth(10);

    // player
    const spawingPoint = this.map.findObject(
      "player",
      (obj) => obj.name === "spawing_point"
    );
    console.log({ spawingPoint });

    this.steps = []
    this.executeSteps = false;
    this.player = new Player(this, spawingPoint.x, spawingPoint.y)
    this.physics.add.collider(this.player, this.objectCollider,  (obj1, obj2) => {
      console.log({ obj1, obj2, property: obj2.properties })
      if(obj2.properties.winner)
        this.game.events.emit(EventName.gameEnd, { gameStatus: gameStatus.win, level: this.scene.key })
        // this.game.events.emit(EventName.gameEnd, gameStatus.win)

      if(this.steps.length > 0) {
        this.steps.shift();
      }
    })
    
    this.initEnemies()
    this.initReward()
    this.initListeners()
    

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
    if(this.executeSteps) 
    {
      if(this.steps.length > 0)
        this.keyPressHandler(this.steps[0])
    }
    if(this.executeSteps && this.steps.length == 0)
    {
      this.game.events.emit(EventName.executeSteps, 'STOP', { steps: [] })
      this.executeSteps = false;
      this.keyPressHandler("")
    }
    
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

  executeStepsHandler (event, { steps })
  {
    console.log("executeStepsHandler " + event)
    if(event === "EXECUTE") {
        this.steps = steps
        console.log(steps)
        this.executeSteps = true;
    }
  }

  keyPressHandler (key) {
    this.player.keyUp.isDown = false
    this.player.keyDown.isDown = false
    this.player.keyLeft.isDown = false
    this.player.keyRight.isDown = false

    if (key === direction.up) 
      this.player.keyUp.isDown = true

    if (key === direction.down) 
      this.player.keyDown.isDown = true

    if (key === direction.left) 
      this.player.keyLeft.isDown = true

    if (key === direction.right) 
      this.player.keyRight.isDown = true
  }

  initListeners() {
    this.game.events.on(EventName.executeSteps, this.executeStepsHandler, this)
  }

}