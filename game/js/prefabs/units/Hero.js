
//create the graphical hero
var Hero = function (_game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, _game, _x, _y, 'furniture_sprites', 'speech_bubble_tr_orange.png');

  // this.animations.add('stop', ["lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0010", "lincolnstop/0001", "lincolnstop/0002", "lincolnstop/0003", "lincolnstop/0004", "lincolnstop/0005", "lincolnstop/0006", "lincolnstop/0007", "lincolnstop/0008", "lincolnstop/0009"], 10, true, false);
  // this.animations.add('crawlstop', ["lincolncrawlfront/0001"], 10, true, false);
  // this.animations.add('back', ["lincolnback/0001"], 10, true, false);
  // this.animations.add('lincolnexit', ["lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0002","lincolnexit/0003","lincolnexit/0002","lincolnexit/0001","lincolnexit/0001","lincolnexit/0001","lincolnexit/0002","lincolnexit/0003","lincolnexit/0002"], 10, true, false);
  // this.animations.add('stairleft', ["lincolnleft/0007"], 10, true, false);
  // this.animations.add('stairright', ["lincolnright/0007"], 10, true, false);
  // this.animations.add('walkright', ["lincolnright/0001", "lincolnright/0002", "lincolnright/0003", "lincolnright/0004", "lincolnright/0005", "lincolnright/0006", "lincolnright/0007", "lincolnright/0008", "lincolnright/0009", "lincolnright/0010"], 10, true, false);
  // this.animations.add('walkleft', ["lincolnleft/0001", "lincolnleft/0002", "lincolnleft/0003", "lincolnleft/0004", "lincolnleft/0005", "lincolnleft/0006", "lincolnleft/0007", "lincolnleft/0008", "lincolnleft/0009", "lincolnleft/0010"], 10, true, false);
  // this.animations.add('eyes', ["lincolndark/0001", "lincolndark/0002", "lincolndark/0003", "lincolndark/0004", "lincolndark/0005", "lincolndark/0006", "lincolndark/0007", "lincolndark/0008", "lincolndark/0009", "lincolndark/0010"], 10, true, false);
  // this.animations.add('crawl', ["lincolncrawl/0001","lincolncrawl/0002","lincolncrawl/0003","lincolncrawl/0004","lincolncrawl/0005","lincolncrawl/0006","lincolncrawl/0007","lincolncrawl/0008","lincolncrawl/0009","lincolncrawl/0010","lincolncrawl/0011","lincolncrawl/0012","lincolncrawl/0013","lincolncrawl/0014","lincolncrawl/0015","lincolncrawl/0016","lincolncrawl/0017","lincolncrawl/0018"], 10, true, false);
  // this.animations.add('crawlfront', ["lincolncrawlfront/0001","lincolncrawlfront/0002","lincolncrawlfront/0003","lincolncrawlfront/0004","lincolncrawlfront/0005","lincolncrawlfront/0006"], 10, true, false);
  // this.animations.add('stopdark', ["lincolnstopdark/0001"], 10, true, false);

  this.anchor.setTo(0.5, 1);
  game.physics.arcade.enable(this);

  this.getAnimationName = function () {

    var name = 'stop'; // default animation

    return name;
  }
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;



// //create the item detector body
// var HeroGrabber = function (game_state, x, y) {

//   // call Phaser.Sprite constructor
//   Phaser.Sprite.call(this, game_state, x, y, 'furniture_sprites', 'body.png');

//   this.anchor.set(0.5, 1);
//   game_state.groups['player'].add(this);

//   this.height = 280;
//   this.width = 60
//   this.alpha = 0;
// }

// HeroGrabber.prototype = Object.create(Phaser.Sprite.prototype);
// HeroGrabber.prototype.constructor = HeroGrabber;

// //create the hero body
// var Hero = function (game_state, x, y) {
//   // call Phaser.Sprite constructor
//   Phaser.Sprite.call(this, game_state, x, y, 'furniture_sprites', 'body.png');
  
//   this.anchor.set(0.5, 1);
//   game_state.groups['player'].add(this);

//   this.alpha = 0;
//   this.height = 42;
//   this.width = 42;
// }

// Hero.prototype = Object.create(Phaser.Sprite.prototype);
// Hero.prototype.constructor = Hero;

// Hero.prototype.moveX = function (direction) {
//   var SPEED = 350;
//   this.body.velocity.x = direction * SPEED;

//   if (this.body.velocity.x < 0) {
//     this.scale.x = -1;
//   } else {
//     this.scale.x = 1;
//   }
// };

// Hero.prototype.moveY = function (direction) {
//   var SPEED = 350;
//   this.body.velocity.y = direction * SPEED;
//   if (this.position.y > 530) this.position.y = 530
// };