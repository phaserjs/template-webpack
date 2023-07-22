import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";
import DirectionPlayer from "../../consts/direction";
import Text from "../../classes/text";
import ArrowUp from "../../assets/buttons/Icon_ArrowUp.png";
import ArrowDown from "../../assets/buttons/Icon_ArrowDown.png";
import ArrowLeft from "../../assets/buttons/Icon_ArrowLeft.png";
import ArrowRight from "../../assets/buttons/Icon_ArrowRight.png";
import Play from "../../assets/buttons/Icon_Tube.png";
import Trash from "../../assets/buttons/Icon_Trash.png";
import Zone from "../../assets/buttons/Item3.png";
import directions from "../../consts/direction";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    // super("movement-scene");
    super({ key: "movement-scene", active: true });
    // super({ key: "movement-scene", active: true, visible: false });
    this.buttons = [];
    this.selectButtonIndex = 0;
    this.steps = [];
    this.executeStepsStatus = "WAIT";
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image("arrow_up", ArrowUp);
    this.load.image("arrow_down", ArrowDown);
    this.load.image("arrow_left", ArrowLeft);
    this.load.image("arrow_right", ArrowRight);
    this.load.image("play", Play);
    this.load.image("trash", Trash);
    this.load.image("zone", Zone)
  }

  create() {
    const { width, height } = this.scale;
    const scaleButton = 0.2;
    console.log({ width, height });

    // mapa - 640 x 480
    // zona de largar o botão
    const zone = this.add.zone(24, 500, 592, 60).setDropZone();
    console.log({ x: zone.x, hitAreaX: zone.input.hitArea.x,
      y: zone.y, hitAreaY : zone.input.hitArea.y,
      hitAreaW: zone.input.hitArea.width,
      hitAreaH: zone.input.hitArea.height})
    this.stepsImageObject = this.add.group();

    const iconArrowUp = this.add
      .image(0, 0, "arrow_up")
      .setScale(scaleButton);
    iconArrowUp.setName(directions.up);
    iconArrowUp.setInteractive();
    iconArrowUp.on("pointerover", () => {
      console.log("play over");
      iconArrowUp.setTint(0xfff000);
    }).on("pointerout", () => {
      console.log("play out");
      iconArrowUp.setTint();
    }).on("pointerup", (pointer) => {
      pointer.downX
      pointer.downY
      pointer.upX
      pointer.upY
      console.log("pointer ", pointer)
      console.log("click arrow_up ",  iconArrowUp);
      iconArrowUp.setTint(0xfffff0);
      let x = zone.x;
      console.log({ dropZoneX: zone.x });
      if (this.steps.length > 0) {
        console.log({ displayWidth: iconArrowUp.displayWidth });
        x = zone.x + (this.steps.length * iconArrowUp.displayWidth + 20);
      }

      let stepImageObject = this.add
        .image(x, zone.y, iconArrowUp.texture.key)
        .setScale(scaleButton)

      this.steps.push(iconArrowUp.name);
      // this.stepsImageObject.add(stepImageObject.getChildren())
      this.stepsImageObject.add(stepImageObject);
      console.log("stepsImageObject after add step ", {
        stepsImageObject: this.stepsImageObject.getChildren(),
      });
      stepImageObject.on("pointerdown", (event) => {
        console.log({event, stepImageObject});
        //  Then destroy it. This will fire a 'destroy' event that the Group will hear
        //  and then it'll automatically remove itself from the Group.
        console.log("stepsImageObject before delete step ", {
          stepImageObject: this.stepsImageObject.getChildren(),
        });
        const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
        console.log({indexStepDestroy})
        let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
        let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
        stepImageObject.destroy();
        for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
          if(this.stepsImageObject.getChildren()[index])
          {
            console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
            nextStepPositionX = this.stepsImageObject.getChildren()[index].x
            this.stepsImageObject.getChildren()[index].setX(positionX)
            positionX = nextStepPositionX
          }
        }
        console.log("stepsImageObject after delete step ", {
          stepsImageObject: this.stepsImageObject.getChildren(),
        });
      })
      .setInteractive();
    })

    const iconArrowDown = this.add
      .image(
        iconArrowUp.x,
        iconArrowUp.y + iconArrowUp.displayHeight + 16,
        "arrow_down"
      )
      .setScale(scaleButton);
    iconArrowDown.setName(directions.down);
    iconArrowDown.setInteractive();

    const iconArrowLeft = this.add
      .image(
        iconArrowDown.x,
        iconArrowDown.y + iconArrowDown.displayHeight + 20,
        "arrow_left"
      )
      .setScale(scaleButton);
    iconArrowLeft.setName(directions.left);
    iconArrowLeft.setInteractive();

    const iconArrowRight = this.add
      .image(
        iconArrowLeft.x,
        iconArrowLeft.y + iconArrowLeft.displayHeight + 20,
        "arrow_right"
      )
      .setScale(scaleButton);
    iconArrowRight.setName(directions.right);
    iconArrowRight.setInteractive();

    const iconPlay = this.add.image(zone.x + zone.displayWidth + 32, zone.y + 32, "play").setScale(scaleButton);
    iconPlay.setName("play");
    iconPlay.setInteractive({ pixelPerfect: true });
    iconPlay
      .on("pointerover", () => {
        console.log("play over");
        iconPlay.setTint(0xf00000);
      })
      .on("pointerout", () => {
        console.log("play out");
        iconPlay.setTint();
      })
      .on("pointerdown", () => {
        console.log("play click");
        iconPlay.setTint(0x66ff7f);
        this.game.events.emit(EventName.executeSteps, "EXECUTE", {
          steps: this.steps,
        });
        // this.scene.start('loading-scene')
      });

    const iconDelete = this.add.image(iconPlay.x + iconPlay.displayWidth + 10, iconPlay.y , "trash").setScale(scaleButton);
    iconDelete.setName("delete");
    iconDelete.setInteractive({ pixelPerfect: true });
    iconDelete
      .on("pointerover", () => {
        console.log("delete over");
        iconDelete.setTint(0xf00000);
      })
      .on("pointerout", () => {
        console.log("delete out");
        iconDelete.setTint();
      })
      .on("pointerdown", () => {
        console.log("delete click");
        iconDelete.setTint(0x66ff7f);
        this.game.events.emit(EventName.executeSteps, "STOP", { steps: [] });
        // this.scene.start('loading-scene')
      });

    // this.input.setDraggable(iconArrowUp)
    this.input.setDraggable([
      iconArrowUp,
      iconArrowDown,
      iconArrowLeft,
      iconArrowRight,
    ]);
    console.log({ iconArrowUp });
    const container = this.add.container(640 + 32, 256, [
      iconArrowUp,
      iconArrowDown,
      iconArrowLeft,
      iconArrowRight,
    ]);

    //  Just a visual display of the drop zone
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(
      zone.x + zone.input.hitArea.x,
      zone.y + zone.input.hitArea.y,
      zone.input.hitArea.width,
      zone.input.hitArea.height
    );

    this.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setTint(0xff0000);
    });

    // this.input.on('dragstart', function (pointer, gameObject)
    // {
    //     // coloca o ultimo objeto/image/sprite no topo
    //     this.children.bringToTop(gameObject);

    // }, this);

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragenter", (pointer, gameObject, dropZone) => {
      console.log({ dropZone, zone})
      graphics.clear();
      graphics.lineStyle(2, 0x00ffff);
      graphics.strokeRect(
        zone.x + zone.input.hitArea.x,
        zone.y + zone.input.hitArea.y,
        zone.input.hitArea.width,
        zone.input.hitArea.height
      );
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.clearTint();
    });

    this.input.on("dragleave", (pointer, gameObject, dropZone) => {
      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(
        zone.x + zone.input.hitArea.x,
        zone.y + zone.input.hitArea.y,
        zone.input.hitArea.width,
        zone.input.hitArea.height
      );
    });

    this.input.on("drop", (pointer, gameObject, dropZone) => {
      let x = dropZone.x;
      console.log({ dropZoneX: dropZone.x });
      if (this.steps.length > 0) {
        console.log({ displayWidth: gameObject.displayWidth });
        x = dropZone.x + (this.steps.length * gameObject.displayWidth + 20);
      }

      console.log({ steps: this.steps });
      // console.log({gameObject})
      // gameObject.x = x;
      // gameObject.y = dropZone.y;
      gameObject.clearTint();
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;

      // gameObject.input.enabled = false;
      // const container = this.add.container(20, 50, [iconArrowUp, iconArrowDown, iconArrowLeft, iconArrowRight]).add

      let stepImageObject = this.add
        .image(x, dropZone.y, gameObject.texture.key)
        .setScale(scaleButton)

      this.steps.push(gameObject.name);
      // this.stepsImageObject.add(stepImageObject.getChildren())
      this.stepsImageObject.add(stepImageObject);
      console.log("stepsImageObject after add step ", {
        stepsImageObject: this.stepsImageObject.getChildren(),
      });
      stepImageObject.on("pointerdown", (event) => {
        console.log({event, stepImageObject});
        //  Then destroy it. This will fire a 'destroy' event that the Group will hear
        //  and then it'll automatically remove itself from the Group.
        console.log("stepsImageObject before delete step ", {
          stepImageObject: this.stepsImageObject.getChildren(),
        });
        const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
        console.log({indexStepDestroy})
        let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
        let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
        stepImageObject.destroy();
        for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
          if(this.stepsImageObject.getChildren()[index])
          {
            console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
            nextStepPositionX = this.stepsImageObject.getChildren()[index].x
            this.stepsImageObject.getChildren()[index].setX(positionX)
            positionX = nextStepPositionX
          }
        }
        console.log("stepsImageObject after delete step ", {
          stepsImageObject: this.stepsImageObject.getChildren(),
        });
      })
      .setInteractive();
    });

    this.input.on("dragend", (pointer, gameObject, dropped) => {
      console.log(dropped);
      if (!dropped) {
        gameObject.clearTint();
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }

      graphics.clear();
      graphics.lineStyle(2, 0xffff00);
      graphics.strokeRect(
        zone.x + zone.input.hitArea.x,
        zone.y + zone.input.hitArea.y,
        zone.input.hitArea.width,
        zone.input.hitArea.height
      );
    });

    this.initListeners();
  }

  executeStepsHandler(event) {
    console.log("Movement executeSH " + event);
    console.log({ stepsImageObject: this.stepsImageObject });
    if (event === "STOP") {
      this.steps = [];
      this.executeStepsStatus = "STOP";
    }
  }

  initListeners() {
    this.game.events.on(EventName.executeSteps, this.executeStepsHandler, this);
  }

  update() {
    if (this.executeStepsStatus == "STOP" && this.steps.length === 0) {
      this.stepsImageObject.getChildren().forEach((image) => {
        // this.stepsImageObject.children.entries.forEach(image => {
        image.destroy();
      });

      if (this.stepsImageObject.getChildren().length === 0)
        this.executeStepsStatus = "WAIT";
    }
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
