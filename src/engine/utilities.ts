function drawGrid(drawingContext: CanvasRenderingContext2D, color: string, stepx: number, stepy: number) {
    drawingContext.strokeStyle = color;
    drawingContext.lineWidth = 0.5;

    for (let i = stepx + 0.5; i < drawingContext.canvas.width; i += stepx) {
        drawingContext.beginPath();
        drawingContext.moveTo(i, 0);
        drawingContext.lineTo(i, drawingContext.canvas.height);
        drawingContext.stroke();
    }
    for (let j = stepy + 0.5; j < drawingContext.canvas.width; j += stepy) {
        drawingContext.beginPath();
        drawingContext.moveTo(0, j);
        drawingContext.lineTo(drawingContext.canvas.width, j);
        drawingContext.stroke();
    }
}

function drawBackground(drawingContext: CanvasRenderingContext2D) {
    const verticalLineSpacing = 12;
    let i = drawingContext.canvas.height;

    drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
    drawingContext.strokeStyle = "lightgray";
    drawingContext.lineWidth = 0.5;

    while (i > verticalLineSpacing * 4) {
        drawingContext.beginPath();
        drawingContext.moveTo(0, i);
        drawingContext.lineTo(drawingContext.canvas.width, i);
        drawingContext.stroke();
        i -= verticalLineSpacing;
    }
}

function drawGuidelines(drawingContext: CanvasRenderingContext2D, x: number, y: number) {
    drawingContext.strokeStyle = "rgba(0,0,230,0.8)";
    drawingContext.lineWidth = 0.5;
    drawVerticalLine(drawingContext, x);
    drawHorizontalLine(drawingContext, y);
}

function drawHorizontalLine(drawingContext: CanvasRenderingContext2D, y: number) {
    drawingContext.beginPath();
    drawingContext.moveTo(0, y + 0.5);
    drawingContext.lineTo(drawingContext.canvas.width, y + 0.5);
    drawingContext.stroke();
}

function drawVerticalLine(drawingContext: CanvasRenderingContext2D, x: number) {
    drawingContext.beginPath();
    drawingContext.moveTo(x + 0.5, 0);
    drawingContext.lineTo(x + 0.5, drawingContext.canvas.height);
    drawingContext.stroke();
}