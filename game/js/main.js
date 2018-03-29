/* LOAD CSS FILE */

function loadjscssfile(filename, filetype){
  if (filetype=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  } else if (filetype=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

/* GAME SET UP */

var
  game = new Phaser.Game(375, 560, Phaser.CANVAS, 'game'),
  Main = function () {},
  gameoptions = {
    audioloaded: false,
    volume: 1
  },
  audioJSON,
  gameJSON,
  base_path = jsembed.baseUrl();

loadjscssfile(base_path+"css/style.css", "css") ////dynamically load and add this .css file

Main.prototype = {

  preload: function () {

    this.fontsReady = false;

    game.time.advancedTiming = true;

    game.load.json('audiojson', base_path+'data/audiosprite.json');
    game.load.json('json', base_path+'data/data.json');
  
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
   // game.load.image('screen_loading', base_path+'assets/images/scenes/screen_loading.jpg');
  },

  loadFonts: function () {

    var fontcount = gameJSON.fonts.length, currentcount = 0;

    for (var i = 0; i < gameJSON.fonts.length; i++) {

      var font = new FontFaceObserver(gameJSON.fonts[i].fontName, {
        weight: 400
      });

      font.load().then(function () {
        console.log('Font is available');
        currentcount++;
        if (currentcount === fontcount) game.state.start('Boot');
      }, function () {
        console.log('Font is not available');
      });

    }
  },

  create: function () {

    gameJSON = game.cache.getJSON('json');
    audioJSON = game.cache.getJSON('audiojson');
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.state.add('Boot', Boot);
    this.loadFonts();
    console.log('GO')
  },

  update: function() {
    if (this.fontsReady) {
      game.state.start('Boot');
    }
  }

};

game.state.add('Main', Main);
game.state.start('Main');


//check for first interaction to set desktop/touchscreen
window.addEventListener('touchstart', function onFirstTouch() {
  window.USER_IS_TOUCHING = true;
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

