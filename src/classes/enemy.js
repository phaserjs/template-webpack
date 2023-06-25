import Actor from "./actor";

export default class Enemy extends Actor {
  constructor(scene, x, y, texture, target, frame) {
    super(scene, x, y, texture, frame);
    this.target = target
    
    this.agressorRadius = 1000;

    scene.add.existing(this)
    scene.physics.add.existing(this)
    
    this.getBody().setSize(30, 30);
    this.getBody().setOffset(0, 0);
  }

  preUpdate() {
    if(Phaser.Math.Distance.BetweenPoints({
      x: this.x, y: this.y
    },
    {
      x: this.target.x, y:this.target.y
    }) < this.agressorRadius) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
    } else {
      this.getBody().setVelocity(0)
    }
  }

  setTarget(target) {
    this.target = target;
  }

}