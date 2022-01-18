let id = 0;

export default class Ship {
  constructor(scene, config) {
    this.scene = scene;

    // Load config
    this.key = config.key;
    this.isActivePlayer = config.isActivePlayer;

    // Flag
    this.isBoostSpeed = false;

    // Properties
    this.x = Math.floor(Math.random() * (scene.config.width - 400) + 200);
    this.y = Math.floor(Math.random() * (scene.config.height - 400) + 200);
    this.length = 10;
    this.scale = 1;
    this.speed = 6;
    this.rotation = 0;
    this.bRotation = 0;
    this.fRotation = 0;
    this.score = 0;
    this.rootScore = 0;
    this.id = id++;
    this.bodyGroup = this.scene.add.group();

    // Create Object
    this.createBody();

    if (this.isActivePlayer) this.createControl();
  }

  createBody() {
    for (let i = this.length - 2; i >= 0; i--) {
      const trail = this.scene.physics.add.image(
        this.x - (16 * this.scale * i),
        this.y,
        `${this.key}Trail`,
      ).setCollideWorldBounds().setCircle(16);

      trail.id = this.id;
      trail.class = this;

      this.bodyGroup.add(trail);
      this.scene.trails.add(trail);
    }

    const ship = this.scene.physics.add.image(this.x, this.y, `${this.key}Ship`).setCollideWorldBounds().setCircle(16);
    ship.id = this.id;
    ship.class = this;
    this.bodyGroup.add(ship);
    this.scene.ships.add(ship);

    if (this.isActivePlayer) {
      this.scene.cameras.main.startFollow(ship);
      this.isFollow = true;
    }
  }

  createControl() {
    window.addEventListener('click', () => {
      this.boostSpeed();
    });
  }

  die() {
    this.isDie = true;

    const body = this.bodyGroup.getChildren();
    const foods = this.scene.rainbowBits.getChildren();

    for (let i = 0; i < body.length; i++) {
      if (i % 2 === 0) {
        const rand = Math.floor(Math.random() * foods.length);
        foods[rand].x = body[i].x;
        foods[rand].y = body[i].y;
      }
    }

    this.bodyGroup.destroy(true);

    if (!this.isActivePlayer) this.scene.addBot();
  }

  addTrail() {
    if (!this.isDie) {
      const body = this.bodyGroup.getChildren();
      const trail = this.scene.physics.add.image(body[0].x, body[0].y, `${this.key}Trail`).setCollideWorldBounds().setCircle(16);
      trail.id = this.id;
      body.unshift(trail);
      this.scene.trails.add(trail);

      for (let i = body.length - 1; i >= 0; i--) {
        body[i].depth = i + 1;
      }

      this.length++;
    }
  }

  setScale(scale) {
    const body = this.bodyGroup.getChildren();

    for (let i = 0; i < body.length; i++) {
      if (i > 0) {
        const h = 16 * scale;
        const speedX = Math.cos(body[i].rotation) * h;
        const speedY = Math.sin(body[i].rotation) * h;
        body[i].x = body[i - 1].x - speedX;
        body[i].y = body[i - 1].y - speedY;
      }

      body[i].setScale(scale);
      body[i].depth = body.length - i;
    }
  }

  updateScore() {
    if (this.score > 50 && !this.isDie) {
      this.score -= 50;
      this.addTrail();
    }
  }

  getRainbowBitsPos(x, y) {
    const rainbowBit = this.scene.rainbowBits.getChildren().sort((a, b) => {
      const ha = (a.x - x) ** 2 + (a.y - y) ** 2;
      const hb = (b.x - x) ** 2 + (b.y - y) ** 2;
      return ha - hb;
    });

    this.fRotation = Math.atan2(rainbowBit[0].y - y, rainbowBit[0].x - x);
  }

  boostSpeed() {
    if (!this.isBoostSpeed && this.rootScore > 50 && !this.isDie) {
      this.isBoostSpeed = true;
      this.speed += 6;

      setTimeout(() => {
        this.isBoostSpeed = false;
        this.speed -= 6;
      }, 2000);
    }
  }

  update() {
    if (!this.isDie) {
      const body = this.bodyGroup.getChildren();

      if (this.isActivePlayer) {
        const { canvas } = this.scene.sys.game;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const d = this.scene.game.input.mousePointer.y - centerY;
        const k = this.scene.game.input.mousePointer.x - centerX;
        this.rotation = Math.atan2(d, k);
      } else { // Bot
        const head = body[body.length - 1];

        // picks up items
        this.getRainbowBitsPos(head.x, head.y);
        this.rotation = this.fRotation;

        // turns around if encounters another ship
        this.scene.trails.getChildren().forEach((b) => {
          if (b.id !== head.id) {
            if (((b.y - head.y) ** 2 + (b.x - head.x) ** 2) < 22500) {
              this.rotation = Math.atan2(b.y - head.y, b.x - head.x) - Math.PI;
              if (Math.random() * 100 < 0.5) this.boostSpeed();
            }
          }
        });

        // turns around if encounters the edge
        if (head.x <= 60) this.rotation = 0;
        if (head.x >= (this.scene.config.width - 60)) this.rotation = Math.PI;
        if (head.y <= 60) this.rotation = Math.PI / 2;
        if (head.y >= (this.scene.config.width - 60)) this.rotation = -Math.PI / 2;
      }

      // Limits rotation angle
      if (!(this.rotation - this.bRotation > 7 / 4 * Math.PI || this.rotation - this.bRotation < -7 / 4 * Math.PI)) {
        if (this.rotation - this.bRotation > Math.PI / 32) this.rotation = this.bRotation + Math.PI / 32;
        else if (this.rotation - this.bRotation < -Math.PI / 32) this.rotation = this.bRotation - Math.PI / 32;
      }
      this.bRotation = this.rotation;

      // Move
      const speedX = Math.cos(this.rotation) * this.speed;
      const speedY = Math.sin(this.rotation) * this.speed;

      for (let i = 0; i < (body.length - 1); i++) {
        if (Math.sqrt((body[i + 1].y - body[i].y) ** 2 + (body[i + 1].x - body[i].x) ** 2) > 16) {
          const r = Math.atan2(body[i + 1].y - body[i].y, body[i + 1].x - body[i].x);
          const sx = Math.cos(r) * this.speed;
          const sy = Math.sin(r) * this.speed;

          body[i].x += sx;
          body[i].y += sy;
          body[i].rotation = r;
        }
      }

      body[body.length - 1].x += speedX;
      body[body.length - 1].y += speedY;
      body[body.length - 1].rotation = this.rotation;
    }
  }
}
