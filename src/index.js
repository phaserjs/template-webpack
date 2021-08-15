import Phaser from 'phaser';
import {
    io
} from "socket.io-client";

class MyGame extends Phaser.Scene {
    constructor() {
        super();
        this.players = {};
        this.character = null;
        this.keys = {};
    }

    preload() {
        this.load.image('character', 'src/assets/character.png');
    }

    create() {
        // this.socket = io('ws://dtworldz-server.herokuapp.com');
        this.socket = io('localhost:5000');
        this.socket.on("connect", () => {
            console.log(this.socket.id + ' is connected.'); // x8WIv7-mJelg7on_ALbx
            //this.createCharacter(this.socket.id, true);
        });

        this.socket.on("disconnect", () => {
            this.character.destroy();
        });

        this.socket.on("s_createLocalPlayer", (data) => {
            this.createCharacter(data, true);
        });

        this.socket.on("s_disconnectPlayer", (id) => {
            this.players[id].destroy();
            console.log(id + ' is disconnected.');
        });

        this.socket.on("s_newPlayer", (playerData) => {
            this.createCharacter(playerData, false);
        });

        this.socket.on("s_positionChanged", (data) => {
            var delay = Date.now() - data.timeStamp;
            //console.log(delay);
            this.character.lastUpdateTime = data.timeStamp;
            this.tweens.add({
                targets: this.character,
                x: data.player.position.x,
                y: data.player.position.y,
                duration: delay,
                ease: 'Linear',
                yoyo: false,
                delay: 0
            });

        });

        this.socket.on("s_otherPositionChanged", (data) => {
            //this.players[data.player.id].setPosition(data.player.position.x, data.player.position.y);
            var delay = Date.now() - data.timeStamp;
            this.tweens.add({
                targets: this.players[data.player.id],
                x: data.player.position.x,
                y: data.player.position.y,
                duration: delay,
                ease: 'Linear',
                yoyo: false,
                delay: 0
            });

        });

        this.socket.on("s_currentPlayers", (data) => {
            this.createCharacters(data);
        });

        this.input.on('pointerdown', function (pointer) {
            this.sendClientCommand('test');
        }, this);

        this.createKeys();
    }

    update(time, delta) {
    }

    createCharacters(playerDatas) {

        playerDatas.forEach(playerData => {
            this.createCharacter(playerData, false);
        });
    }

    createCharacter(playerData, isLocal) {

        if (isLocal) {
            this.character = this.physics.add.sprite(playerData.position.x, playerData.position.y, 'character');
            //this.cameras.main.startFollow(this.character, true, 0.05, 0.05);
            console.log(playerData.id + ' local character created');
        } else {
            this.players[playerData.id] = this.physics.add.sprite(playerData.position.x, playerData.position.y, 'character');
            console.log(playerData.id + ' other character created');
        }
    }

    sendClientCommand(code) {
        this.socket.emit('c_Command', {
            code: code
        });
    }

    createKeys() {
        var self = this;
        this.keys = [{
                key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                onDown: function (event) {
                    self.sendClientCommand('moveLeftPressed');
                },
                onUp: function (event) {
                    self.sendClientCommand('moveLeftReleased');
                    self.character.x -= 1;
                }
            },
            {
                key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                onDown: function (event) {
                    self.sendClientCommand('moveUpPressed');
                },
                onUp: function (event) {
                    self.sendClientCommand('moveUpReleased');
                }
            },
            {
                key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                onDown: function (event) {
                    self.sendClientCommand('moveRightPressed');
                },
                onUp: function (event) {
                    self.sendClientCommand('moveRightReleased');
                }
            },
            {
                key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
                onDown: function (event) {
                    self.sendClientCommand('moveDownPressed');
                },
                onUp: function (event) {
                    self.sendClientCommand('moveDownReleased');
                }
            }
        ];

        this.keys.forEach(keyObj => {
            keyObj.key.on('down', keyObj.onDown);
            keyObj.key.on('up', keyObj.onUp);
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);