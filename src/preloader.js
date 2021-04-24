import atlant_walk from './assets/atlant_walk.png';
import atlant_idle from './assets/atlant_idle.png';
import atlant_jump from './assets/atlant_jump.png';
import atlant_swim from './assets/atlant_swim.png';
import atlant_enter_water from './assets/atlant_enter_water.png';

const preload = function () {
  this.load.spritesheet('atlant_idle', atlant_idle, { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('atlant_walk', atlant_walk, { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('atlant_jump', atlant_jump, { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('atlant_swim', atlant_swim, { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('atlant_enter_water', atlant_enter_water, { frameWidth: 16, frameHeight: 16 });
}

export default preload;
