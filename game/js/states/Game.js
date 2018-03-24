//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview


var wallSprite_01, wallSprite_02, wallSprite_03, coin, snake_01, wall_x = 0;

var current_floor = 1;
var range = 4;
var jump = false;
var drop = false;
var floor_transition = 0;

var speedX = 2;
var speed_increment = 0.1;

var wall_width = 360, wall_height = 120;

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

var object_array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];


Game.prototype = {

  init: function () {
    gameview = this;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.upKey.onDown.add(this.jumpFloor, this);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.heroJump, this);
    //this.upKey.onUp.add(this.stopJump, this);

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

    //this.game.world.setBounds(0, 0, 3600, this.game.height);
    // create groups
    this.groups = {};

    this.gameScene;
    this.start_y = game.world.height - 89;
    this.playing = false;

    var groups = ["floors",
        "sprites",
        "coins",
        "player",
        "hud"
    ]
    groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.gameScene = game.add.renderTexture(game.width,game.height);
    game.add.sprite(0, 0, this.gameScene);
   // this.groups.background.add(gameScene)

    wallSprite_01 = game.make.sprite(0, 0, 'spritesheets', 'walls/wall_01.jpg');
    wallSprite_02 = game.make.sprite(0, 0, 'spritesheets', 'walls/wall_02.jpg');
    wallSprite_03 = game.make.sprite(0, 0, 'spritesheets', 'walls/wall_03.jpg');

    coin = new Coin(game, 0, 0);

    this.createLevels();
    this.createHero();
    this.createHud();
    //this.createObject(10);

    this.game.world.bringToTop(this.groups.coins);
    this.game.world.bringToTop(this.groups.player);
    this.game.world.bringToTop(this.groups.hud);
    this.groups.coins.enableBody = true;

    this.playing = true;
  },

  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  /////** YOUR CREATE METHODS **/////
  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  
  createLevels: function () {
    this.ground = this.add.tileSprite(0, 360, this.game.world.width,120, 'spritesheets', 'walls/wall_01.jpg');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    this.ground.alpha = 0;

    for (var i = 0; i < 6; i++) {
      var floor = new FloorSection(game, 0,  i*120);
      this.groups.floors.add(floor);
    }
  },

  createObject: function (_length) {
    for (var i = 0; i < _length; i++) {

      let ran = Math.floor(Math.random()*4)

      let coin = new Coin(game, 1200 - (i*100), this.start_y - (ran*wall_height));
      this.groups.coins.add(coin);
    }
  },

  createHero: function () {
     this.hero = new Hero(game, 300, 20);
     this.groups.player.add(this.hero)
     //this.game.camera.follow(this.hero);
     this.game.physics.arcade.enable(this.hero);
     this.hero.body.gravity.y = 800;
  },

  createHud: function () { 
    this.floordisplay = new GameText(game, 50, 50, 1, style.titlestyle, 0.5, 0.5);
    this.groups.hud.add(this.floordisplay)
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
  stopJump: function () {
    jump = false;
  },

  dropFloor: function () {
    if (current_floor > 1)  drop = true;
  },

  heroJump: function() {
    if(this.hero.body.touching.down) {
      this.hero.body.velocity.y = -350;
    }  
  },

  update: function () {

    this.renderScene();
    
    if (jump) this.transitionFloor(2);
    if (drop) this.transitionFloor(-2);
   // this.moveObjects();

    this.game.physics.arcade.collide(this.hero, this.ground, this.heroHit, null, this);

    // if (this.cursors.right.isDown) {
    //   this.hero.body.velocity.x = 300;
    // } else {
    //   this.hero.body.velocity.x = 0;
    // }
  },

  renderScene: function () {

    if (this.playing) {
      this.gameScene.clear();

      wall_x -= speedX;
      wall_y = this.start_y //+ (current_floor*wall_height) + floor_transition

      var shift_element = false;

      if (wall_x <= -wallSprite_01.width) {
        shift_element = true;
        wall_x = 0;
      }

      var me = this;

      this.groups.floors.forEach(function(item) {
        item.updateFloors(shift_element, floor_transition);
      });
    }

    //   for (var j = 0; j < wall_array[i].length; j++) {
    //     var tile = this.getTile(wall_array[i][j])
    //     this.drawTile(tile, j, i);
    //     // if(object_array[i][j] > 0) {  
    //     //   var object = this.getObject(object_array[i][j]);
    //     //   this.drawObject(object, j, i);
    //     // }
    //   }
    //   var object = this.getObject(object_array[i]);
    //   this.drawObject(object, j, i);
    // }

    //this.drawHero();

    // if (shift_element) {
    //   wall_x = 0;
    //   for (var k = current_floor; k < current_floor+range; k++) {
    //     wall_array[k].shift();
    //     wall_array[k].push(this.getNewTile(k));

    //     // object_array[k].shift();
    //     // object_array[k].push(this.getNewTile(k));
    //   }
    // }  
  },

  transitionFloor: function (_val) {

    floor_transition += _val;

    if (floor_transition >= wall_height) {
      current_floor++;
      floor_transition = 0;
      jump = false;
      speedX += speed_increment;

      //console.log('gh')
      this.floordisplay.newText(current_floor);
    }
    if (floor_transition <= -wall_height) {
      current_floor--;
      floor_transition = 0;
      drop = false;
      speedX -= speed_increment;


      this.floordisplay.newText(current_floor);
    }
  },

  drawHero: function() {
    gameScene.renderXY(this.hero, 300, this.start_y, false);
  },

  drawTile: function(_t, _x, _y) {
    var tile = this.getTile(_t);
    this.gameScene.renderXY(tile, (_x*wall_width)+wall_x, _y, false);
  },

  drawObject: function(object, x, y) {
    var myX = (x*wall_width)+wall_x;
    var myY = wall_y - (y*wall_height);

    gameScene.renderXY(object, myX, myY, false);
  },

  moveObjects: function () {

    var me = this;

    this.groups.coins.forEach(function (coin){
      coin.position.x -= speedX;

      if (coin.position.x < -50) {
        coin.destroy();
        me.createObject(1)
      }
    })
  },

  getTile: function (_tile) {

    var tile;

    switch (_tile) {
      case 1 :
        tile = wallSprite_01;
      break;
      case 2 :
        tile = wallSprite_02;
      break;
      case 3 :
        tile = wallSprite_03;
      break;
    }

    return tile;
  },

  getObject: function (_object) {

    var object;

    switch (_object) {
      case 0 :
        object = coin
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
    this.game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  },
}

