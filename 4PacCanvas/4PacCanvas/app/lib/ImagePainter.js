/// <reference path="../interfaces/IPainter.ts"/>
/// <reference path="../lib/Sprite.ts"/>
var ImagePainter = (function () {
    function ImagePainter(imageUrl) {
        this.image = new Image();
        this.imageUrl = imageUrl;
    }
    ImagePainter.prototype.paint = function (sprite, context) {
        if (this.image.complete) {
            context.drawImage(this.image, sprite.left, sprite.top, sprite.dimension.width, sprite.dimension.height);
        }
    };
    return ImagePainter;
})();
//# sourceMappingURL=ImagePainter.js.map