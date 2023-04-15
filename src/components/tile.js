class Tile {
    constructor(id, x ,y, showNum, tileType,tileTypeFirs,tileTypeLast,tileLenght, finishedTile) {
        this.id = new Set();
        this.x = x;
        this.y=y;
        this.showNum = showNum;
        this.tileType = tileType;
        this.tileTypeFirs = tileType;
        this.tileTypeLast = tileType;
        this.tileLenght = tileLenght;
        this.finishedTile = finishedTile;
    }

}