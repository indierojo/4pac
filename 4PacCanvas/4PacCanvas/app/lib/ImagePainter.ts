class ImagePainter implements IPainter {
    image: HTMLImageElement;
    imageUrl: string;

    constructor(imageUrl: string) {
        this.image = new Image();
        this.imageUrl = imageUrl;
    }

    paint(sprite: Sprite, context: CanvasRenderingContext2D) {
        if (this.image.complete) {
            context.drawImage(this.image, sprite.left, sprite.top, sprite.dimension.width, sprite.dimension.height);
        }
    }
}