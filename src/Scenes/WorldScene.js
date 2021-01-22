/* eslint-disable */
import Phaser from 'phaser';
export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('World');
        this.score = 0
    }

    create() {
        //map
        this.add.image(400, 300, 'bg')
        this.tick = this.time.now;
        this.shouting = this.time.now
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'map').setScale(10, 0.5).refreshBody();
        this.platforms.create(600, 400, 'map').setScale(3, 0.2).refreshBody();
        this.platforms.create(50, 250, 'map').setScale(2, 0.2).refreshBody();
        this.platforms.create(750, 220, 'map').setScale(4, 0.2).refreshBody();
        this.platforms.create(200, 300, 'map').setScale(1, 0.2).refreshBody();

        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.cowboy = this.physics.add.sprite(780, 400, 'cowboy', { frame: 2 });
        this.cowboy.flipX = true
        this.cowboy.setBounce(0.2);
        this.cowboy.setCollideWorldBounds(true);



        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('bullets', {
                frames: [96, 97, 98, 99]
            }),

            frameRate: 10,
            repeat: 10,
            setXY: { x: 780, y: 400, stepX: 10, stepY: 20 }
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [3, 7, 11, 15],
            }),
            frameRate: 10,
            repeat: 10,
            setXY: { x: 780, y: 400, stepX: 0 }
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0, 4, 8, 12],
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('cowboy',
                { frames: [0, 14, 15, 16] }),
            frameRate: 10,
            repeat: -1
        })
        this.coins = this.physics.add.group({
            key: 'coins',
            repeat: 10,
            setXY: { x: 10, y: 2, stepX: 40 },
            setScale: { x: 0.1, y: 0.1 }
        });
        this.bullets = this.physics.add.group()
        this.cowboy.play('shoot')

        this.coins.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });


        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.cowboy, this.platforms);

        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.overlap(this.cowboy, this.player, this.die, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.bullets = this.add.group()


    }


    createBullet() {

        this.bullets.createMultiple({
            key: 'bullets', frame: 96, setXY: { x: 780, y: 500 }
        })
        this.bullets.children.iterate((child) => {
            this.physics.add.collider(this.bullets, this.platforms);

            child.play('fire')

            this.physics.add.overlap(child, this.player, this.die, null, this);

        })



    }
    collectCoins(player, coin) {
        coin.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.coins.countActive(true) === 0) {
            //  A new batch of .coins to collect
            this.coins.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });


        }
    }
    die() {
        this.model = this.sys.game.globals.model;
        this.model.score = this.score;
        this.scene.start('GameOver')
        this.player.disableBody(true, true)
    }

    shoot() {
        this.bullets.x += (-2)
        this.bullets.y += (-2)
    }

    update() {


        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        this.shoot()
        this.physics.add.overlap(this.bullets, this.player, this.die, null, this);
        if (this.time.now - this.tick > 1000) {
            this.createBullet(this.bullets)
            this.tick = this.time.now;
        }
        if (this.time.now - this.shouting > 10) {
            this.bullets.children.iterate((child) => {
                child.x += Phaser.Math.Between(-4, -2)
                child.y += Phaser.Math.Between(-4, 2)
                if (child.x - 16 <= this.player.x && child.x + 16 >= this.player.x) {
                    if (child.y - 16 <= this.player.y && child.y + 16 >= this.player.y) {
                        this.die()
                    }

                }
            })
            this.shouting = this.time.now;
        }
    }

}