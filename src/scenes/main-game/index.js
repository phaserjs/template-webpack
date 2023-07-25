import Phaser from "phaser";
import glassPanel from "../../assets/ui-pack/glassPanel.png";
import cursorHand from "../../assets/ui-pack/cursor_hand.png";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('main-game-scene')

  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  gameOver()

  preload() {
    this.load.image('glass_panel', glassPanel)
    this.load.image('cursor_hand', cursorHand)
  }

  create () {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off('selected')
    })

    const { width, height } = this.scale
    console.log({ width, height })

    // play button
    const playButton = this.add.image(width * 0.5, height * 0.6, 'glass_panel').setDisplaySize(150, 50)
    this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5)

    const settigsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass_panel').setDisplaySize(150, 50)
    this.add.text(settigsButton.x, settigsButton.y, 'Settigs').setOrigin(0.5)

    const creditsButton = this.add.image(settigsButton.x, settigsButton.y + settigsButton.displayHeight + 10, 'glass_panel').setDisplaySize(150, 50)
    this.add.text(creditsButton.x, creditsButton.y, 'Credits').setOrigin(0.5)

    this.buttons.push(playButton)
    this.buttons.push(settigsButton)
    this.buttons.push(creditsButton)

    this.buttonSelector = this.add.image(0, 0, 'cursor_hand')

    this.selectButton(0)

    playButton.on('selected', () => [
      // Você pode substituir o exemplo console.log() por uma lógica mais apropriada, como ir para uma cena diferente.
      console.log("play")
    ])

    settigsButton.on('selected', () => [
      console.log("settings")
    ])
    
    creditsButton.on('selected', () => [
      console.log("credits")
    ])
  }

  selectButton(index) {
    const currentButton = this.buttons[this.selectButtonIndex]
    currentButton.setTint(0xFFFFFF)

    const button = this.buttons[index]
    button.setTint(0x66ff7f)

    this.buttonSelector.x = button.x + button.displayWidth * 0.5
    this.buttonSelector.y = button.y + 10

    this.selectButtonIndex = index
  }

  selectNextButton(change = 1) {
    let index = this.selectButtonIndex + change

    if(index >= this.buttons.length)
      index = 0
    else if (index < 0)
      index = this.buttons.length - 1

    this.selectButton(index)
  }

  confirmSelection() {
    const button = this.buttons[this.selectButtonIndex]

    button.emit('selected')
  }

  update () {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if(upJustPressed)
      this.selectNextButton(-1)
    else if(downJustPressed)
      this.selectNextButton(1)
    else if(spaceJustPressed)
      this.confirmSelection()
  }
  
}