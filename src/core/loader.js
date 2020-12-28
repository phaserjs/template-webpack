import 'phaser';
import logoImg from '../assets/shared/logo.png';
import atlas from '../assets/atlas.json';

export default class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    preload() {
        loadAssetJson(this);

        this.load.image('logo', logoImg);
    }

    create() {
        console.log('BEEBUG: this', this);
        startGame(this);
    }
}

// OK- so because you want to load assets that are not part of the logical tree of the app,
// those need to be served from somewhere- so, we need to pass some config to an http client.

const loadAssetJson = (scene) => {
    // atlas.forEach((pack) => loadAssetPackJson({ scene, pack }));
    atlas.forEach((pack) => {
        console.log('BEEBUG: pack', pack);
        scene.load.json(pack.key, `assets/${pack.path}`);
    });
    // scene.load.start();
    // scene.load.once('complete', () => loadAssets(scene), scene);
};

// const loadAssetPackJson = ({ scene, pack }) => {
//     scene.load.json(pack.key, pack.path);
//     // console.log('BEEBUG: scene', scene);
//     // console.log('BEEBUG: pack', pack);
// };

// const loadAssets = (scene) => {
//     console.log('loading assets');
//     console.log('BEEBUG: scene.cache.json', scene.cache.json);
// };

const GAME_TOP = 2; // index of first non generic scene

const startGame = (scene) =>
    scene.scene.start(scene.scene.manager.getAt(GAME_TOP));
