import { Scene } from "phaser";


export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }



    preload() {

        this.load.baseURL = 'assets/'


        this.load.image('adventurer', 'adventurer-idle-00.png')


        this.load.atlas('a-adventurer', 'adventurer-sheet.png', 'adventurer_atlas.json')
        console.log(this);
    }

    create() {
        console.log('Loading scene created')

        this.scene.start('level-1-scene')
    }
}