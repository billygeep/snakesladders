
var GameText = function (game, _x, _y, _params, _style) {

    Phaser.Text.call(this, game, _x + _params.offsetX, _y + _params.offsetY, _params.text, _style);

    this.fontSize =  this.fontSize * _params.fontScale;
    this.font = _params.fontName;
    this.anchor.set(0.5);

    console.log(this.font)

    // this.inputEnabled = true;
    // this.input.useHandCursor = true;
    // this.anchor.setTo(0.5)

    // this.audio = 'button';
    // if (_audio !== undefined) this.audio = _audio;

    // var style = _style, f = _font, s = _scale, x = _offsetx, y = _offsety

    // if (f === undefined || f === '') f = style.font


    // if (_text !== '') {
    //     // Set up our text and run our custom wrapping routine on it
    //     this.bitmapText = game.add.text(0 + x, 3 + y, _text, style);
    //     this.bitmapText.fontSize =  this.bitmapText.fontSize * s;
    //     this.bitmapText.font = f;
    //     // this.bitmapText.setTextBounds(0, 0, 147, 42);
    //     this.bitmapText.lineSpacing = -8;
    //     this.bitmapText.anchor.setTo(0.5)
    //     this.addChild(this.bitmapText);
    // }

    // this.events.onInputOver.add(this.onOver, this)
    // this.events.onInputOut.add(this.onOut, this)
    // this.events.onInputDown.add(this.onDown, this)
};


GameText.prototype = Object.create(Phaser.Text.prototype);
GameText.prototype.constructor = GameText;
