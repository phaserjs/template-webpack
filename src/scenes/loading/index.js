import Phaser from "phaser";

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading-scene')
  }

  initMap () {
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tilemap_packed", "tiles");

    this.ground = this.map.createLayer("ground", tileset, 0, 0);
    this.objectCollider = this.map.createLayer("objectCollider", tileset, 0, 0);
    this.aboveObject = this.map.createLayer("aboveObject", tileset, 0, 0);
  }

  create() {
    console.log('Loading scene was created')
    this.scene.start('ui-scene')
    this.scene.start('movement-scene')    
    this.scene.start('level-1-scene')
  }
}