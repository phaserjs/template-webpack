import GameEventEmitter, {
	GAME_EVENTS,
} from "../classes/singletons/GameEventEmitter.js";
import constants from "../utils/constants";

export const SOUNDS = {
	BUTTON_CLICK: "buttonclick",
};

export default class SFXScene extends Phaser.Scene {
	constructor() {
		super(constants.SFX);
		this._sounds = [];
		this._soundOn = true;
		this._musicOn = true;
	}

	init() {
		GameEventEmitter.addListener(
			GAME_EVENTS.playSound,
			this.playSound,
			this
		);

		GameEventEmitter.addListener(
			GAME_EVENTS.pauseSound,
			this.pauseSound,
			this
		);

		GameEventEmitter.addListener(
			GAME_EVENTS.toggleSound,
			this.toggleSound,
			this
		);

		GameEventEmitter.addListener(
			GAME_EVENTS.toggleMusic,
			this.toggleMusic,
			this
		);
	}
	preload() {
		for (let key in SOUNDS) {
			this._sounds[SOUNDS[key]] = this.sound.add(SOUNDS[key]);
		}
	}

	playSound(name, config) {
		this._sounds[name].play(config);
	}

	pauseSound(name, paused = true) {
		if (!paused) {
			this._sounds[name].resume();
			return;
		}

		if (this._sounds[name].isPlaying() && paused) {
			this._sounds[name].pause();
		}
	}

	toggleSound() {
		this._soundOn = !this._soundOn;
	}

	toggleMusic() {
		this._musicOn = !this._musicOn;
	}
}
