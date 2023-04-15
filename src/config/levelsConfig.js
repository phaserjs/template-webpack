//blockType:
//dead =ak narazi umrie
//bonus =ak dostane nejake body
//finish =ak narazi koniec
//standard =ak narazi nič

//fallDown = nenastavuje na dlazdice, vykona ak spadol hrac;




const level1TileMap = [
  {x: 300, showNum: -32, blockType:'standard', tileType: 'grassdDownMid',tileTypeFirst: 'grassDownLeft',tileTypeLast: 'grassDownRight',tileLenght:5,  },
  {x: 300, showNum: 32, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileTypeLast: 'grassTopRight',tileLenght:5,  },
  {x: 200, showNum: 150, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileTypeLast: 'grassTopRight',tileLenght:4,  },
  {x: 400, showNum: 110, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileLenght:3,  },
  {x: 496, showNum: 0, blockType:'dead',tileType: 'delete',tileLenght:1,  },
  {x: 528, showNum: 0, blockType:'standard',tileType: 'grassTopRight',tileLenght:1,  },


  {x: 200, showNum: 100, blockType:'dead',tileType: 'spike3',tileLenght:5,  },
  {x: 200, showNum: 32, blockType:'standard',tileType: 'grassTopMid',tileLenght:5,},

  {x: 0, showNum:64, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileLenght:4,  },
  {x: 128, showNum:0, blockType:'dead',tileType: 'delete',tileLenght:1,  },


  {x: 300, showNum: 150, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileTypeLast: 'grassTopRight',tileLenght:4,  },
  {x: 550, showNum: 110, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileLenght:3,  },
  {x: 646, showNum: 0, blockType:'dead',tileType: 'delete',tileLenght:1,  },


  {x: 300, showNum: 100, blockType:'dead',tileType: 'spike3',tileLenght:5,  },
  {x: 300, showNum: 32, blockType:'standard',tileType: 'grassTopMid',tileLenght:5,},

  {x:100, showNum:64, blockType:'standard',tileType: 'grassTopMid',tileTypeFirst: 'grassTopLeft',tileLenght:4,  },
  {x: 228, showNum:0, blockType:'dead',tileType: 'delete',tileLenght:1,  },
  {x: 0, showNum:100, blockType:'standard',tileType: 'grassTopMid',tileLenght:5,  },
  
  {x: 300, showNum:100, blockType:'standard',tileType: 'grassDownMid',tileTypeFirst: 'grassDownLeftcorner',tileTypeLast: 'grassDownRightcorner',tileLenght:5,  },
  {x: 332, showNum:32, blockType:'finish',tileType: 'plus',tileLenght:3,  },
  {x: 300, showNum:0, blockType:'standard',tileType: 'grassTopLeftcorner',tileLenght:1,  },
  {x: 428, showNum:0, blockType:'standard',tileType: 'grassTopRightcorner',tileLenght:1,  },
];


const level2TileMap = [
  {x: 60, showNum: 10, tileType: 'standard', finishedTile: false},
  {x: 30, showNum: 30, tileType: 'standard', finishedTile: false},
  {x: 20, showNum: 100, tileType: 'standard', finishedTile: false},
  {x: 0, showNum: 130, tileType: 'standard', finishedTile: false},
  {x: 9, showNum: 140, tileType: 'standard', finishedTile: false},
  {x: 50, showNum: 150, tileType: 'standard', finishedTile: false},
  {x: 150, showNum: 200, tileType: 'standard', finishedTile: false},
  {x: 31, showNum: 312, tileType: 'standard', finishedTile: false},
  {x: 48, showNum: 390, tileType: 'standard', finishedTile: false},
  {x: 28, showNum: 459, tileType: 'standard', finishedTile: false},
  {x: 200, showNum: 497, tileType: 'standard', finishedTile: false},
  {x: 800, showNum: 510, tileType: 'standard', finishedTile: false},
  {x: 90, showNum: 514, tileType: 'standard', finishedTile: true}
];

const level3TileMap = [
  {x: 60, showNum: 10, tileType: 'standard', finishedTile: false},
  {x: 30, showNum: 30, tileType: 'standard', finishedTile: false},
  {x: 20, showNum: 100, tileType: 'standard', finishedTile: false},
  {x: 0, showNum: 130, tileType: 'standard', finishedTile: false},
  {x: 9, showNum: 140, tileType: 'standard', finishedTile: false},
  {x: 50, showNum: 150, tileType: 'standard', finishedTile: false},
  {x: 150, showNum: 200, tileType: 'standard', finishedTile: false},
  {x: 31, showNum: 312, tileType: 'standard', finishedTile: false},
  {x: 48, showNum: 390, tileType: 'standard', finishedTile: false},
  {x: 28, showNum: 459, tileType: 'standard', finishedTile: false},
  {x: 200, showNum: 497, tileType: 'standard', finishedTile: false},
  {x: 800, showNum: 510, tileType: 'standard', finishedTile: false},
  {x: 90, showNum: 514, tileType: 'standard', finishedTile: true}
];

const level4TileMap = [
  {x: 60, y: 200, showNum: 10, tileType: 'standard', finishedTile: false},
  {x: 30, y: 400, showNum: 30, tileType: 'standard', finishedTile: false},
  {x: 20, y: 600, showNum: 100, tileType: 'standard', finishedTile: false},
  {x: 0,  showNum: 130, tileType: 'standard', finishedTile: false},
  {x: 9, showNum: 140, tileType: 'standard', finishedTile: false},
  {x: 50, showNum: 150, tileType: 'standard', finishedTile: false},
  {x: 150, showNum: 200, tileType: 'standard', finishedTile: false},
  {x: 31, showNum: 312, tileType: 'standard', finishedTile: false},
  {x: 48, showNum: 390, tileType: 'standard', finishedTile: false},
  {x: 28, showNum: 459, tileType: 'standard', finishedTile: false},
  {x: 200, showNum: 497, tileType: 'standard', finishedTile: false},
  {x: 800, showNum: 510, tileType: 'standard', finishedTile: false},
  {x: 90, showNum: 514, tileType: 'standard', finishedTile: true}
];

// Define the levels array globally
const levels = [
    new Level(0, 'Hell', 'EASY', 'Level1Scene', true, 'level1', level1TileMap),
    new Level(1, 'Nightmare', 'EASY', 'Level2Scene', true, 'level2', level2TileMap),
    new Level(2, 'Neviem', 'MEDIUM', 'Level3Scene', true, 'level3', level3TileMap),
    new Level(3, 'Dream', 'HARD', 'Level4Scene', true, 'level4', level4TileMap),
];