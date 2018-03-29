var DeathScreen = function () {};

DeathScreen.prototype = {

  init: function () {
   	this.copy = gameJSON.deathscreen;
  },


  create: function() {

  	this.title = new GameText(game, this.game.width/2, 100, this.copy.title, style.titlestyle, 0.5, 0.5);
    this.title.setShadow(0, 3, '#00b2e2', 0);
    this.game.add.existing(this.title);

  	this.replaybtn = new ConfirmButton(game, this.game.width/2, this.game.height/2, 'furniture/confirm_button.jpg', 'furniture/confirm_button.jpg', '', this.copy.select_button, style.titlestyle);
    this.replaybtn.events.onInputDown.add(this.tryAgain, this);
    this.game.add.existing(this.replaybtn);
  },

  tryAgain: function () {
  	game.state.start("Game");
  }

};
