import Phaser from "phaser"
import Background from "./assets/backgroundForest.png"
import Ground from "./assets/block.png";
import Tile1 from "./assets/tileset1.png";
import Tile2 from "./assets/tileset2.png";
import Tile3 from "./assets/tileset3.png";
import Tile4 from "./assets/tile4.png";
import TileS from "./assets/tilesmall.png";
import Sohaimg from "./assets/charachter/soha.png"
import Soha from "./assets/charachter/soha.json"
import Jump from "./assets/jump_10.wav"
import Coin from "./assets/coin2.png"
import Coinsound from "./assets/coin.wav"
import Spike from "./assets/killspike.png"
import Rock from "./assets/killrock.png"
import Plant from "./assets/killplant.png"
import Mushroom from "./assets/killmushroom.png"
import Door from "./assets/door.png"


export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload")
  }

  preload() {
    this.load.image("bg", Background)
    this.load.image("block", Ground)
    this.load.image("tile1", Tile1)
    this.load.image("tile2", Tile2)
    this.load.image("tile3", Tile3)
    this.load.image("tile4", Tile4)
    this.load.image("tiles", TileS)
    this.load.image("rock", Rock)
    this.load.image("plant", Plant)
    this.load.image("spike", Spike)
    this.load.image("mushroom", Mushroom)
    this.load.image("coin", Coin)
    this.load.image("door", Door)
    this.load.audio("jump", Jump)
    this.load.audio("collect", Coinsound)
    this.load.atlas("wilma", Wilmatex, Wilma)
    this.load.image("Sohaimg", Sohaimg)
  }



  create() {

    this.scene.start("game")

  }
}