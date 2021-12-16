import Phaser from 'phaser';
import noteSheet from './components/noteSheet.json';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var keys;
var keyPositions = [];
var keyStrokes = []; // 2d array note contains [object, timetable]
var timeline;

const game = new Phaser.Game(config);

function preload ()
{
    noteSheet.aNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(60, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0xFF0000);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    noteSheet.wNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(170, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0xFFA500);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    noteSheet.dNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(280, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0xFFFF00);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    noteSheet.spaceNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(500, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0x00FF00);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    noteSheet.jNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(720, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0x0000FF);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    noteSheet.iNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(830, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0x4B0082);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });
    
    noteSheet.lNotes.forEach((note) => {
        var currentTimeline;
        var currentPosition;


        currentPosition = this.add.rectangle(940, 1000, 100, 100, 0x6666ff);
        currentPosition.setStrokeStyle(3, 0x8F00FF);
        currentTimeline = this.tweens.createTimeline({  })

        currentTimeline.add({
            targets: currentPosition,
            y: 100,
            duration: 500,
            ease: 'Cubic.easeOut',
            delay: (note.time * 60)
        });

        currentTimeline.add({
            targets: currentPosition,
            y: 1000,
            duration: 500,
            ease: 'Quint.easeIn',
            delay: 0
        });
        keyStrokes.push({currentPosition, currentTimeline, "time": note.time })
    });

    keyStrokes.sort(function (a, b) {
        return a.time - b.time;
      });
}

function create ()
{
    /*********************************KEY SETUP*********************************/
    keys = this.input.keyboard.addKeys('A, W, D, SPACE, J, I, L');

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

    keyStrokes.forEach((note) => {
        note.currentTimeline.play();
    });
    //timeline.play()
}

function update ()
{
    keyPositions[0].setAlpha((keys.A.isDown) ? 1 : 0.2);
    keyPositions[1].setAlpha((keys.W.isDown) ? 1 : 0.2);
    keyPositions[2].setAlpha((keys.D.isDown) ? 1 : 0.2);

    keyPositions[3].setAlpha((keys.SPACE.isDown) ? 1 : 0.2);
    
    keyPositions[4].setAlpha((keys.J.isDown) ? 1 : 0.2);
    keyPositions[5].setAlpha((keys.I.isDown) ? 1 : 0.2);
    keyPositions[6].setAlpha((keys.L.isDown) ? 1 : 0.2);

}

//  The callback is always sent a reference to the Tween as the first argument and the targets as the second,
//  then whatever you provided in the onStartParams array as the rest
function onYoyoHandler (tween, target)
{
    console.log(arguments);

    target.toggleFlipX().setAlpha(0.2 + Math.random());
}

function noteRead(noteSheet)
{
}