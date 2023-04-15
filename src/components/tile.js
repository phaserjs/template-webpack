class Tile {
    constructor(id, x ,y, showNum,blockType, tileType,tileTypeFirs,tileTypeLast,tileLenght, finishedTile) {
        this.id = new Set();
        this.x = x;
        this.y=y;
        this.showNum = showNum;
        this.tileType = tileType;
        this.blockType = blockType;
        this.tileTypeFirs = tileTypeFirs;
        this.tileTypeLast = tileTypeLast;
        this.tileLenght = tileLenght;
        this.finishedTile = finishedTile;
    }

}