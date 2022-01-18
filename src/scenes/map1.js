import Phaser from 'phaser';
import RainbowBit from '../sprites/rainbowBit.js';
import Ship from '../sprites/ship.js';

class Map1 extends Phaser.Scene {
  constructor() {
    super('map1');

    this.config = {
      tile: 'bg0',
      width: 6000,
      height: 6000,
      foods: 300,
      bots: 20,
    };

    this.score = 0;
    this.bots = [];
    this.ranks = [];
    this.skins = [];
  }

  create() {
    this.rainbowBits = this.add.group();
    this.ships = this.add.group();
    this.trails = this.add.group();

    this.physics.world.setBounds(0, 0, this.config.width, this.config.height);

    this.createGround();
    this.createItems();
    this.createPlayer();
    this.createBots();
    this.handlingCollision();
  }

  createGround() {
    this.bg = this.add.tileSprite(0, 0, this.config.width, this.config.height, this.config.tile).setOrigin(0);
  }

  createPlayer() {
    this.player = new Ship(this, {
      key: 'default',
      isActivePlayer: true,
    });
  }

  createItems() {
    for (let i = 0; i < this.config.foods; i++) {
      new RainbowBit(this);
    }
  }

  createBots() {
    for (let i = 0; i < this.config.bots; i++) {
      this.addBot();
    }
  }

  addBot() {
    this.bots.push(new Ship(this, {
      key: 'default',
      isActivePlayer: false,
    }));
  }

  handlingCollision() {
    this.physics.add.overlap(this.ships, this.rainbowBits, (ship, rainbowBit) => {
      rainbowBit.class.destroy(ship);
      ship.class.updateScore();
    });

    this.physics.add.overlap(this.ships, this.trails, (ship, trail) => {
      if (ship.id !== trail.id) {
        ship.class.die();
      }
    });
  }

  update() {
    this.player.update();
    this.bots.forEach((bot) => bot.update());
  }
}

export default Map1;
