function AudioManager () {

  this.music = {
    gametheme: game.add.audio('gametheme'),
  }

  this.fx = game.add.audioSprite('sfx');

  this.music.gametheme.loop = true;
  this.music.gametheme.volume = gameoptions.volume;

  gameoptions.audioloaded = true;

  this.currentsfx =''
  

}

AudioManager.prototype.changeAudio = function (_audio) {

  var audio = _audio;

  for (var property in this.music) {
    if (property === audio) {
      if (!gameoptions.muted && this.currentaudio !== this.music[property]) {
        this.music[property].play();
      }
      this.currentaudio = this.music[property];
    } else {
      this.music[property].pause();
    }
  }
}

AudioManager.prototype.playCurrent = function () {
    this.currentaudio.resume();
}
AudioManager.prototype.pauseCurrent = function () {
    this.currentaudio.pause();
}

//handle sfx playing
AudioManager.prototype.playSFX = function (_audio) {

  this.currentsfx = _audio;

  if (!gameoptions.muted) {
    if (_audio !== '') this.fx.play(this.currentsfx + '_sfx'); //this.sfx[this.currentsfx].play();
  }
}
AudioManager.prototype.pauseSFX = function () {

}
