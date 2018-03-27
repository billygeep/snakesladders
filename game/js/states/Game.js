//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview


var wallSprite_01, wallSprite_02, wallSprite_03, coin, snake_01, wall_x = 0;

var current_floor = 1;
var jump = false;
var drop = false;
var floor_transition = 0;

var speedX = 2;


var floor_array = [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]

Game.prototype = {

  init: function () {

  //  game.renderer.renderSession.roundPixels = true;
    this.game.renderer.renderSession.roundPixels = true;


    gameview = this;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    // this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    // this.upKey.onDown.add(this.jumpFloor, this);

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

   // this.game.world.setBounds(0, 0, 1600, this.game.height);
    // create groups
    this.groups = {};

    this.gameScene;
    this.start_y = game.world.height - 89;
    this.playing = false;
    this.wrapping = false;


    //movement
    this.allowXmovement = true;
    this.speedX = 2;
    this.speed_increment = 1;
    this.addition_speed = 0;

    //object vars
    this.object_delay = 80;
    this.object_counter = this.object_delay;
    this.last_floor = -1;

    //walls
    this.wall_width = 320;
    this.wall_height = 120;

    var groups = ["floors",
        "sprites",
        "objects",
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

    wallSprite_01 = game.make.sprite(0, 0, 'furniture_sprites', 'walls/wall_01.jpg');
    wallSprite_02 = game.make.sprite(0, 0, 'furniture_sprites', 'walls/wall_02.jpg');
    wallSprite_03 = game.make.sprite(0, 0, 'furniture_sprites', 'walls/wall_03.jpg');

    coin = new Coin(game, 0, 0);

    this.createLevels();
    //this.createObjects();
    this.createHero();
    
    this.createHud();
    
    //this.game.world.bringToTop(this.groups.coins);
    this.game.world.bringToTop(this.groups.objects);
    this.game.world.bringToTop(this.groups.player);
    this.game.world.bringToTop(this.groups.hud);
   // this.groups.coins.enableBody = true;

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
    this.ground = this.add.sprite(0, 480, 'spritesheets', 'walls/wall_01.jpg');
    this.width = this.game.width;
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    this.ground.alpha = 0;

    var tex = game.add.renderTexture(320, 840, 'bg', true);

    for (var i = 0; i < 7; i++) {
      var img = game.make.image(0, 0, 'spritesheets', 'walls/wall_0'+(i+1)+'.jpg');
      tex.renderXY(img, 0, i*120, false);
    }

    this.floor = this.add.tileSprite(0,0,this.game.world.width,this.game.height,tex);
    this.floor.starty = 0;
    this.floor.inputEnabled = true;
    this.floor.input.useHandCursor = true;
    this.floor.events.onInputDown.add(this.heroJump, this);
  },

  createHero: function () {
     this.hero = new Hero(game, (game.width/2), 20);
     this.groups.player.add(this.hero)
     this.game.camera.follow(this.hero);
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
 
    if (jump) this.transitionFloor(2);
    if (drop) this.transitionFloor(-2);

    if (this.playing) {
      this.renderScene();
      this.renderObjects();
    }

    this.checkCollisions();
  },

  checkCollisions: function() {
    this.game.physics.arcade.collide(this.hero, this.ground, this.heroHit, null, this);

    this.game.physics.arcade.collide(this.hero, this.groups.objects, this.hitObject, null, this);
  },

  hitObject: function (_hero, _obj) {
    if (_obj.name === 'ladder') {
      this.jumpFloor();
      _obj.name = 'ladder_complete';
    }
  },

  // control the objects
  renderObjects: function () {

    var me = this;

    //move each object
    this.groups.objects.forEach(function(object) {
      if (me.allowXmovement) object.position.x -= me.speedX
      object.position.y = object.startY + floor_transition;
      if (object.position.x < -object.width) {
        object.destroy();
      }
    });

    if (this.object_counter <= 0) {
      this.object_counter = 50 + Math.floor(Math.random()*this.object_delay);
      var floor = this.getUniqueRandomSectionNumber();
      this.createObject(floor);
      this.last_floor = floor;
    }

    if (this.allowXmovement) this.object_counter--;
  },

  getUniqueRandomSectionNumber: function() {

    var hasFoundUniqueRandomSelection = false;
    var tempSectionNum = 4;
  
    while (!hasFoundUniqueRandomSelection) {

        tempSectionNum  = Math.floor(Math.random()*4);

        if(tempSectionNum != this.last_floor){
            hasFoundUniqueRandomSelection = true;
        }
     }
     return tempSectionNum;
  },

  createObject: function(_floor) {
    var obj = new Coin(game, game.width + 50, 480   - (_floor*this.wall_height)) //game.add.sprite(game.width + 50, 360 - (_floor*this.wall_height), 'furniture_sprites', 'gates/ladder.png');
    
    //var obj = new Ladder(game, game.width + 50, 360 - (_floor*this.wall_height)) //game.add.sprite(game.width + 50, 360 - (_floor*this.wall_height), 'furniture_sprites', 'gates/ladder.png');
    obj.name = 'ladder';
    obj.startY = 480   - (_floor*this.wall_height)
    this.game.physics.arcade.enable(obj);

    this.groups.objects.add(obj)
  },

  updateObjectPosition:function () {
    this.groups.objects.forEach(function(object) {
      object.startY += floor_transition
    });
  },

  renderScene: function () {
    if (this.allowXmovement) this.floor.tilePosition.x -= this.speedX;
    this.floor.tilePosition.y = this.floor.starty + floor_transition;
  },

  transitionFloor: function (_val) {

    floor_transition += _val;
    this.allowXmovement = false;

    if (floor_transition >= this.wall_height) {
      this.floor.starty += 120
      this.updateObjectPosition();
      current_floor++;
      floor_transition = 0;
      jump = false;
      this.addition_speed += this.speed_increment;

      if (this.addition_speed >= 10) {
        this.speedX += this.speed_increment;
        this.addition_speed = 0;
      }
      this.allowXmovement = true;
      this.floordisplay.newText(current_floor);
    }
    if (floor_transition <= -this.wall_height) {
      this.updateObjectPosition();
      current_floor--;
      floor_transition = 0;
      drop = false;
      this.addition_speed += this.speed_increment;
      if (this.addition_speed >= 0) {
        this.speedX -= this.speed_increment;
        this.addition_speed = 0;
      }
      this.floor.starty -= 120
      this.allowXmovement = true;
      this.floordisplay.newText(current_floor);
    }
  },

  // drawTile: function(_t, _x, _y) {
  //   var tile = this.getTile(_t);
  //   this.gameScene.renderXY(tile, (_x*this.wall_width)+wall_x, _y, false);
  // },

  // getTile: function (_tile) {

  //   var tile;

  //   switch (_tile) {
  //     case 1 :
  //       tile = wallSprite_01;
  //     break;
  //     case 2 :
  //       tile = wallSprite_02;
  //     break;
  //     case 3 :
  //       tile = wallSprite_03;
  //     break;
  //   }

  //   return tile;
  // },

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

  render: function () {
    this.game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  },
}

