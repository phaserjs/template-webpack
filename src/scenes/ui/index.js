import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('ui-scene')
  }

  create () {
    this.score = new Score(this, 20, 20, 0)
    this.initListeners()
  }

  chestLootHandler () {
    this.score.changeValue('INCREASE', 1)
  }

  initListeners() {
    this.game.events.on(EventName.chestLoot, this.chestLootHandler, this)
  }
}