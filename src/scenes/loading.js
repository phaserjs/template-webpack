import { Scene } from "phaser";

import adventurer from '../assets/adventurer-idle-00.png'

export class LoadingScene extends Scene {

    constructor() {

        super('loading-scene')
    }



    preload() {

        // this.load.baseURL = 'assets/'


        this.load.image('adventurer', adventurer)

        this.load.setPath('assets/')
        this.load.atlas('a-adventurer', 'adventurer-sheet.png', 'adventurer-atlas.json')
        console.log(this);
    }

    create() {
        console.log('Loading scene created')

        this.scene.start('level-1-scene')
    }
}