
var ConfirmButton = function (_game, _x, _y, _image1, _image2, _audio, _textparams, _style) {

    this.imageup = _image1;
    this.imageover = _image2

    Phaser.Sprite.call(this, _game, _x, _y, 'furniture_sprites', this.imageup);

    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.anchor.setTo(0.5)

    //add audio for button click
    this.audio = 'button';
    if (_audio !== undefined) this.audio = _audio;

    //add text to the button
    if (_textparams) {
        console.log(_textparams)
        this.text = new GameText(_game, 0, 0, _textparams, style.titlestyle);
        this.addChild(this.text);
    }

    this.events.onInputOver.add(this.onOver, this)
    this.events.onInputOut.add(this.onOut, this)
    this.events.onInputDown.add(this.onDown, this)
};


ConfirmButton.prototype = Object.create(Phaser.Sprite.prototype);
ConfirmButton.prototype.constructor = ConfirmButton;

ConfirmButton.prototype.onDown = function () {
    gameaudio.playSFX(this.audio);
}
ConfirmButton.prototype.onUp = function () {
    this.loadTexture('furniture_sprites', this.imageup, 0);
}
ConfirmButton.prototype.onOver = function () {
    this.loadTexture('furniture_sprites', this.imageover, 0);
}
ConfirmButton.prototype.onOut = function () {
    this.loadTexture('furniture_sprites', this.imageup, 0);
}

