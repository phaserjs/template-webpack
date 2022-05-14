
export default class Level_1 extends Phaser.Scene {

  constructor() {
    super({ key: 'Level_1' })
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser`
      )
      .setOrigin(1, 0)
  }


  update() {
  }
}

// for now an empty screen with just the game background 
