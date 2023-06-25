import EventName from "../consts/event-name"
import gameStatus from "../consts/game-status";
import Actor from "./actor";

export default class Player extends Actor {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    this.keyUp = this.scene.input.keyboard.addKey("UP");
    this.keyDown = this.scene.input.keyboard.addKey("DOWN");
    this.keyLeft = this.scene.input.keyboard.addKey("LEFT");
    this.keyRight = this.scene.input.keyboard.addKey("RIGHT");

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");

    this.getBody().setSize(30, 30);
    // offset indica o inicio da renderização do sprite
    // this.getBody().setOffset(8, 0);

    this.initAnimation();

    // this.on('destroy', () => [
    //   this.keySpace.removeListener
    // ])
    
  }

  getDamage(value) {
    super.getDamage(value);
    // this.life.setText(this.life.toString())
    if(this.life <= 0)
      this.scene.game.events.emit(EventName.gameEnd, gameStatus.lose)
  }

  update() {
    this.prevVelocity = this.getBody().velocity.clone();

    this.getBody().setVelocity(0);

    if (this.keyW.isDown || this.keyUp.isDown) 
      this.getBody().setVelocityY(-100);

    if (this.keyS.isDown || this.keyDown.isDown) 
      this.getBody().setVelocityY(100);

    if (this.keyA.isDown || this.keyLeft.isDown) 
      this.getBody().setVelocityX(-100);

    if (this.keyD.isDown || this.keyRight.isDown) 
      this.getBody().setVelocityX(100);

    if (this.keyW.isDown || this.keyUp.isDown) {
      this.anims.play("back", true);
    } else if (this.keyS.isDown || this.keyDown.isDown) {
      this.anims.play("front", true);
    } else if (this.keyA.isDown || this.keyLeft.isDown) {
      this.anims.play("left", true);
    } else if (this.keyD.isDown || this.keyRight.isDown) {
      this.anims.play("right", true);
    } else {
        this.anims.stop();
    }

    // if (this.prevVelocity.x < 0) 
    //   this.player.setTexture("player", "left");
    // else if (this.prevVelocity.x > 0)
    //   this.player.setTexture("player", "right");
    // else if (this.prevVelocity.y < 0)
    //   this.player.setTexture("player", "back");
    // else if (this.prevVelocity.y > 0)
    //     this.player.setTexture("player", "front");
  }

  initAnimation () {
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNames("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNames("player", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "front",
      frames: this.scene.anims.generateFrameNames("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "back",
      frames: this.scene.anims.generateFrameNames("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
