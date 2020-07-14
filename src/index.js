import Phaser from "phaser";
import "./assets/styles/styles.scss";
import BootScene from "./scenes/BootScene";
import SFXScene from "./scenes/SFXScene";
import LoadScene from "./scenes/LoadScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

let game;

const config = {
	type: Phaser.AUTO,
	backgroundColor: 0x454545,
	width: window.innerWidth,
	height: window.innerHeight,
	scene: [BootScene, SFXScene, LoadScene, GameScene, GameOverScene],
};

window.onload = function () {
	window.focus();
	game = new Phaser.Game(config);
};

export { game };
