import constants from "../utils/constants.js";
import { images } from "../utils/images";
import GameEventEmitter, {
	GAME_EVENTS,
} from "../classes/singletons/GameEventEmitter.js";
import { SOUNDS } from "./SFXScene.js";
import { sounds } from "../utils/sounds.js";
import { ResizeManager as RM } from "../utils/utils.js";

export default class BootScene extends Phaser.Scene {
	constructor() {
		super(constants.BOOT);
	}
	init() {
		this.scale.on("resize", RM.resize);
		RM.resize();

		GameEventEmitter.clearEvents();
	}

	preload() {
		this.load.audio(SOUNDS.BUTTON_CLICK, [
			sounds[`${SOUNDS.BUTTON_CLICK}.mp3`],
			sounds[`${SOUNDS.BUTTON_CLICK}.ogg`],
		]);
		this.load.image("background", images["background.png"]);
	}

	create() {
		const width = RM.referenceScreenSize.width;
		const height = RM.referenceScreenSize.height;

		this.scene.start(constants.LOAD);
		this.scene.launch(constants.SFX);
	}
}
