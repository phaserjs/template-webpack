import Phaser from 'phaser';
import logoImg from './assets/logo.png';

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

var r1;
var r2;
var r3;
var r4;
var r5;
var r6;
var r7;


const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('arrow', 'assets/sprites/arrow.png');
}

function create ()
{

    keys = this.input.keyboard.addKeys('A, W, D, SPACE, J, I, L');

    r1 = this.add.rectangle(60, 600, 100, 100, 0x6666ff);
    r2 = this.add.rectangle(170, 600, 100, 100, 0x6666ff);
    r3 = this.add.rectangle(280, 600, 100, 100, 0x6666ff);

    r4 = this.add.rectangle(500, 600, 300, 100, 0x6666ff);

    r5 = this.add.rectangle(720, 600, 100, 100, 0x6666ff);
    r6 = this.add.rectangle(830, 600, 100, 100, 0x6666ff);
    r7 = this.add.rectangle(940, 600, 100, 100, 0x6666ff);











//    r3 = this.add.rectangle(600, 200, 148, 148, 0x1a65ac);
//    r3.setStrokeStyle(30, 0xfa65ac);



    /*this.tweens.add({
        targets: r1,
        y: 100,
        duration: 3000,
        ease: 'Power4',
        yoyo: true,
        repeat: true,
        delay: 1000
    });*/
}

function update ()
{
    r1.setAlpha((keys.A.isDown) ? 1 : 0.2);
    r2.setAlpha((keys.W.isDown) ? 1 : 0.2);
    r3.setAlpha((keys.D.isDown) ? 1 : 0.2);

    r4.setAlpha((keys.SPACE.isDown) ? 1 : 0.2);
    
    r5.setAlpha((keys.J.isDown) ? 1 : 0.2);
    r6.setAlpha((keys.I.isDown) ? 1 : 0.2);
    r7.setAlpha((keys.L.isDown) ? 1 : 0.2);

}

//  The callback is always sent a reference to the Tween as the first argument and the targets as the second,
//  then whatever you provided in the onStartParams array as the rest
function onYoyoHandler (tween, target)
{
    console.log(arguments);

    target.toggleFlipX().setAlpha(0.2 + Math.random());
}

