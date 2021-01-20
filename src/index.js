import Phaser from "phaser";
import level1 from "./level1";
import level2 from "./level2";
import Preload from "./preload";
import './style.css';

const config= {

  type: Phaser.AUTO,
  width:800,
  height:500,
  physics:{
    default: "arcade",
    arcade: {
      gravity:{ y:300 },
      debug:true
    }
  },
  scene:[Preload, level1, level2],
}

export default new Phaser.Game(config)