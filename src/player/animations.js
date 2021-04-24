function setupPlayerAnimation(params) {
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('atlant_idle', { start: 0, end: 7 }),
    frameRate: 5,
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('atlant_walk', { start: 0, end: 7 }),
    frameRate: 10,
  });

  this.anims.create({
    key: 'swim',
    frames: this.anims.generateFrameNumbers('atlant_swim', { start: 0, end: 5 }),
    frameRate: 5,
  });

  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('atlant_jump', { start: 0, end: 7 }),
    frameRate: 5,
  });

  this.anims.create({
    key: 'enter_water',
    frames: this.anims.generateFrameNumbers('atlant_enter_water', { start: 0, end: 5 }),
    frameRate: 5,
  });
}

export default setupPlayerAnimation;
