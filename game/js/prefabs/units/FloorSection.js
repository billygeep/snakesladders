
//create the graphical hero
var FloorSection = function (game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Group.call(this, game, _x, _y);

  this.position = { x: _x, y: _y }
  this.y = _y;

  this.arr = this.newTiles();
 
 // this.arr = [1,1,1,1];
  
  this.wallSprite_01 = game.make.sprite(0, 0, 'spritesheets', 'walls/wall_01.jpg');
 //  var arr = [1,2,3,2,1,1,1,1,2,3]

 //  for (var i = 0; i < arr.length; i++) {

 //  	var ran = Math.ceil(Math.random()*3);

	// var wallSprite_01 = game.add.sprite(i*360, 0, 'spritesheets', 'walls/wall_0'+ arr[i] + '.jpg');
	// this.add(wallSprite_01)
 //  }
}

FloorSection.prototype = Object.create(Phaser.Group.prototype);
FloorSection.prototype.constructor = FloorSection;

FloorSection.prototype.updateFloors = function(_shift, _ypos) {

	// this.y += 2;

	//if (this.y >= 360) this.y = 0
		
	if (_shift) {
		this.arr.shift();
        this.arr.push(this.getTile());
    }

	for (var i = 0; i < this.arr.length; i++) {
		var tile = this.arr[i] // this.getTile(wall_array[i][j])
    	gameview.drawTile(tile, i, this.y+_ypos);
	}

	if (_ypos >= 118) {
		this.y += 120;
		
	} else if (_ypos <= -118) {
		this.y -= 120;
		
	}

	if (this.y > 480) this.y = -120;
	if (this.y < -120) this.y = 480;
	
}

// FloorSection.prototype.drawTile = function(tile, x) {
// 	gameview.gameScene.renderXY(this.wallSprite_01, (x*wall_width)+wall_x, 0, false);
// }
	
FloorSection.prototype.newTiles = function(_level) {

	this.arr = [];

	for (var i = 0; i < 4; i++) {
  		this.arr.push(this.getTile());
  	}

  	return this.arr;
}

FloorSection.prototype.getTile = function(_level) {

	var tile = Math.ceil(Math.random()*3)

	return tile;
// 	var i = 0, me = this;
// console.log('FLOOR 2')
// 	this.forEach(function(item) {
		
		// var ran = Math.ceil(Math.random()*3);

		// if (i < 3) {
		// 	ran = me.arr[i];
		// }

		// item.loadTexture('spritesheets', 'walls/wall_0'+ ran + '.jpg');

		// i++;
		// var ran = Math.ceil(Math.random()*3);
		// item.loadTexture('spritesheets', 'walls/wall_0'+ 1 + '.jpg')
		// console.log('GO')
		// i++;
		
	//})	
}