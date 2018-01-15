//for 2 player? 
//game.stage.disableVisibilityChange = true;

var Game = function(game) {};

var gameview

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
    console.log('GAME IN')
    // create groups
    this.groups = {};

    var groups = ["background",
        "sprites",
        "exits",
        "player",
        "tooltips",
        "furniture",
        "hud",
        "dialogue",
        "popups",
        "menu"
    ]
    groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.createTimer()
  },

  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  /////** YOUR CREATE METHODS **/////
  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  
  createTimer: function() {

    this.timer = new GameTimer(game, 200, 200, 5);

    this.meter = new GameMeter(game, 500, 200);
    //this.groups.hud.add(this.timer);
    //this.hero = new Hero(this, playervars.x, playervars.y);
    //set up the camera on the player
   // this.camera.follow(this.hero);
  },  
  createMap: function () {
   // this.map = new Map(this, playervars.currentscene);
  },

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////
  /////** YOUR UPDATE FUNCTION **/////
  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  update: function () {
  },

  render: function () {

  },
}


