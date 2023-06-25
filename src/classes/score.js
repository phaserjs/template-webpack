import Text from "./text";

export default class Score extends Text {
  constructor(scene, x, y, initScore = 0) {
    super(scene, x, y, `Baús: ${initScore}`);
    scene.add.existing(this);
    this.scoreValue = initScore;
  }

  changeValue(operation, value) {
    switch (operation) {
      case "INCREASE":
        this.scoreValue += value;
        break;
      case "DECREASE":
        this.scoreValue -= value;
        break;
      case "SET_VALUE":
        this.scoreValue -= value;
        break;
      default:
        break;
    }
    this.setText(`Baús: ${this.scoreValue}`);
  }

  getValue() {
    return this.scoreValue;
  }
}
