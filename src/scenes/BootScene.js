import constants from "../utils/constants.js";
import { images } from "../utils/images";
import GameEventEmitter, {
	GAME_EVENTS,
} from "../classes/singletons/GameEventEmitter.js";
import { SOUNDS } from "./SFXScene.js";
import { sounds } from "../utils/sounds.js";

export default class BootScene extends Phaser.Scene {
	constructor() {
		super(constants.BOOT);
	}
	init() {
		GameEventEmitter.clearEvents();

		GameEventEmitter.addListener(
			GAME_EVENTS.fullScreen,
			this.onToggleFullScreen,
			this
		);
	}

	preload() {
		this.load.audio(SOUNDS.BUTTON_CLICK, [
			sounds[`${SOUNDS.BUTTON_CLICK}.mp3`],
			sounds[`${SOUNDS.BUTTON_CLICK}.ogg`],
		]);
		this.load.spritesheet(
			"fullscreen-icon",
			images["fullscreen-white.png"],
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
	}

	create() {
		this.add.text(0, 0, "BootScene", {
			font: "36px gameFont",
			fill: "#fff",
		});

		this.fullScreenButton = this.add.image(
			this.game.canvas.width - 48,
			48,
			"fullscreen-icon"
		);
		this.fullScreenButton.setInteractive().on("pointerdown", () => {
			if (this.scale.isFullscreen) {
				this.fullScreenButton.setFrame(0);
			} else {
				this.fullScreenButton.setFrame(1);
			}
			GameEventEmitter.emit(GAME_EVENTS.fullScreen);
			GameEventEmitter.emit(GAME_EVENTS.playSound, SOUNDS.BUTTON_CLICK);
		});

		this.scene.launch(constants.SFX);
		this.input.keyboard.on("keydown-" + "ESC", function (event) {
			event.preventDefault();
		});
	}

	onToggleFullScreen() {
		console.log("on full screen");
		this.scale.toggleFullscreen();
	}
}
