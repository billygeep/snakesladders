//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview


var gameScene, wallSprite_01, wallSprite_02, ladder_01, snake_01, wallSprite_03, wall_x = 0;

var current_floor = 0;
var range = 4;
var jump = false;
var drop = false;
var floor_transition = 0;
var start_y = 300;

var wall_width = 168, wall_height = 89;

var wall_array = [
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 2, 0, 0, 0, 2, 2, 0, 2 ],
  [ 0, 1, 0, 2, 1, 1, 1, 1 ],
  [ 2, 0, 0, 0, 2, 1, 1, 1 ],
  [ 1, 2, 1, 1, 1, 2, 2, 2 ],
  [ 0, 1, 0, 2, 1, 0, 2, 1 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 2, 0, 0, 0, 2, 2, 0, 2 ],
  [ 0, 1, 0, 2, 1, 1, 1, 1 ],
  [ 2, 0, 0, 0, 2, 1, 1, 1 ],
  [ 1, 2, 1, 1, 1, 2, 2, 2 ]
]

var object_array = [
  [ 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 2, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0, 2, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 2, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 2, 0, 0, 1, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0 ]
]



Game.prototype = {

  init: function () {
    gameview = this;

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.upKey.onDown.add(this.jumpFloor, this);

    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.downKey.onDown.add(this.dropFloor, this);    
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

    ladder_01 = game.make.sprite(0, 0, 'furniture_sprites', 'close_up.png');
    snake_01 = game.make.sprite(0, 0, 'furniture_sprites', 'close_over.png');

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
     this.hero = new Hero(game, 0, 0);
  },

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////
  /////** YOUR UPDATE FUNCTION **/////
  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  jumpFloor: function () {
    jump = true;
  },

  dropFloor: function () {
    drop = true;
  },

  update: function () {
    this.renderScene();
    if (jump) this.transitionFloor(2);
    if (drop) this.transitionFloor(-2);

  },

  renderScene: function () {

    gameScene.clear();

    wall_x -= 4;
    wall_y = start_y + (current_floor*wall_height) + floor_transition

    var shift_element = false;

    if (wall_x <= -wallSprite_01.width) {
      shift_element = true;
    }

    for (var i = current_floor; i < current_floor+range; i++) {
      for (var j = 0; j < wall_array[i].length; j++) {
        var tile = this.getTile(wall_array[i][j])
        this.drawTile(tile, j, i);
        if(object_array[i][j] > 0) {  
          var object = this.getObject(object_array[i][j]);
          this.drawObject(object, j, i);
        }
      }
    }

    this.drawHero();

    if (shift_element) {
      wall_x = 0;
      for (var k = current_floor; k < current_floor+range; k++) {
        wall_array[k].shift();
        wall_array[k].push(this.getNewTile(k));

        object_array[k].shift();
        object_array[k].push(this.getNewTile(k));
      }
    }  
  },

  transitionFloor: function (_val) {
    floor_transition += _val;

    if (floor_transition >= wall_height) {
      current_floor++;
      floor_transition = 0;
      jump = false;
    }
    if (floor_transition <= -wall_height) {
      current_floor--;
      floor_transition = 0;
      drop = false;
    }
  },

  drawHero: function() {
    gameScene.renderXY(this.hero, 300, start_y+50, false);
  },

  drawTile: function(tile, x, y) {
    gameScene.renderXY(tile, (x*wall_width)+wall_x, wall_y - (y*wall_height), false);
  },

  drawObject: function(object, x, y) {

    var myX = (x*wall_width)+wall_x;
    var myY = wall_y - (y*wall_height);

    gameScene.renderXY(object, myX, myY, false);
    
    if (this.hero.getBounds().contains(myX, myY)) {
    //   console.log('GO')
    console.log('GO')
    }
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

  getObject: function (_object) {

    var object;

    switch (_object) {
      case 0 :
     
      break;
      case 1 :
        object = ladder_01;
      break;
      case 2 :
        object = snake_01;
      break;
    }
    return object;
  },

  // get the new background tile
  getNewTile: function (_level) {
    var tile = Math.floor(Math.random()*3);
    return tile;
  },

  render: function () {

  },
}


