
//create the graphical hero
var FloorObjects = function (game, _x, _y) {
  // call Phaser.Sprite constructor
  Phaser.Group.call(this, game, _x, _y);

  this.arr = [];


 // this.arr = [1,1,1,1];
  
  //this.wallSprite_01 = game.make.sprite(0, 0, 'spritesheets', 'walls/wall_01.jpg');
 //  var arr = [1,2,3,2,1,1,1,1,2,3]

 //  for (var i = 0; i < arr.length; i++) {

 //  	var ran = Math.ceil(Math.random()*3);

	// var wallSprite_01 = game.add.sprite(i*360, 0, 'spritesheets', 'walls/wall_0'+ arr[i] + '.jpg');
	// this.add(wallSprite_01)
 //  }
}

FloorObjects.prototype = Object.create(Phaser.Group.prototype);
FloorObjects.prototype.constructor = FloorObjects;

FloorObjects.prototype.createObject = function(_floor, _x, _y) {
	
	var obj = game.add.sprite(300, 360, 'furniture_sprites', 'gates/hole.png');
	this.add(obj)
}


FloorObjects.prototype.updateFloors = function(_shift, _ypos) {

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
