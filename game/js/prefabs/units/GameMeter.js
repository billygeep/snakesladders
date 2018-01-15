
var GameMeter = function (_game, _x, _y) {

    Phaser.Group.call(this, _game);
    this.timer = game.time.create(false);
    this.createMeter();

    // Phaser.Sprite.call(this, game, _x, _y, 'furniture_sprites', 'clock.png');
 
    this.position = { x: _x, y: _y };

    // this.text = this.game.add.text(0, 0, '1:00', style.title);
};


GameMeter.prototype = Object.create(Phaser.Group.prototype);
GameMeter.prototype.constructor = GameMeter;


GameMeter.prototype.createMeter = function () {
    this.meter = game.add.sprite(this.position.x, this.position.y, 'speed_meter');
    this.needle = game.add.sprite(this.position.x, this.position.y, 'speed_needle');
    this.add(this.meter);
    this.add(this.needle);    
}


GameMeter.prototype.startTimer = function () {

}

GameMeter.prototype.stopTimer = function () {
    
}