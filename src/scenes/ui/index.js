import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";
import GameStatus from "../../consts/game-status";
import Text from "../../classes/text";
import iconPlay from "../../assets/buttons/Icon_Play.png";

export default class UIScene extends Phaser.Scene {
  constructor() {
    // super('ui-scene')
    super({ key: 'ui-scene', active: true})
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

  gameEndHandler ({status, level}) {
    console.log({status, level})
    console.log({ game: this.game, scene: this.game.scene })
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
    this.game.scene.pause('level-4-test')
    this.gameEndPhase = new Text(
      this,
      this.game.scale.width / 2,
      this.game.scale.height * 0.4,
      status === GameStatus.lose
        ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
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
      if(status === GameStatus.lose) {
        this.scene.get(level).scene.restart()
        this.scene.get('ui-scene').scene.restart()
        this.scene.get('movement-scene').scene.restart()
        // this.scene.restart()
      } else {
        this.scene.stop()
        this.scene.remove()

        this.scene.start('ui-scene')
        this.scene.start('movement-scene')
        this.scene.start('level-4-scene')
        // this.scene.get('movement-scene')
        // this.scene.get('ui-scene')

      }
    })
  }

  initListeners() {
    this.game.events.on(EventName.gameEnd, this.gameEndHandler, this)
    this.game.events.on(EventName.chestLoot, this.chestLootHandler, this)
  }
}