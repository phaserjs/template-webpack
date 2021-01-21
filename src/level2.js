import Phaser from "phaser";

export default class Level2 extends Phaser.Scene {

  player
  cursors
  background
  platforms
  text

  constructor() {
    super("level2")
    this.cursors = undefined
  }

  preload() {
  }


  create() {
    this.sound.add('jump');
    this.sound.add('collect');

    this.cursors = this.input.keyboard.createCursorKeys()

    this.background = this.add.tileSprite(0, 0, 1400, 800, "bg");
    this.background.setScale(.6)
    this.background.setOrigin(0, 0);

    const platforms = this.createPlatforms();
    const coins = this.createCoins();
    this.text = this.createText();
    const dangers = this.createDanger();
    const doors = this.createDoor();

    this.player = this.physics.add.sprite(40, 380, "soha", "right-walk-1.png");
    this.player.body.setSize(this.player.width * .5, this.player.height * .9)

    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(coins, platforms)
    this.physics.add.collider(dangers, platforms)
    this.physics.add.collider(this.player, dangers)
    this.player.setBounce(.2)
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, dangers,this.dangerAction,null,this);
    this.physics.add.overlap(this.player, dangers,this.dangerAction,null,this);
    this.physics.add.overlap(this.player, coins, this.collectCoins, null, this)
    this.physics.add.overlap(this.player, doors, this.changeScene, null, this)

    this.anims.create({
      key: "soha-idle-down",
      frames: [{ key: "soha", frame: "bottom-walk-1.png" }]
    })

    this.anims.create({
      key: "soha-idle-right",
      frames: [{ key: "soha", frame: "right-walk-1.png" }]
    })


    this.anims.create({
      key: "soha-right",
      frames: this.anims.generateFrameNames("soha", { start: 1, end: 3, prefix: "right-walk-", suffix: ".png" }),
      repeat: -1,
      frameRate: 5
    })

    this.anims.create({
      key: "soha-left",
      frames: this.anims.generateFrameNames("soha", { start: 1, end: 3, prefix: "left-walk-", suffix: ".png" }),
      repeat: -1,
      frameRate: 5
    })

    this.player.anims.play("soha-idle-right")

  }


  createPlatforms() {
    const platforms = this.physics.add.staticGroup();
    platforms.create(500, 540, "block").refreshBody().setSize(1400, 140);
    platforms.create(200, 400, "tile4").setSize(100, 40).setScale(.5);
    platforms.create(300, 300, "tile2").setSize(100, 40).setScale(.5);
    platforms.create(400, 200, "tile4").setSize(100, 40).setScale(.5);
    platforms.create(100, 150, "tile2").setSize(100, 40).setScale(.5);
    platforms.create(700, 190, "tile4").setSize(100, 40).setScale(.5);
    platforms.create(280, 90, "tile4").setSize(100, 40).setScale(.5);
    platforms.create(650, 300, "tile2").setSize(100, 40).setScale(.5);
    platforms.create(530, 130, "tiles").setSize(20, 40).setScale(.5);

    return platforms
  }

  createDanger() {
    const dangers = this.physics.add.staticGroup();
    dangers.create(200, 375, "spike").setSize(30, 10).setScale(.3);
    dangers.create(300, 275, "rock").setSize(30, 10).setScale(.3);
    dangers.create(400, 175, "plant").setSize(30, 10).setScale(.3);
    dangers.create(315, 65, "plant").setSize(30, 10).setScale(.3);
    dangers.create(315, 450, "mushroom").setSize(30, 10).setScale(.3);
    dangers.create(350, 450, "mushroom").setSize(30, 10).setScale(.3);
    dangers.create(385, 450, "rock").setSize(30, 10).setScale(.3);
    dangers.create(555, 450, "rock").setSize(30, 10).setScale(.3);



    return dangers
  }

  createDoor() {
    const doors = this.physics.add.staticGroup();
    doors.create(675, 260, "door").setSize(50, 40).setScale(.2);

    return doors
  }

  createText() {
    const Text = this.add.text(10, 10, `Score:${this.Score}`, {
      fontSize: '15px',
      fill: '#3377AA',
      backgroundColor: "white",
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },

    });
    Text.setScrollFactor(0);
    return Text
  }

  createCoins() {
    const coins = this.physics.add.group({
      key: "coin",
      repeat: 25,
      setXY: { x: 20, y: 0, stepX: 40 }
    })

    coins.children.iterate((child) => {
      child.setSize(40, 40).setScale(.4)
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4))
    })

    return coins
  }


  collectCoins(player, coin) {

    coin.destroy()
    this.sound.play("collect")
    this.Score += 10;
    this.text.setText(`Score: ${this.Score}`);


  }

  changeScene(player, door) {
    this.scene.start("level1")
  }

  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('soha-left', true)
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('soha-right', true)
    }
    else {
      this.player.setVelocityX(0)

      this.player.anims.play('soha-idle-down')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-260)
      this.player.anims.play('soha-idle-right', true)
      this.sound.play('jump');
    }

  }
}