export default class Zone {
  constructor(scene) {
    this.renderZone = (x, y, w, h, active) => {
      let dropZone = scene.add
        .zone(x, y, w, h, (active = false)) //(x,y,w,h)
        .setRectangleDropZone(w, h); //(w,h)
      dropZone.setData({ bars: 0 });
      return dropZone;
    };
    this.renderOutline = (dropZone, color) => {
      let dropZoneOutline = scene.add.graphics();
      dropZoneOutline.lineStyle(4, color);
      dropZoneOutline.strokeRect(
        dropZone.x - dropZone.input.hitArea.width / 2,
        dropZone.y - dropZone.input.hitArea.height / 2,
        dropZone.input.hitArea.width,
        dropZone.input.hitArea.height
      );
    };
  }
}
