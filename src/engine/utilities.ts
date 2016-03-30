function drawGrid(context, color: string, stepx: number, stepy: number) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    for (var j = stepy + 0.5; i < context.canvas.width; j += stepy) {
        context.beginPath();
        context.moveTo(0, j);
        context.lineTo(context.canvas.width, j);
        context.stroke();
    }
}

function drawBackground(context: CanvasRenderingContext2D) {
    var verticalLineSpacing = 12;
    var i = context.canvas.height;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;

    while (i > verticalLineSpacing * 4) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
        i -= verticalLineSpacing;
    }
}

function drawGuidelines(context: CanvasRenderingContext2D, x: number, y: number) {
    context.strokeStyle = 'rgba(0,0,230,0.8)';
    context.lineWidth = 0.5;
    drawVerticalLine(context, x);
    drawHorizontalLine(context, y);
}

function drawHorizontalLine(context: CanvasRenderingContext2D, y: number) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}

function drawVerticalLine(context: CanvasRenderingContext2D, x: number) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
}