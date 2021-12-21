import metronome from '../assets/metronome.mp3'
import song from '../assets/song.mp3'

export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'PreloadScene'});
	}

    preload()
    {
        this.cameras.main.setBackgroundColor(0x111111);

		this.loading = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Loading...", { font: "20px Courier" });
		this.loading.setOrigin(0.5);

		this.load.on('progress', this.onLoadProgress, this);
        this.load.audio('metronome', metronome);
        this.load.audio('song', song);
    }

    create()
    {
            this.scene.start("LevelScene");
    }

    update(time, delta)
    {

	}

    onLoadProgress(progress) {
		this.loading.setText(`Loading... ${Math.round(progress * 100)}%`);
	}

	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

    fitToScreen(image) {
        image.setScale(Math.max(this.W / image.width, this.H / image.height));
    }
}