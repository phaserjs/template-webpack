import "phaser";
// @ts-ignore // this works via webpack file-loader
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: '#efefef',
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);


// const imageKey = "logo";
const cartmanSvgKey = "cartman";

function preload() {
  // this.load.image(imageKey, logoImg);
  this.load.svg(cartmanSvgKey, 'src/assets/cartman.svg', {
    width: 416,
    height: 388,
  });
}

function create() {
  // const logo = this.add.image(400, 150, imageKey);
  const cartman = this.add.image(400, 150, cartmanSvgKey);

  this.tweens.add({
    // targets: logo,
    targets: cartman,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
