import Phaser from "phaser";
import "./assets/styles/styles.scss";
import BootScene from "./scenes/BootScene";
import SFXScene from "./scenes/SFXScene";

const config = {
	type: Phaser.AUTO,
	backgroundColor: 0x232323,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1280,
		height: 720,
	},
	scene: [BootScene, SFXScene],
};

window.onload = function () {
	window.focus();
	const game = new Phaser.Game(config);
};
