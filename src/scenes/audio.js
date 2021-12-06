import { Scene } from 'phaser'

export class Audio extends Scene {
  constructor () {
    super('audio')
  }

  create () {
    this.load.on('Level1', function () {
      this.audio.start('level1BgAudio', { loop: true, volume: 0.3 })
    })
  }

  update () {

  }
}
