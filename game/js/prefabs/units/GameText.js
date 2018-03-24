
var GameText = function (game, _x, _y, _text, _style, _anchorx, _anchory) {

    Phaser.Text.call(this, game, _x, _y, _text, _style);

    //this.fontSize =  this.fontSize * _params.fontScale;
    //this.font = _params.fontName;
    this.anchor.set(_anchorx, _anchory);
    // this.lineSpacing = _params.lineSpacing;

    this.x = _x;
    this.y = _y;

    this.position.x = this.x // + _params.offsetX;
    this.position.y = this.y // + _params.offsetY;
};


GameText.prototype = Object.create(Phaser.Text.prototype);
GameText.prototype.constructor = GameText;

GameText.prototype.newText = function(_text) {
	this.setText(_text)
}