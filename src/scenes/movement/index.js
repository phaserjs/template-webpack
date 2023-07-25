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
// import Zone from "../../assets/buttons/Item2.png";
import Zone from "../../assets/buttons/Item2_2.png";
import StepsZone from "../../assets/buttons/Item6.png";
import directions from "../../consts/direction";
import gameStatus from "../../consts/game-status";

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
    this.load.image("steps_zone", StepsZone)
  }

  create() {
    const { width, height } = this.scale;
    const scaleButton = 0.2;
    console.log({ width, height });

    // mapa - 640 x 480
    // zona de largar o botão
    const zone = this.add.zone(24, 480, 528, 60).setDropZone();
    const zoneImage = this.add.image(24, 480, 'zone').setDisplaySize(528, 60).setOrigin(0).setInteractive();
    zoneImage.input.dropZone = true;

    const stepsContainerImage = this.add.image(0, zoneImage.y + zoneImage.displayHeight + 20, 'steps_zone').setDisplaySize(736, 80).setOrigin(0)
    zoneImage.input.dropZone = true;

    this.stepsImageObject = this.add.group();
    
    let moveIcon = false;
    const iconArrowUp = this.add
      .image(0, 0, "arrow_up")
      .setScale(scaleButton);
    iconArrowUp.setName(directions.up);
    iconArrowUp.setInteractive();
    iconArrowUp.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  iconArrowUp);
        iconArrowUp.setTint(0xfffff0);
        let x = zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + iconArrowUp.displayWidth;
        }
  
        let stepImageObject = this.add
          .image(x, zone.y, iconArrowUp.texture.key)
          .setScale(scaleButton).setOrigin(0, -0.1)
  
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
      }
    })

    const iconArrowDown = this.add
      .image(
        iconArrowUp.x + iconArrowUp.displayWidth + 16,
        iconArrowUp.y,
        "arrow_down"
      )
      .setScale(scaleButton);
    iconArrowDown.setName(directions.down);
    iconArrowDown.setInteractive();
    iconArrowDown.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  iconArrowDown);
        iconArrowDown.setTint(0xfffff0);
        let x = zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + iconArrowDown.displayWidth;
        }
  
        let stepImageObject = this.add
          .image(x, zone.y, iconArrowDown.texture.key)
          .setScale(scaleButton).setOrigin(0, -0.1)
  
        this.steps.push(iconArrowDown.name);
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
      }
    })

    const iconArrowLeft = this.add
      .image(
        iconArrowDown.x + iconArrowDown.displayWidth + 16,
        iconArrowDown.y,
        "arrow_left"
      )
      .setScale(scaleButton);
    iconArrowLeft.setName(directions.left);
    iconArrowLeft.setInteractive();
    iconArrowLeft.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  iconArrowLeft);
        iconArrowLeft.setTint(0xfffff0);
        let x = zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + iconArrowLeft.displayWidth;
        }
  
        let stepImageObject = this.add
          .image(x, zone.y, iconArrowLeft.texture.key)
          .setScale(scaleButton).setOrigin(0, -0.1)
  
        this.steps.push(iconArrowLeft.name);
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
      }
    })

    const iconArrowRight = this.add
      .image(
        iconArrowLeft.x + iconArrowLeft.displayWidth + 16,
        iconArrowLeft.y,
        "arrow_right"
      )
      .setScale(scaleButton);
    iconArrowRight.setName(directions.right);
    iconArrowRight.setInteractive();
    iconArrowRight.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  iconArrowRight);
        iconArrowRight.setTint(0xfffff0);
        let x = zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + iconArrowRight.displayWidth;
        }
  
        let stepImageObject = this.add
          .image(x, zone.y, iconArrowRight.texture.key)
          .setScale(scaleButton).setOrigin(0, -0.1)
  
        this.steps.push(iconArrowRight.name);
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
      }
    })

    const iconPlay = this.add.image(zone.x + zone.displayWidth + 32, zone.y + 32, "play").setScale(scaleButton);
    iconPlay.setName("play");
    iconPlay.setInteractive({ pixelPerfect: true });
    iconPlay
      .on("pointerover", () => {
        console.log("play over");
        iconPlay.setTint(0xE3B4B2);
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

    const iconDelete = this.add.image(
        iconArrowRight.x + iconArrowRight.displayWidth + 64, iconArrowRight.y,
        "trash").setOrigin(0.5)
      .setScale(scaleButton);
    iconDelete.setName("delete");
    iconDelete.setInteractive({ pixelPerfect: true });
    iconDelete
      .on("pointerover", () => {
        console.log("delete over");
        iconDelete.setTint(0xE3B4B2);
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

    this.input.setDraggable([
      iconArrowUp,
      iconArrowDown,
      iconArrowLeft,
      iconArrowRight,
    ]);

    const container = this.add.container(stepsContainerImage.displayWidth * 0.25, stepsContainerImage.y + (stepsContainerImage.displayHeight / 2.2)  , [
      iconArrowUp,
      iconArrowDown,
      iconArrowLeft,
      iconArrowRight,
      iconDelete
    ]);

    this.input.on("dragstart", (pointer, gameObject) => {
      console.log("button dragstart")
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
      zoneImage.setTint(0xDFA19A)
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.clearTint();
      zoneImage.clearTint()
    });

    this.input.on("dragleave", (pointer, gameObject, dropZone) => {
      zoneImage.clearTint()
    });

    this.input.on("drop", (pointer, gameObject, dropZone) => {
      let x = dropZone.x;
      console.log({ dropZoneX: dropZone.x });
      if (this.stepsImageObject.getLength() > 0) {
        console.log({ displayWidth: gameObject.displayWidth });
        const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
        console.log({lastStep})
        console.log("Result ", this.stepsImageObject.getChildren().length * gameObject.displayWidth + 20)
        console.log("Result ", lastStep.x + gameObject.displayWidth)
        console.log("Result ", lastStep.x + lastStep.displayWidth)
        // x = dropZone.x + (this.stepsImageObject.getChildren().length * gameObject.displayWidth + 20);
        x = lastStep.x + gameObject.displayWidth;
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
        .setScale(scaleButton).setOrigin(0, -0.1)

      this.steps.push(gameObject.name);
      // this.stepsImageObject.add(stepImageObject.getChildren())
      this.stepsImageObject.add(stepImageObject);
      console.log("stepsImageObject after add step ", {
        stepsImageObject: this.stepsImageObject.getChildren(),
      });
      stepImageObject.on("pointerover", () => {
        stepImageObject.setTint(0xfff000);
      }).on("pointerout", () => {
        stepImageObject.setTint();
      }).on("pointerdown", (event) => {
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
      zoneImage.clearTint()
    });

    this.input.on("dragend", (pointer, gameObject, dropped) => {
      console.log(dropped);
      if (!dropped) {
        gameObject.clearTint();
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      zoneImage.clearTint()
    });

    this.initListeners();
  }

  executeStepsHandler(event) {
    console.log("Movement executeSH " + event);
    console.log({ stepsImageObject: this.stepsImageObject });
    if (event === "STOP") {
      console.log("asdasdasdasda")
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
        image.destroy();
        this.game.events.emit(EventName.gameEnd, { gameStatus: gameStatus.lose })
      });

      if (this.stepsImageObject.getChildren().length === 0)
        this.executeStepsStatus = "WAIT";
    }
  }
}
