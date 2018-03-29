//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview;
var jump = false;
var drop = false;

Game.prototype = {

  init: function () {

    gameview = this;

    this.copy = gameJSON.ingame;
    this.game.renderer.renderSession.roundPixels = true;

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

    this.bank = 0;

    //movement
    this.allowXmovement = true;
    this.speedX = 2;
    this.speed_increment = 1;
    this.addition_speed = 0;

    //object vars
    this.object_delay = 50;
    this.object_counter = this.object_delay;
    this.last_floor = -1;

    //walls + floors
    this.wall_width = 320;
    this.wall_height = 120;
    this.floor_jump = 0;
    this.jump_speed = 1;
    this.current_floor = 1;
    this.floor_transition = 0;

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


    this.createLevels();
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
     this.hero = new Hero(game, (game.width/2) - 50, 20);
     this.groups.player.add(this.hero)
     this.game.camera.follow(this.hero);
     this.game.physics.arcade.enable(this.hero);
     this.hero.body.gravity.y = 800;
  },

  createHud: function () { 
    this.floordisplay = new GameText(game, 30, 30, this.copy.floor_counter, style.titlestyle, 0.5, 0.5);
    this.groups.hud.add(this.floordisplay);

    this.bankstatement = new GameText(game, game.width - 30, 30, this.copy.bank_balance, style.titlestyle, 0.5, 0.5);
    this.groups.hud.add(this.bankstatement)
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
    if (this.current_floor > 1)  drop = true;
  },

  heroJump: function() {
    if(this.hero.body.touching.down && this.playing) {
      this.hero.body.velocity.y = -300;
    }  
  },

  update: function () {

    if (this.playing) {

      if (jump || drop) this.transitionFloor();
  
      this.renderScene();
      this.renderObjects();
      this.checkCollisions();
    } else {
      if (this.hero.position.y > this.game.height + this.hero.height) this.showDeathScreen();
    }
  },

  checkCollisions: function() {
    this.game.physics.arcade.collide(this.hero, this.ground, this.heroHit, null, this);
    this.game.physics.arcade.collide(this.hero, this.groups.objects, this.hitObject, null, this);
  },

  hitObject: function (_hero, _obj) {

    var hero = _hero, obj = _obj, touching = true;

    if (this.hero.position.y < 480) touching = false;

    if (_obj.name === 'coin') {
      obj.destroy();
      this.bank++
      this.bankstatement.updateTextField(this.bank)
    } else if (obj.name === 'ladder') {
      if (hero.position.x >= obj.position.x && hero.position.x <= obj.position.x+10 && touching) {
        this.floor_jump = 1;
        this.jump_speed = 2;
        this.jumpFloor();
        obj.name = 'ladder_complete';
      }
    } else if (obj.name === 'hole') {
      if (hero.position.x >= obj.position.x && hero.position.x <= obj.position.x+10 && touching) {
        this.floor_jump = 2;
        this.jump_speed = 4;
        this.jumpFloor();
        hero.visible = false;

        obj.name = 'hole_complete';
      }
    } else if (obj.name === 'enemy') {
      if (this.hero.position.y <= 490-obj.height) {
        obj.body.gravity.y = 800;
        obj.body.velocity.y = -300;
        obj.dead = true;
      } else {
        this.killHero();
      }
      obj.name = 'enemy_complete';
    }
  },

  // control the objects
  renderObjects: function () {

    var me = this;

    //move each object
    this.groups.objects.forEach(function(obj) {
      if (me.allowXmovement) obj.position.x -= me.speedX
        //if obj is dead then stop tracking y position
      if (!obj.dead) obj.position.y = obj.startY + me.floor_transition;
      if (obj.position.x < -obj.width) {
        obj.destroy();
      }
    });

    if (this.object_counter <= 0) {
      this.object_counter = 30 + Math.floor(Math.random()*this.object_delay);
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

    var i = Math.floor(Math.random()*3), f = _floor;
    var obj;

    switch (i) {
      case 0 :
        obj = new Coin(game, game.width + 50, 480   - (f*this.wall_height));
        obj.name = 'coin';
      break;
      case 1 :
        obj = new Enemy(game, game.width + 50, 480   - (f*this.wall_height));
        obj.name = 'enemy';
      break;
      case 2 :
        obj = new Ladder(game, game.width + 50, 480   - (f*this.wall_height));
      break;

      obj.dead = false;
    }

    //var obj = new Ladder(game, game.width + 50, 360 - (_floor*this.wall_height)) //game.add.sprite(game.width + 50, 360 - (_floor*this.wall_height), 'furniture_sprites', 'gates/ladder.png');
    obj.startY = 480 - (_floor*this.wall_height)
    this.groups.objects.add(obj)
  },

  updateObjectPosition:function () {

    var me = this;

    this.groups.objects.forEach(function(object) {
      object.startY += me.floor_transition
    });
  },

  renderScene: function () {
    if (this.allowXmovement) this.floor.tilePosition.x -= this.speedX;
    this.floor.tilePosition.y = this.floor.starty + this.floor_transition;
  },

  transitionFloor: function (_val) {

    this.floor_transition += this.jump_speed;
    this.allowXmovement = false;

    if (this.floor_transition >= (this.wall_height*this.floor_jump)) {
      this.floor.starty += (this.wall_height*this.floor_jump)
      this.updateObjectPosition();
      this.current_floor += this.floor_jump;
      this.floor_transition = 0;
      jump = false;
      this.addition_speed += this.speed_increment;
      this.hero.visible = true;
      if (this.addition_speed >= 10) {
        this.speedX += this.speed_increment;
        this.addition_speed = 0;
      }
      this.allowXmovement = true;
      this.floordisplay.updateTextField(this.current_floor);
    }
    if (this.floor_transition <= -(this.wall_height*this.floor_jump)) {
      this.updateObjectPosition();
      this.current_floor -= this.floor_jump;
      this.floor_transition = 0;
      drop = false;
      this.addition_speed += this.speed_increment;
      if (this.addition_speed >= 0) {
        this.speedX -= this.speed_increment;
        this.addition_speed = 0;
      }
      this.floor.starty -= (this.wall_height*this.floor_jump)
      this.allowXmovement = true;
      this.floordisplay.updateTextField(this.current_floor);
    }
  },

  killHero: function () {
    this.playing = false;
    this.hero.body.velocity.x = -100;
    this.hero.body.velocity.y = -350;
  },

  showDeathScreen: function () {
    game.state.start("DeathScreen");
  },

  render: function () {
    this.game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  },
}

