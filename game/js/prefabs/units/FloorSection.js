
var FloorSection = function (game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Group.call(this, game, _x, _y);

  this.position = { x: _x, y: _y }
  this.y = _y;

  this.arr = this.newTiles();
}

FloorSection.prototype = Object.create(Phaser.Group.prototype);
FloorSection.prototype.constructor = FloorSection;

FloorSection.prototype.updateFloors = function(_shift, _ypos) {
		
	if (_shift) {
		this.arr.shift();
        this.arr.push(this.getTile());
    }

	for (var i = 0; i < this.arr.length; i++) {
		var tile = this.arr[i];
    	gameview.drawTile(tile, i, this.y+_ypos);
	}

	if (_ypos >= 118) {
		this.y += 120;
		
	} else if (_ypos <= -118) {
		this.y -= 120;
		
	}

	if (this.y > 600) this.y = -120;
	if (this.y < -120) this.y = 600;
	
}

// FloorSection.prototype.drawTile = function(tile, x) {
// 	gameview.gameScene.renderXY(this.wallSprite_01, (x*wall_width)+wall_x, 0, false);
// }
	
FloorSection.prototype.newTiles = function(_level) {

	this.arr = [];

	var l = Math.ceil(game.width/gameview.wall_width) + 1

	for (var i = 0; i < l; i++) {
  		this.arr.push(this.getTile());
  	}

  	return this.arr;
}

FloorSection.prototype.getTile = function(_level) {

	var tile = Math.ceil(Math.random()*3)

	return tile;	
}