const level1TileMap = [
  {X: 20, Y: 10, tileType: 'standard'},
  {X: 20, Y: 10, tileType: 'standard'},
  {X: 20, Y: 10, tileType: 'standard'},
  {X: 20, Y: 10, tileType: 'standard'},
  {X: 20, Y: 10, tileType: 'standard'}
];

// Define the levels array globally
const levels = [
    new Level(0, 'Hell', 'EASY', 'Level1Scene', true, 'level1', level1TileMap),
    new Level(1, 'Nightmare', 'EASY', 'Level2Scene', false, 'level2', level1TileMap),
    new Level(2, 'Neviem', 'MEDIUM', 'Level3Scene', false, 'level3', level1TileMap),
    new Level(3, 'Dream', 'HARD', 'Level4Scene', false, 'level4', level1TileMap),
];