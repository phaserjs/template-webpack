/* eslint-disable */ 

import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import WorldScene from './Scenes/WorldScene';
import GameOverScene from './Scenes/GameOverScene';
import HelpScene from './Scenes/HelpScene';
import ScoreScene from './Scenes/ScoreScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();

    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('World', WorldScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Help', HelpScene);
    this.scene.add('Score', ScoreScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();