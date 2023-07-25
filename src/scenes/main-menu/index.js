import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";
import GameStatus from "../../consts/game-status";
import Text from "../../classes/text";
import glassPanel from "../../assets/ui-pack/glassPanel.png";
import cursorHand from "../../assets/ui-pack/cursor_hand.png";
import backgroundImage from "../../assets/background.jpeg";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('main-menu-scene')
    this.buttons = []
    this.selectButtonIndex = 0
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.image('glass_panel', glassPanel)
    this.load.image('cursor_hand', cursorHand)
    this.load.image('background', backgroundImage)
  }

  create () {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off('selected')
    })

    const { width, height } = this.scale
    console.log({ width, height })

    this.add.image(width * 0.5, height * 0.5, 'background').setOrigin(0.5)

    // play button
    const playButton = this.add.image(width * 0.5, height * 0.6, 'glass_panel')
      .setDisplaySize(150, 50)
      .setInteractive({pixelPerfect: true})
    this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5)

    const settigsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass_panel')
      .setDisplaySize(150, 50)
      .setInteractive({pixelPerfect: true})
    this.add.text(settigsButton.x, settigsButton.y, 'Settigs').setOrigin(0.5)

    const creditsButton = this.add.image(settigsButton.x, settigsButton.y + settigsButton.displayHeight + 10, 'glass_panel')
      .setDisplaySize(150, 50)
      .setInteractive({pixelPerfect: true})
    this.add.text(creditsButton.x, creditsButton.y, 'Credits').setOrigin(0.5)

    const helpButton = this.add.image(creditsButton.x, creditsButton.y + creditsButton.displayHeight + 10, 'glass_panel')
      .setDisplaySize(150, 50)
      .setInteractive({pixelPerfect: true})
    this.add.text(helpButton.x, helpButton.y, 'Help').setOrigin(0.5)

    this.buttons.push(playButton)
    // this.buttons.push(helpButton)
    this.buttons.push(settigsButton)
    this.buttons.push(creditsButton)

    // this.buttonSelector = this.add.image(0, 0, 'cursor_hand')

    // this.selectButton(0)

    playButton.on('selected', () => {
      // Você pode substituir o exemplo console.log() por uma lógica mais apropriada, como ir para uma cena diferente.
      console.log("play")
      this.scene.start('loading-scene')
    }).on('pointerover', () => {
      console.log("play over")
      playButton.setTint(0xff0000);
    }).on('pointerout', () => {
      console.log("play out")
      playButton.setTint();
    }).on('pointerdown', () => {
      console.log("play click")
      playButton.setTint(0x66ff7f)
      this.scene.start('loading-scene')
    })

    settigsButton.on('selected', () => {
      console.log("settings")
    }).on('pointerdown', () => {
      console.log("settings click")
      settigsButton.setTint(0x66ff7f)
    }).on('pointerover', () => {
      console.log("settings over")
      settigsButton.setTint(0xff0000);
    }).on('pointerout', () => {
      console.log("settings out")
      settigsButton.setTint();
    })

    // settigsButton.on('pointerdown', () => [
    //   console.log("settings")
    // ])
    
    creditsButton.on('selected', () => {
      console.log("credits")
    }).on('pointerdown', () => {
      console.log("credits click")
      creditsButton.setTint(0x66ff7f)
    }).on('pointerover', () => {
      console.log("credits over")
      creditsButton.setTint(0xff0000);
    }).on('pointerout', () => {
      console.log("credits out")
      creditsButton.setTint();
    })
  }

  // selectButton(index) {
  //   const currentButton = this.buttons[this.selectButtonIndex]
  //   currentButton.setTint(0xFFFFFF)

  //   const button = this.buttons[index]
  //   button.setTint(0x66ff7f)

  //   this.buttonSelector.x = button.x + button.displayWidth * 0.5
  //   this.buttonSelector.y = button.y + 10

  //   this.selectButtonIndex = index
  // }

  // selectNextButton(change = 1) {
  //   let index = this.selectButtonIndex + change

  //   if(index >= this.buttons.length)
  //     index = 0
  //   else if (index < 0)
  //     index = this.buttons.length - 1

  //   this.selectButton(index)
  // }

  // confirmSelection() {
  //   const button = this.buttons[this.selectButtonIndex]

  //   button.emit('selected')
  // }

  update () {
    // const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
    // const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
    // const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    // if(upJustPressed)
    //   this.selectNextButton(-1)
    // else if(downJustPressed)
    //   this.selectNextButton(1)
    // else if(spaceJustPressed)
    //   this.confirmSelection()
  
  }
  
}