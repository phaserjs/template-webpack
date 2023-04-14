const level1TileMap = [
  {X: 60, Y: 10, tileType: 'standard', finishedTile: false},
  {X: 30, Y: 30, tileType: 'standard', finishedTile: false},
  {X: 20, Y: 100, tileType: 'standard', finishedTile: false},
  {X: 0, Y: 130, tileType: 'standard', finishedTile: false},
  {X: 9, Y: 140, tileType: 'standard', finishedTile: false},
  {X: 50, Y: 150, tileType: 'standard', finishedTile: false},
  {X: 150, Y: 200, tileType: 'standard', finishedTile: false},
  {X: 31, Y: 312, tileType: 'standard', finishedTile: false},
  {X: 48, Y: 390, tileType: 'standard', finishedTile: false},
  {X: 28, Y: 459, tileType: 'standard', finishedTile: false},
  {X: 200, Y: 497, tileType: 'standard', finishedTile: false},
  {X: 800, Y: 510, tileType: 'standard', finishedTile: false},
  {X: 90, Y: 514, tileType: 'standard', finishedTile: true}
];

const level2TileMap = [
  {X: 60, Y: 10, tileType: 'standard', finishedTile: false},
  {X: 30, Y: 30, tileType: 'standard', finishedTile: false},
  {X: 20, Y: 100, tileType: 'standard', finishedTile: false},
  {X: 0, Y: 130, tileType: 'standard', finishedTile: false},
  {X: 9, Y: 140, tileType: 'standard', finishedTile: false},
  {X: 50, Y: 150, tileType: 'standard', finishedTile: false},
  {X: 150, Y: 200, tileType: 'standard', finishedTile: false},
  {X: 31, Y: 312, tileType: 'standard', finishedTile: false},
  {X: 48, Y: 390, tileType: 'standard', finishedTile: false},
  {X: 28, Y: 459, tileType: 'standard', finishedTile: false},
  {X: 200, Y: 497, tileType: 'standard', finishedTile: false},
  {X: 800, Y: 510, tileType: 'standard', finishedTile: false},
  {X: 90, Y: 514, tileType: 'standard', finishedTile: true}
];

const level3TileMap = [
  {X: 60, Y: 10, tileType: 'standard', finishedTile: false},
  {X: 30, Y: 30, tileType: 'standard', finishedTile: false},
  {X: 20, Y: 100, tileType: 'standard', finishedTile: false},
  {X: 0, Y: 130, tileType: 'standard', finishedTile: false},
  {X: 9, Y: 140, tileType: 'standard', finishedTile: false},
  {X: 50, Y: 150, tileType: 'standard', finishedTile: false},
  {X: 150, Y: 200, tileType: 'standard', finishedTile: false},
  {X: 31, Y: 312, tileType: 'standard', finishedTile: false},
  {X: 48, Y: 390, tileType: 'standard', finishedTile: false},
  {X: 28, Y: 459, tileType: 'standard', finishedTile: false},
  {X: 200, Y: 497, tileType: 'standard', finishedTile: false},
  {X: 800, Y: 510, tileType: 'standard', finishedTile: false},
  {X: 90, Y: 514, tileType: 'standard', finishedTile: true}
];

const level4TileMap = [
  {X: 60, Y: 10, tileType: 'standard', finishedTile: false},
  {X: 30, Y: 30, tileType: 'standard', finishedTile: false},
  {X: 20, Y: 100, tileType: 'standard', finishedTile: false},
  {X: 0, Y: 130, tileType: 'standard', finishedTile: false},
  {X: 9, Y: 140, tileType: 'standard', finishedTile: false},
  {X: 50, Y: 150, tileType: 'standard', finishedTile: false},
  {X: 150, Y: 200, tileType: 'standard', finishedTile: false},
  {X: 31, Y: 312, tileType: 'standard', finishedTile: false},
  {X: 48, Y: 390, tileType: 'standard', finishedTile: false},
  {X: 28, Y: 459, tileType: 'standard', finishedTile: false},
  {X: 200, Y: 497, tileType: 'standard', finishedTile: false},
  {X: 800, Y: 510, tileType: 'standard', finishedTile: false},
  {X: 90, Y: 514, tileType: 'standard', finishedTile: true}
];

// Define the levels array globally
const levels = [
    new Level(0, 'Hell', 'EASY', 'Level1Scene', true, 'level1', level1TileMap),
    new Level(1, 'Nightmare', 'EASY', 'Level2Scene', true, 'level2', level2TileMap),
    new Level(2, 'Neviem', 'MEDIUM', 'Level3Scene', true, 'level3', level3TileMap),
    new Level(3, 'Dream', 'HARD', 'Level4Scene', true, 'level4', level4TileMap),
];