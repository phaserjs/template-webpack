import Phaser from "phaser";
import Game from "./game";
import Game2 from "./game2";
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
  scene:[Preload,Game,Game2],
}

export default new Phaser.Game(config)