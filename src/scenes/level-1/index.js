import Phaser from "phaser";
import assetsMap from "../../assets/tilemap_packed.png";
import mapJson from "../../assets/map-01.json";
import playerPNG from "../../assets/player.png";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super('level-1-scene');
  }

  preload() {
    this.load.image("tiles", assetsMap);
    this.load.tilemapTiledJSON("map", mapJson);

    this.load.spritesheet("player", playerPNG, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tilemap_packed", "tiles");

    const ground = map.createLayer("ground", tileset, 0, 0);
    const objectCollider = map.createLayer("objectCollider", tileset, 0, 0);
    const aboveObject = map.createLayer("aboveObject", tileset, 0, 0);

    // atribuida a colisão pela propriedade definida no map.json
    objectCollider.setCollisionByProperty({ collider: true });
    
    objectCollider.setDepth(10);

    // player
    const spawingPoint = map.findObject(
      "player",
      (obj) => obj.name === "spawing_point"
    );
    console.log({ spawingPoint });

    this.player = this.physics.add.sprite(
      spawingPoint.x,
      spawingPoint.y,
      "player"
    );
    this.player.setSize(30, 30)
    console.log({ player: this.player });

    // adicionado fisica de colisão
    this.physics.add.collider(this.player, objectCollider);
    
    // animations
    const animate = this.anims;
    animate.create({
      key: "left",
      frames: animate.generateFrameNames("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    animate.create({
      key: "right",
      frames: animate.generateFrameNames("player", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    animate.create({
      key: "front",
      frames: animate.generateFrameNames("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    animate.create({
      key: "back",
      frames: animate.generateFrameNames("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    // camera
    const camera = this.cameras.main;
    // A camera vai seguir o personagem
    camera.startFollow(this.player);
    // Atribui um valor para a camera do mapa
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.input.keyboard.once("keydown-D", (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      objectCollider.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });
  }

  update() {
    this.prevVelocity = this.player.body.velocity.clone();

    this.player.setVelocity(0);
    this.cursor = this.input.keyboard.createCursorKeys();
    // console.log({ cursor: this.cursor })

    if (this.cursor.left.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.cursor.right.isDown) {
      this.player.body.setVelocityX(100);
    } else if (this.cursor.up.isDown) {
      this.player.body.setVelocityY(-100);
    } else if (this.cursor.down.isDown) {
      this.player.body.setVelocityY(100);
    }

    if (this.cursor.left.isDown) {
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown) {
      this.player.anims.play("right", true);
    } else if (this.cursor.up.isDown) {
      this.player.anims.play("back", true);
    } else if (this.cursor.down.isDown) {
      this.player.anims.play("front", true);
    } else {
      this.player.anims.stop();

      if (this.prevVelocity.x < 0) this.player.setTexture("player", "left");
      else if (this.prevVelocity.x > 0)
        this.player.setTexture("player", "right");
      else if (this.prevVelocity.y < 0)
        this.player.setTexture("player", "back");
      else if (this.prevVelocity.y > 0)
        this.player.setTexture("player", "front");
    }
  }

  // Definir um point para definir a parta como fim do nível
  levelCompleted(player, goal) {
    this.scene.restart();
  }
}