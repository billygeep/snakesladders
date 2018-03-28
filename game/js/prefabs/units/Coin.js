
//create the graphical hero
var Coin = function (_game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, _game, _x, _y, 'spritesheets', 'gold_coin/g_coin_01.png');

  this.animations.add('rotate', ['gold_coin/g_coin_01.png', 'gold_coin/g_coin_02.png', 'gold_coin/g_coin_03.png', 'gold_coin/g_coin_04.png', 'gold_coin/g_coin_05.png', 'gold_coin/g_coin_06.png', 'gold_coin/g_coin_07.png', 'gold_coin/g_coin_08.png', 'gold_coin/g_coin_09.png', 'gold_coin/g_coin_10.png'], 10, true, false);
  this.anchor.setTo(0.5, 1);

  this.scale = { x: 0.5, y: 0.5}

  _game.physics.arcade.enable(this);
}

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function () {
  this.animations.play('rotate');
}


//create the graphical hero
var Ladder = function (_game, _x, _y) {
  // call Phaser.Sprite constructor
  //Phaser.Sprite.call(this, _game, _x, _y, 'spritesheets', 'gates/ladder.png');


  var i = Math.floor(Math.random()*2);

  switch (i) {
    case 0 :
      Phaser.Sprite.call(this, _game, _x, _y, 'spritesheets', 'gates/ladder.png');
      this.name = 'ladder';
    break;
    case 1 :
      Phaser.Sprite.call(this, _game, _x, _y, 'spritesheets', 'gates/hole.png');

      var exit = game.add.sprite(0, -240, 'spritesheets', 'gates/hole.png');
      exit.anchor.setTo(0.5, 1)
      this.addChild(exit);
      this.name = 'hole';
    break;
  }

  this.anchor.setTo(0.5, 1);
  _game.physics.arcade.enable(this);

 // this.animations.add('rotate', ['gold_coin/g_coin_01.png', 'gold_coin/g_coin_02.png', 'gold_coin/g_coin_03.png', 'gold_coin/g_coin_04.png', 'gold_coin/g_coin_05.png', 'gold_coin/g_coin_06.png', 'gold_coin/g_coin_07.png', 'gold_coin/g_coin_08.png', 'gold_coin/g_coin_09.png', 'gold_coin/g_coin_10.png'], 10, true, false);
 //this.anchor.setTo(0.5, 1);
}

Ladder.prototype = Object.create(Phaser.Sprite.prototype);
Ladder.prototype.constructor = Ladder;

Ladder.prototype.update = function () {
  //this.animations.play('rotate');
}


//create the graphical hero
var Enemy = function (_game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, _game, _x, _y, 'spritesheets', 'gates/ladder_01.jpg');
  this.anchor.setTo(0.5, 1);
  _game.physics.arcade.enable(this);


 // this.animations.add('rotate', ['gold_coin/g_coin_01.png', 'gold_coin/g_coin_02.png', 'gold_coin/g_coin_03.png', 'gold_coin/g_coin_04.png', 'gold_coin/g_coin_05.png', 'gold_coin/g_coin_06.png', 'gold_coin/g_coin_07.png', 'gold_coin/g_coin_08.png', 'gold_coin/g_coin_09.png', 'gold_coin/g_coin_10.png'], 10, true, false);
 //this.anchor.setTo(0.5, 1);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
  //this.animations.play('rotate');
}
