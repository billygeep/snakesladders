var Boot = function () {};

Boot.prototype = {

  loadScripts: function () {
    //this.game.load.physics("object_maps", base_path+'assets/images/objectmaps.json');
    //this.game.load.atlasJSONHash('photos_sprites', base_path+'assets/images/photos_sprites.png', base_path+'assets/images/photos_sprites.json');
    //this.game.load.audio('introtheme', [base_path+'assets/audio/introtheme.mp3',base_path+'assets/audio/introtheme.ogg']);
    this.game.load.audioSprite('sfx', [base_path+'assets/audio/audiosprite.mp3', base_path+'assets/audio/audiosprite.ogg'], null, audioJSON);
    this.game.load.atlasJSONHash('furniture_sprites', base_path+'assets/images/furniture_sprites.png', base_path+'assets/images/furniture_sprites.json');
    this.game.load.atlasJSONHash('spritesheets', base_path+'assets/images/spritesheets.png', base_path+'assets/images/spritesheets.json');
  },

  loadImages: function () {
    
  },

  init: function () {
    game.add.sprite(0, 0, 'screen_loading');
  },

  addGameStates: function () {
    game.state.add("Menu",Menu);
    game.state.add("Game",Game);
    game.state.add("DeathScreen",DeathScreen);
  },

  create: function() {
    //  You can listen for each of these events from Phaser.Loader
   // this.load.onLoadStart.add(this.loadStart, this);

    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);
  
    this.status = new GameText(game, game.world.centerX, 380, gameJSON.load_screen.load_text, style.titlestyle);
    this.game.add.existing(this.status);
   // this.status.font = 'Marker-Felt';

    this.bgtext = game.add.text(426, 342, '', style.titlestyle);
    this.bgtext.stroke = '#000000';
    this.bgtext.strokeThickness = 8;

    this.text = game.add.text(430, 335, '', style.titlestyle);
    this.text.stroke = '#333333';
    this.text.strokeThickness = 8;

    if (!gameoptions.audioloaded) {
        this.startLoadProcess();
    } else {
        game.load.start();  
    }
  },

  //load all the scripts
  startLoadProcess: function () {
    this.loadScripts();
    this.loadImages();
    game.load.start();
  },
  //  This callback is sent the following parameters:
  fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.text.setText(progress + "%");
    this.bgtext.setText(progress + "%");
  },
  //when loaded start game menu state
  loadComplete: function() {
    this.addGameStates();
    if (!gameoptions.audioloaded) gameaudio = new AudioManager(this);

    game.state.start("Game");
  }

};
