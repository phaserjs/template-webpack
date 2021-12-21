//import Music from '../components/Music.js'
import metronomeSheet from '../assets/noteSheet.json'

export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'LevelScene'});
	}

    create()
    {
        this.noteCount = 0;
        this.currentCount = 0;
        this.currentSheet = this.createNotes();
        this.currentMusic = this.sound.add('metronome');

        /*if (!this.metronomeMusic)
        {
            //this.metronomeMusic = new Music(this, 'metronome_practice', {volume: 0.5});
            this.metronomeMusic = this.sound.add('metronome');
        }
        if (!this.levelMusic)
        {
            //this.levelMusic = new Music(this, 'music', {volume: 0.5});
            this.levelMusic = this.sound.add('song');
        }*/

        this.keys = this.input.keyboard.addKeys('A, W, D, SPACE, J, I, L');

        this.keyPositions = [];

        this.keyPositions[0] = this.add.rectangle(60, 600, 100, 100, 0x6666ff);
        this.keyPositions[1] = this.add.rectangle(170, 600, 100, 100, 0x6666ff);
        this.keyPositions[2] = this.add.rectangle(280, 600, 100, 100, 0x6666ff);

        this.keyPositions[3] = this.add.rectangle(500, 600, 300, 100, 0x6666ff);

        this.keyPositions[4] = this.add.rectangle(720, 600, 100, 100, 0x6666ff);
        this.keyPositions[5] = this.add.rectangle(830, 600, 100, 100, 0x6666ff);
        this.keyPositions[6] = this.add.rectangle(940, 600, 100, 100, 0x6666ff);

        this.currentMusic.play()    
    }

    update()
    {
        var timing = ((this.currentMusic.getCurrentTime()) / (60 / 120) - 8); // - 8 is the offeset
        this.playNote();
        this.checkNote(timing);

        this.keyPositions[0].setAlpha((this.keys.A.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.A))
        {
            if (!this.currentSheet[this.currentCount])
            {
                console.log("End Tap");
            }
            else if (timing < -0.5)
            {
                console.log("Negative");
            }
            else if (-0.3 <= (timing - this.currentSheet[this.currentCount].time) && (timing - this.currentSheet[this.currentCount].time) <= 0.3)
            {
                console.log("Good");
                this.currentCount++;
            }
            else
            {
                console.log("Bad");
            }
        }
        this.keyPositions[1].setAlpha((this.keys.W.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.W))
        {
            console.log("W");
            
        }
        this.keyPositions[2].setAlpha((this.keys.D.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.D))
        {
            console.log("D");
        }
        this.keyPositions[3].setAlpha((this.keys.SPACE.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE))
        {
            console.log("Space");
        }
        this.keyPositions[4].setAlpha((this.keys.J.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.J))
        {
            console.log("J");
        }
        this.keyPositions[5].setAlpha((this.keys.I.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.I))
        {
            console.log("I");
        }
        this.keyPositions[6].setAlpha((this.keys.L.isDown) ? 1 : 0.2);
        if(Phaser.Input.Keyboard.JustDown(this.keys.L))
        {
            console.log("L");
        }
    }

    createNotes()
    {
        var sheet = [];
        
        metronomeSheet.forEach(element => {
            var position;
            var timeline;
            var time = (element.time);

            switch(element.note)
            {
                case "A":
                    position = this.add.rectangle(60, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "W":
                    position = this.add.rectangle(170, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "D":
                    position = this.add.rectangle(280, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "S":
                    position = this.add.rectangle(500, -50, 300, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "J":
                    position = this.add.rectangle(720, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "I":
                    position = this.add.rectangle(830, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
                case "L":
                    position = this.add.rectangle(940, -50, 100, 100, 0x6666ff);
                    position.setStrokeStyle(3, 0xFF0000);
                    timeline = this.tweens.createTimeline({  })
            
                    timeline.add({
                        targets: position,
                        y: 550,
                        duration: 2000,
                        ease: 'Linear'
                    });

                    timeline.add({
                        targets: position,
                        y: 1150,
                        duration: 1500,
                        ease: 'Linear'
                    });
                    break;
            }
            sheet.push({position, timeline, time})
        });
        return sheet;
    }

    playNote()
    {   
        if(!this.currentSheet[this.noteCount])
            {
                //console.log("End of song")
            }        
        else if (((this.currentMusic.getCurrentTime() - 4) / (60 / 120)) >= (this.currentSheet[this.noteCount].time - 4))
        {
                this.currentSheet[this.noteCount].timeline.play();
                this.noteCount++;
        }
    }

    checkNote(timing)
    {
        if(!this.currentSheet[this.currentCount])
        {
            //console.log("End of song")
        }  
        else if (timing >= this.currentSheet[this.currentCount].time + .5)
        {
            console.log("Missed note: " + timing);
            this.currentCount++;
        }
    }
}