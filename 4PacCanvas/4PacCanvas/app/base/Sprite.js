var Sprite = (function () {
    function Sprite(name, painter, behaviors) {
        this.name = name;
        this.painter = painter;
        this.behaviors = behaviors || [];
        this.isAnimating = false;
    }
    Sprite.prototype.paint = function (context) {
        if (this.painter !== undefined && this.isVisible) {
            this.painter.paint(this, context);
        }
    };

    Sprite.prototype.update = function (context, time) {
        var _this = this;
        this.behaviors.forEach(function (b) {
            return b.execute(_this, context, time);
        });
    };
    return Sprite;
})();
//# sourceMappingURL=Sprite.js.map
