import constants from "../utils/constants";

export default class LoadScene extends Phaser.Scene {
	constructor() {
		super(constants.LOAD);
	}

	init() {}

	preload() {}

	create() {
		this.add
			.image(0, 0, "background")
			.setOrigin(0)
			.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
	}
}
