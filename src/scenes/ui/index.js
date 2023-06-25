import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";
import GameStatus from "../../consts/game-status";
import Text from "../../classes/text";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('ui-scene')
  }

  create () {
    this.score = new Score(this, 20, 20, 0)
    this.initListeners()
  }

  chestLootHandler () {
    console.log({scene: this.scene})
    this.score.changeValue('INCREASE', 1)
    console.log({ score: this.score.getValue(), winScore: this.score.getValue() === 3 })
    if(this.score.getValue() === 3) {
      this.game.events.emit(EventName.gameEnd, 'WIN')
    }
  }

  gameEndHandler (status) {
    console.log({status})
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
    this.game.scene.pause('level-4-scene')
    this.gameEndPhase = new Text(
      this,
      this.game.scale.width / 2,
      this.game.scale.height * 0.4,
      status === GameStatus.lose
        ? `WASTED! \nCLICK TO RESTART`
        : `YOU ARE CRASHER \nCLICK TO RESTART`
    )
    .setAlign('center')
    .setColor(status === GameStatus.lose ? '#ff0000' : '#ffffff')

    this.gameEndPhase.setPosition(
      this.game.scale.width / 2 - this.gameEndPhase.width / 2,
      this.game.scale.height * 0.4,
    )

    this.input.on('pointerdown', () => {
      this.game.events.off(EventName.chestLoot, this.chestLootHandler)
      this.game.events.off(EventName.gameEnd, this.gameEndHandler)
      this.scene.get('level-4-scene').scene.restart()
      this.scene.restart()
    })
  }

  initListeners() {
    this.game.events.on(EventName.gameEnd, this.gameEndHandler, this)
    this.game.events.on(EventName.chestLoot, this.chestLootHandler, this)
  }
}