
var TouchPad = function (game_state, scene) {

  Phaser.Group.call(this, game_state);

  this.position.x = 100;
  this.position.y = 460;

  this.touchpadgraphic = game_state.add.sprite(0, 0, 'furniture_sprites', 'touchpad.png');
  this.touchpadgraphic.anchor.setTo(0.5);
  this.add(this.touchpadgraphic);

  var coords = [
    { x: 0, y: -46, r: 45 },
    { x: -41, y: -5, r: -45 },
    { x: 41, y: -5, r: 135 },
    { x: 0, y: 39, r: 225 }
  ];
  
  for (var i = 0; i < coords.length; i++) {
    var button = game_state.add.sprite(0, 0, 'furniture_sprites', 'dpad_down.png')
    button.width = 60;
    button.height = 60;
    button.angle = coords[i].r;
    button.anchor.setTo(0.5);
    button.alpha = 0;
    button.position = { x: coords[i].x, y: coords[i].y }
    // var button = game.add.graphics(0, 0);
    // button.beginFill(0xFF0000, 0.8);
    // button.angle = 45;
    // button.drawRect(coords[i].x, coords[i].y, 75, 75);
    // button.anchor.setTo(0.5);
    // console.log(button)
    this.add(button);

    button.id = i;

    button.events.onInputDown.add(this.onDown, this);
    button.events.onInputUp.add(this.onUp, this);
    button.inputEnabled = true;
    button.input.useHandCursor = true;
  }
};

TouchPad.prototype = Object.create(Phaser.Group.prototype);
TouchPad.prototype.constructor = TouchPad;

TouchPad.prototype.onDown = function (_button) {
  _button.alpha = 1;
  gameview.touchpaddown[_button.id] = 1;
};

TouchPad.prototype.onUp = function (_button) {
  _button.alpha = 0;
  gameview.touchpaddown[_button.id] = 0;
};

TouchPad.prototype.deleteTouchPad = function (_val) {
  this.removeAll();
};
