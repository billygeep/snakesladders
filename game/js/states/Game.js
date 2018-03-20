//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview


var gameScene, wallSprite_01, wallSprite_02, wallSprite_03, wall_x = 0;

var wall_array = [
  [ 0, 1, 0, 2, 1 ],
  [ 2, 0, 0, 0, 2 ],
  [ 1, 2, 1, 1, 1 ]
]



Game.prototype = {

  init: function () {
    gameview = this;
  },

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////
  /////** YOUR CREATE FUNCTION **/////
  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  create: function () {
    // create groups
    this.groups = {};

    var groups = ["background",
        "sprites"
    ]
    groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    gameScene = game.add.renderTexture(game.width,game.height);
    game.add.sprite(0, 0, gameScene);

    wallSprite_01 = game.make.sprite(0, 0, 'furniture_sprites', 'start_button.png');
    wallSprite_02 = game.make.sprite(0, 0, 'furniture_sprites', 'quit_button.png');
    wallSprite_03 = game.make.sprite(0, 0, 'furniture_sprites', 'quit_button_over.png');

    this.createLevels();
    this.createHero();
  },

  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  /////** YOUR CREATE METHODS **/////
  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  
  createLevels: function () {

  },

  createHero: function () {
     this.hero = game.make.sprite(0, 0, 'furniture_sprites', 'pause_button.png');
  },

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////
  /////** YOUR UPDATE FUNCTION **/////
  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  update: function () {
    this.renderScene();
  },

  renderScene: function () {
    gameScene.clear();

    // var startTileX=Math.max(0,0-cornerMapTile.x);
    // var startTileY=Math.max(0,0-cornerMapTile.y);
    // var endTileX=Math.min(this.levelData[0].length,startTileX+visibleTiles.x);
    // var endTileY=Math.min(this.levelData.length,startTileY+visibleTiles.y);

    wall_x -= 2;

    var shift_element = false;

    if (wall_x <= -wallSprite_01.width) {
      shift_element = true;
    }


    for (var i = 0; i < wall_array.length; i++) {
      for (var j = 0; j < wall_array[i].length; j++) {
        var tile = this.getTile(wall_array[i][j])
        this.drawTile(tile, j, i);
      }
    }

    this.drawHero();

    if (shift_element) {
      wall_x = 0;
      for (var k = 0; k < wall_array.length; k++) {
        wall_array[k].shift();
        wall_array[k].push(this.getNewTile(k));
      }
    }
    
  },

  drawHero: function() {
    gameScene.renderXY(this.hero, 100, 65, false);
  },

  drawTile: function(tile, x, y) {
    gameScene.renderXY(tile, (x*tile.width)+wall_x, y*-tile.height, false);
  },

  getTile: function (_tile) {

    var tile;

    switch (_tile) {
      case 0 :
        tile = wallSprite_01;
      break;
      case 1 :
        tile = wallSprite_02;
      break;
      case 2 :
        tile = wallSprite_03;
      break;
    }

    return tile;
  },

  getNewTile: function (_level) {
    var tile = Math.floor(Math.random()*_level);

    return tile;
  },

  render: function () {

  },
}


