import { game } from "../index";
let ResizeManager = /** @class */ (() => {
	class ResizeManager {
		static resize() {
			console.log("resize canvas");
			let canvas = game.canvas;
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;
			let windowRatio = windowWidth / windowHeight;
			let gameRatio = game.config.width / game.config.height;
			const referenceRatio =
				ResizeManager.referenceScreenSize.width /
				ResizeManager.referenceScreenSize.height;
			if (windowRatio < gameRatio) {
				canvas.style.width = windowWidth + "px";
				canvas.style.height = windowWidth / gameRatio + "px";
			} else {
				canvas.style.width = windowHeight * gameRatio + "px";
				canvas.style.height = windowHeight + "px";
			}
			if (windowRatio < referenceRatio) {
				const requiredHeight = windowWidth / referenceRatio;
				ResizeManager.centeringOffsets.x = 0;
				ResizeManager.centeringOffsets.y =
					(windowHeight - requiredHeight) / 2;
			} else {
				const requiredWidth = windowHeight * referenceRatio;
				ResizeManager.centeringOffsets.x =
					(windowWidth - requiredWidth) / 2;
				ResizeManager.centeringOffsets.y = 0;
			}
			if (ResizeManager.centeringOffsets.x === 0) {
				ResizeManager.scalingRatio =
					game.canvas.width / ResizeManager.referenceScreenSize.width;
			} else {
				ResizeManager.scalingRatio =
					game.canvas.height /
					ResizeManager.referenceScreenSize.height;
			}
		}
		//Positioning and Font Size functions
		static getX(value) {
			let newX = value * this.scalingRatio;
			if (ResizeManager.offsetX) newX += ResizeManager.centeringOffsets.x;
			return newX;
		}
		static getY(value) {
			let newY = value * this.scalingRatio;
			if (ResizeManager.offsetY) newY += ResizeManager.centeringOffsets.y;
			return newY;
		}
		static getXY(value) {
			return { x: this.getX(value.x), y: this.getY(value.y) };
		}
		static getFontSize(value) {
			return Math.round(value * ResizeManager.scalingRatio);
		}
		// Width and Height Functions
		static getScaledProperty(value) {
			return value * ResizeManager.scalingRatio;
		}
	}
	ResizeManager.offsetX = true;
	ResizeManager.offsetY = true;
	ResizeManager.scalingRatio = 1;
	ResizeManager.referenceScreenSize = {
		width: 1280,
		height: 720,
	};
	ResizeManager.centeringOffsets = {
		x: 0,
		y: 0,
	};
	return ResizeManager;
})();
export { ResizeManager };
