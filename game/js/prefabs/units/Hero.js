
//create the graphical hero
var Hero = function (_game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, _game, _x, _y, "furniture_sprites", "run/run_01.png");

  this.animations.add('run', ["run/run_01.png","run/run_02.png","run/run_03.png","run/run_04.png","run/run_05.png","run/run_06.png","run/run_07.png","run/run_08.png"], 10, true, false);

  this.anchor.setTo(0.5, 1);
  
  this.getAnimationName = function () {

    var name = 'run'; // default animation

    return name;
  }
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
  //var animationName = this.herographic.getAnimationName();
  //if (this.herographic.animations.name !== animationName) this.herographic.animations.play(animationName);
  this.animations.play('run')
}

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