import button from "./button";
import PathFollower from "phaser3-rex-plugins/plugins/pathfollower"

var goblin;
let skins = ['goblin', 'goblingirl']
let attachments = ['spear', 'dagger', null]
let animations = ['walk', 'idle']

class Goblin extends Phaser.Scene {
    constructor() {
        super({ key: 'Goblin' });
    };

    preload() {
        this.load.image('skin', 'assets/btn/skin.png')
        this.load.image('animation', 'assets/btn/animation.png')
        this.load.image('attachment', 'assets/btn/attachment.png')

        this.load.setPath('spine/')
        this.load.spine('goblin', 'goblins.json', 'goblins.atlas')
    }

    create() {
        const getAttachments = () => {
            return goblin.skeleton.skin.attachments
        }

        const getSlots = () => {
            return goblin.skeleton.slots
        }

        const setAttachment = (slotName, attachmentName) => {
            goblin.skeleton.setAttachment(slotName, attachmentName)
        }

        const setSkin = skinName => {
            goblin.setSkin(null)
            goblin.setSkinByName(skinName)
        }

        const setAnimation = (animation, loop = false) => {
            goblin.play(animation, loop)
        }

        const setSide = () => {
            goblin.scaleX = (-1) * goblin.scaleX;
        }

        // add buttons
        button(this, 100, 50, 'skin', () => {
            let index = (goblin.customParams.skin += 1)
            let skin = skins[index % skins.length]
            setSkin(skin)
        })
        button(this, 290, 50, 'animation', () => {
            let index = (goblin.customParams.animation += 1)
            let animation = animations[index % animations.length]
            setAnimation(animation, true)
        })
        button(this, 480, 50, 'attachment', () => {
            let index = (goblin.customParams.attachment += 1)
            let slot = 'left hand item'
            let attachment = attachments[index % attachments.length]
            setAttachment(slot, attachment)
        })
        button(this, 680, 50, 'attachment', () => {
            let index = (goblin.customParams.attachment += 1)
            setSide();
        })

        // add the goblin
        goblin = this.make.spine({
            x: 0,
            y: 600,
            scale: 0.5,
            key: 'goblin',
            animationName: 'walk',
            loop: true
        })

        goblin.customParams = {
            skin: 0,
            animation: 0,
            attachment: 0
        }
        setSkin('goblin')
        goblin.setMix('walk', 'idle', 0.3)
        goblin.setMix('idle', 'walk', 0.3)

        // remove dagger in right hand
        setAttachment('right hand item', null)

        console.log('Attachments: ', getAttachments())
        console.log('Slots: ', getSlots())

        //goblin.setInteractive();
        //goblin.setAutoUpdate(true);

        function getRandomInt(min: number, max: number): number {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max-min+1)+min);
        };

        function getAngleDeg(): number {
            return Math.atan2(600 - 200, 100 - 500) * 180 / Math.PI;
            //return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        }

        var path = new Phaser.Curves.Path(goblin.x, goblin.y);
        path.lineTo(500, 200);
        path.circleTo(10, false, getAngleDeg());
        path.lineTo(100, 600);

        

        var pathFollower = new PathFollower(goblin, {
            path: path,
            rotateToPath: true
        });
        
        var tween = this.tweens.add({
            targets: pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 10000,
            repeat: -1,
            yoyo: false,
            //onYoyo: setSide(),

        });

        

        //this.add.existing(goblin);
        
        // let tween = this.tweens.add({
        //     targets: goblin,
        //     angle: {
        //         value: { start: -30, to: 30, },
        //         ease: 'Sine.easeInOut',
        //         yoyo: true,
        //         duration: 500,
        //         repeat: -1
        //     },
        //     x: {
        //         value: { start: 300, to: 500 },
        //         ease: 'Cubic.easeInOut',
        //         yoyo: true,
        //         duration: 1000,
        //         repeat: -1
        //     },
        //     y: {
        //         value: { start: 300, to: 500 },
        //         ease: 'Cubic.easeInOut',
        //         yoyo: true,
        //         duration: 1000,
        //         repeat: -1
        //     }
        //     // x: getRandomInt(0,800),
        //     // y: getRandomInt(0,600),
        //     // //path: path,
        //     // ease: 'Linear',
        //     // duration: 10000,
        //     // repeat: -1,
            
        //     // yoyo: false,
        //     // onComplete: function() {
        //     //     this.tweens.add
        //     // }
        // });


        // tween.play();
        
        //tween.play();
        // this.events.on("update", function (time, delta) {
        //     console.log("x: " + goblin.x + " y: " + goblin.y);
        // });

    }
}

export default Goblin