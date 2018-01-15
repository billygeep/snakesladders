
var GameTimer = function (_game, _x, _y, _time) {

    Phaser.Group.call(this, _game);
    this.timer = game.time.create(false);
    this.createTimer();

    // Phaser.Sprite.call(this, game, _x, _y, 'furniture_sprites', 'clock.png');
    this.time = _time;
    this.position = { x: _x, y: _y };
    this.pause = true;

    // this.text = this.game.add.text(0, 0, '1:00', style.title);
};


GameTimer.prototype = Object.create(Phaser.Group.prototype);
GameTimer.prototype.constructor = GameTimer;


GameTimer.prototype.createTimer = function () {

    this.clock = game.add.sprite(this.position.x, this.position.y, 'furniture_sprites', 'clock.png');
    this.add(this.clock);

    this.timetext = game.add.text(this.position.x, this.position.y, '01:00', style.titlestyle);
   // this.time.setTextBounds(55, 148, 50, 50);
    this.add(this.timetext);
}

GameTimer.prototype.updateClock = function () {
    this.time -= 1;
    this.timetext.setText(this.time);

    if (this.time > 0) {
        this.startTimer();
    } else {
        //gameview.outOfTime()
    }
}
GameTimer.prototype.startTimer = function () {
    this.timer.add(1000, function () {
      this.updateClock();
    }, this);
    this.timer.start();
}

GameTimer.prototype.stopTimer = function () {
    
}


// var GameTimer = function (_game, _timeleft) {

//     Phaser.Group.call(this, _game);

//     globalvars.gamedata.timerdetails.timeleft = Math.ceil(_timeleft/1000)
//     this.fixedToCamera = true
//     this.timer = game.time.create(false);
//     this.createTimer();

//     gameaudio.changeAudio('clock');
// };

// GameTimer.prototype = Object.create(Phaser.Group.prototype);
// GameTimer.prototype.constructor = GameTimer;

// GameTimer.prototype.createTimer = function () {

//     this.clock = game.add.sprite(0, 100, 'furniture_sprites', 'clock.png');
//     this.add(this.clock);

//     this.time = game.add.text(0, 0, globalvars.gamedata.timerdetails.timeleft, style.clockstyle);
//     this.time.setTextBounds(55, 148, 50, 50);
//     this.add(this.time);
// }

// GameTimer.prototype.updateClock = function () {

//     globalvars.gamedata.timerdetails.timeleft -= 1;
//     this.time.setText(globalvars.gamedata.timerdetails.timeleft);
// }

// GameTimer.prototype.startTimer = function () {
//     this.timer.add(1000, function () {
//       this.updateClock();
//     }, this);
//     this.timer.start();
// }

// GameTimer.prototype.timesUp = function () {
//     gameaudio.changeAudio('gametheme');
//     gameaudio.playSFX('clockalarm');
//     this.removeAll();
// }
