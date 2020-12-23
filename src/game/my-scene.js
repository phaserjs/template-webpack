import Scene from '../core/scene';

export default class MyScene extends Scene {
    constructor() {
        super('MyScene');
    }

    create() {
        this.add.image(400, 300, 'logo');
    }
}
