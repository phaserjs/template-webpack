import Phaser from 'phaser';
import PreloadScene from "./scenes/PreloadScene.js"
import LevelScene from "./scenes/LevelScene.js"

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [
        PreloadScene,
        LevelScene
    ]
};

const game = new Phaser.Game(config);

/*var keys;
var keyPositions = [];
var keyStrokes = [];

var music;
var barTime;
var noteIndex = 0;

function preload ()
{
    this.load.audio('metronome', metronome)

    noteSheet.forEach((note) => 
    {
        var currentTimeline;
        var currentPosition;

        switch(note.note)
        {
            case "A":
                currentPosition = this.add.rectangle(60, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 1000,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 2000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 600,
                    duration: 750,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "W":
                currentPosition = this.add.rectangle(170, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "D":
                currentPosition = this.add.rectangle(280, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "S":
                currentPosition = this.add.rectangle(500, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "J":
                currentPosition = this.add.rectangle(720, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "I":
                currentPosition = this.add.rectangle(830, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
            case "L":
                currentPosition = this.add.rectangle(940, 1000, 100, 100, 0x6666ff);
                currentPosition.setStrokeStyle(3, 0xFF0000);
                currentTimeline = this.tweens.createTimeline({  })
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 100,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    delay: ((note.time * 1000) + 3000)
                });
        
                currentTimeline.add({
                    targets: currentPosition,
                    y: 1000,
                    duration: 250,
                    ease: 'Quint.easeIn',
                    delay: 0
                });
                break;
        }
        keyStrokes.push({ currentPosition, currentTimeline, note })
    });
    
    keyStrokes.forEach((note) => {
        note.currentTimeline.play();
    });
}

function create ()
{

    music = this.sound.add('metronome');
    music.play();

    /*********************************KEY SETUP*********************************/
    /*keys = this.input.keyboard.addKeys('A, W, D, SPACE, J, I, L');

    keyPositions[0] = this.add.rectangle(60, 600, 100, 100, 0x6666ff);
    keyPositions[1] = this.add.rectangle(170, 600, 100, 100, 0x6666ff);
    keyPositions[2] = this.add.rectangle(280, 600, 100, 100, 0x6666ff);

    keyPositions[3] = this.add.rectangle(500, 600, 300, 100, 0x6666ff);

    keyPositions[4] = this.add.rectangle(720, 600, 100, 100, 0x6666ff);
    keyPositions[5] = this.add.rectangle(830, 600, 100, 100, 0x6666ff);
    keyPositions[6] = this.add.rectangle(940, 600, 100, 100, 0x6666ff);
    /*********************************KEY SETUP*********************************/

//    dPosition = this.add.rectangle(600, 200, 148, 148, 0x1a65ac);
//    dPosition.setStrokeStyle(30, 0xfa65ac);
    //timeline.play()
//}

/*function update ()
{
    keyPositions[0].setAlpha((keys.A.isDown) ? 1 : 0.2);
    keyPositions[1].setAlpha((keys.W.isDown) ? 1 : 0.2);
    keyPositions[2].setAlpha((keys.D.isDown) ? 1 : 0.2);

    keyPositions[3].setAlpha((keys.SPACE.isDown) ? 1 : 0.2);
    
    keyPositions[4].setAlpha((keys.J.isDown) ? 1 : 0.2);
    keyPositions[5].setAlpha((keys.I.isDown) ? 1 : 0.2);
    keyPositions[6].setAlpha((keys.L.isDown) ? 1 : 0.2);

    barTime = (music.getCurrentTime() - (3000/1000));
    //console.log(barTime);

    if(Phaser.Input.Keyboard.JustDown(keys.A))
    {
        console.log(keyStrokes[noteIndex].note.time - barTime)
        if (barTime < 0)
        {
            console.log("Negative");
        }
        else if (-0.3 <= (keyStrokes[noteIndex].note.time - barTime) &&  (keyStrokes[noteIndex].note.time - barTime) <= 0.3)
        {
            console.log("Good");
        }
        else
        {
            console.log("Bad");
        }
    }
    
    if (!keyStrokes[noteIndex])
    {
        //console.log("End")
    }
    else if (barTime > keyStrokes[noteIndex].note.time)
    {
        //console.log(noteIndex + 1)
        noteIndex++;
    }

}*/