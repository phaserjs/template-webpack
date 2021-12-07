import Phaser from 'phaser'
import { LoadingScene } from './scenes/loading'
import { Level1 } from './scenes/level-1'
import { Level2 } from './scenes/level-2'
import { Level3 } from './scenes/level-3'
import { Level4 } from './scenes/level-4'
import { Level45 } from './scenes/level-45'
import { Level5 } from './scenes/level-5'
import { Title } from './scenes/title'
import { Controls } from './scenes/controls'
import { Death } from './scenes/death'

const config = {
  type: Phaser.AUTO,
  title: 'SideScroller',
  parent: 'phaser-example',
  width: 960,
  height: 540,
  scene: [LoadingScene, Title, Death, Controls, Level1, Level2, Level3, Level4, Level45, Level5],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 280 },
      fixedStep: false
    }
  }
}

const game = new Phaser.Game(config)
