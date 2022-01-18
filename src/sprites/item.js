export default class Item {
  constructor(scene, config) {
    this.scene = scene;

    this.name = config.name;
    this.key = config.key;

    this.x = Math.floor(Math.random() * (scene.config.width - 200) + 100);
    this.y = Math.floor(Math.random() * (scene.config.height - 200) + 100);
    this.scale = Math.random() * 1.5 + 0.5;

    this.createEntities();
  }

  createEntities() {
    this.entities = this.scene.physics.add.image(this.x, this.y, this.key).setScale(this.scale);
    this.entities.setCircle(this.entities.width / 2);
    this.entities.class = this;
    this.scene.rainbowBits.add(this.entities);
    this.score = Math.floor(this.scale * 10);
  }

  destroy(ship) {
    ship.class.score += this.score;
    ship.class.rootScore += this.score;
    ship.class.isEat = false;

    this.x = Math.floor(Math.random() * (this.scene.config.width - 200) + 100);
    this.y = Math.floor(Math.random() * (this.scene.config.height - 200) + 100);
    this.scale = Math.random() * 1.5 + 0.5;

    this.entities.x = this.x;
    this.entities.y = this.y;
    this.entities.scale = this.scale;
    this.score = Math.floor(this.scale * 10);
  }
}
