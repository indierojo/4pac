var Sprite = (function () {
    function Sprite(name, dimensions, painter, behaviors) {
        this.isVisible = true;
        this.isAnimating = false;
        this.name = name;
        this.dimensions = dimensions;

        this.painter = painter;
        this.behaviors = behaviors;
    }
    return Sprite;
})();
//# sourceMappingURL=Sprite.js.map
