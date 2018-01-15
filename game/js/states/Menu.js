var Menu = function(game) {};


Menu.prototype = {

  init: function () {
    this.game.renderer.renderSession.roundPixels = true;
  }, 

  create: function () {

    this.currentgame = 0;
    this.gamecount = 4;

    gameaudio.playSFX('pahping')

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.startGame, this);

    this.gamenumber = game.add.text(game.world.centerX, 342, this.currentgame+1, style.titlestyle);
    //this.game.add.existing(this.gamenumber);

    this.startbutton = new ConfirmButton(game, 495, 480, 'start_button.png', 'start_button_over.png', '', gameJSON.menu_screen.select_button, style.titlestyle);
    this.startbutton.events.onInputDown.add(this.startGame, this);
    this.game.add.existing(this.startbutton);

    this.clickLeft = new ConfirmButton(game, 295, 480, 'start_button.png', 'start_button_over.png', '');
    this.clickLeft.events.onInputDown.add(this.changeGame, this, 0, -1);
    this.game.add.existing(this.clickLeft);

    this.clickRight = new ConfirmButton(game, 695, 480, 'start_button.png', 'start_button_over.png', '');
    this.clickRight.events.onInputDown.add(this.changeGame, this, 0, 1);
    this.game.add.existing(this.clickRight);


  },

  changeGame: function (evt, a, _b) {
    
    var dir = _b;

    this.currentgame += dir;

    if (this.currentgame > this.gamecount-1) this.currentgame = 0
    if (this.currentgame < 0) this.currentgame = this.gamecount-1

    this.gamenumber.setText(this.currentgame+1)
  },

  muteSound: function () {
    if (!gameoptions.muted) {
      this.soundon.loadTexture('furniture_sprites', 'sound_off_inactive.png', 0);
      gameoptions.muted = true;
      gameaudio.pauseCurrent();
    } else {
      this.soundon.loadTexture('furniture_sprites', 'sound_on_active.png', 0);
      gameoptions.muted = false;
      gameaudio.playCurrent();
    }
  },

  startGame: function () {  
  	 game.state.start("Game");
     alert('START GAME ' + (this.currentgame+1))
  }
};