export const GAME_EVENTS = {
	fullScreen: "fullScreen",
	gameStart: "gameStart",
	gameOver: "gameOver",

	playSound: "playSound",
	pauseSound: "pauseSound",
	toggleSound: "toggleSound",
	toggleMusic: "toggleMusic",
};

class GameEventEmitter extends Phaser.Events.EventEmitter {
	constructor() {
		if (!GameEventEmitter.instance) {
			super();
			GameEventEmitter.instance = this;
		}
		return GameEventEmitter.instance;
	}

	clearEvents() {
		for (let key in GAME_EVENTS) {
			this.removeAllListeners(key);
		}
	}

	clearEvent(eventName) {
		this.removeAllListeners(eventName);
	}
}

const instance = new GameEventEmitter();
//Object.freeze(instance);
export default instance;
