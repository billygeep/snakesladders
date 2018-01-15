
var Map = function (game_state, _scene) {

  Phaser.Group.call(this, game_state);
  game.add.existing(this);
  this.fixedToCamera = true

  var scene = _scene

  var coords = [ 
    { x: 245, y: 325 }, //0
    { x: 190, y: 345 }, //1
    { x: 295, y: 320 }, //2
    { x: 310, y: 240 }, //3
    { x: 250, y: 175 }, //4
    { x: 300, y: 406 }, //5

    { x: 690, y: 292 }, //6
    { x: 690, y: 292 }, //7
    { x: 820, y: 292 }, //8
    { x: 560, y: 292 }, //9

    { x: 690, y: 255 }, //10
    { x: 755, y: 255 }, //11
    { x: 850, y: 292 }, //12
    { x: 755, y: 335 }, //13
    { x: 615, y: 335 }, //14
    { x: 515, y: 292 }, //15
    { x: 615, y: 255 }, //16

    { x: 325, y: 180 }, //17
    { x: 830, y: 356 }, //18
    { x: 650, y: 356 }, //19
    { x: 650, y: 410 }, //20
    { x: 390, y: 355 }, //21
    { x: 300, y: 355 }, //22
    { x: 515, y: 260 }, //23

    { x: 245, y: 325 }, //24
    { x: 690, y: 292 }, //25
    { x: 820, y: 292 }, //26
    { x: 560, y: 292 }, //27
    { x: 850, y: 292 }, //28
    { x: 755, y: 335 }, //29
    { x: 650, y: 404 }, //30
    { x: 490, y: 410 }, //31
    { x: 515, y: 292 } //32
  ]

  
  var path = gamecopy.mappage

  var bg = game.add.graphics(0, 0);
  bg.beginFill(0x4a5376);
  bg.alpha = 0.9
  bg.drawRect(0, 0, 960, 560);
  bg.inputEnabled = true;
  this.add(bg)

  var title = new CustomText(game, 480, 90, path.title, style.titlestyle);
  this.add(title)

  var firstfloor = new CustomText(game, 252, 130, path.first_floor, style.map_title);
  this.add(firstfloor)

  var secondfloor = new CustomText(game, 700, 130, path.second_floor, style.map_title);
  this.add(secondfloor)


  /* ROOMS */

  var room_kitchen = new CustomText(game, 345, 220, path.room_kitchen, style.map_room);
  room_kitchen.lineSpacing = -10
  this.add(room_kitchen)

  var room_basement = new CustomText(game, 250, 250, path.room_basement, style.map_room);
  room_basement.lineSpacing = -10
  this.add(room_basement)

  var room_living = new CustomText(game, 140, 330, path.room_living, style.map_room);
  room_living.lineSpacing = -10
  this.add(room_living)

  var room_dining = new CustomText(game, 350, 330, path.room_dining, style.map_room);
  room_dining.lineSpacing = -10
  this.add(room_dining)

  var room_porch = new CustomText(game, 250, 412, path.room_porch, style.map_room);
  room_porch.lineSpacing = -10
  this.add(room_porch)

  var room_bathroom = new CustomText(game, 495, 295, path.room_bathroom, style.map_room);
  room_bathroom.lineSpacing = -10
  this.add(room_bathroom)

  var room_luna = new CustomText(game, 595, 215, path.room_luna, style.map_room);
  room_luna.lineSpacing = -10
  this.add(room_luna)

  var room_leni = new CustomText(game, 610, 390, path.room_leni, style.map_room);
  room_leni.lineSpacing = -10
  this.add(room_leni)

  var room_lucy = new CustomText(game, 695, 215, path.room_lucy, style.map_room);
  room_lucy.lineSpacing = -10
  this.add(room_lucy)

  var room_lana = new CustomText(game, 795, 215, path.room_lana, style.map_room);
  room_lana.lineSpacing = -10
  this.add(room_lana)

  var room_lisa = new CustomText(game, 795, 390, path.room_lisa, style.map_room);
  room_lisa.lineSpacing = -10
  this.add(room_lisa)

  var room_lincoln = new CustomText(game, 878, 295, path.room_lincoln, style.map_room);
  room_lincoln.lineSpacing = -10
  this.add(room_lincoln)


  /* END ROOMS */

  var map = game.add.sprite(0, 0, 'furniture_sprites', 'map_layout.png');
  map.anchor.setTo(0)
  this.add(map)

  var frame = new FrameArea(game, this);
  this.add(frame);

  this.dot = game_state.add.sprite(0, 0, 'furniture_sprites', 'map_dot_lincoln.png')
  this.dot.anchor.setTo(0.5)
  this.dot.position = coords[scene]
  this.dot.alpha = 1
  this.add(this.dot);

  //close button
  var closebtn = new ConfirmButton(game, 837, 485, style.closestyle, path.close_button.text, 'confirm_up.png', 'confirm_over.png', 'back', path.close_button.fontName, path.close_button.fontScale, path.close_button.offsetX, path.close_button.offsetY);
  this.add(closebtn)
  closebtn.events.onInputDown.add(this.closeScreen, this);
};

Map.prototype = Object.create(Phaser.Group.prototype);
Map.prototype.constructor = Map;

Map.prototype.closeScreen = function () {
  this.removeAll();
  //sow the hud
  gameview.showHud();
}
