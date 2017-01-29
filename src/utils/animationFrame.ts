/// <reference path="../engine/requestNextAnimationFrame.ts"/>
/// <reference path="../engine/Utilities.ts"/>

const animationFrameCanvas = <HTMLCanvasElement> document.getElementById("canvas");
const animationFrameDrawingContext = animationFrameCanvas.getContext("2d");

let animationFramePaused = true;
const discs = [
    {
        x: 150,
        y: 250,
        lastX: 150,
        lastY: 250,
        velocityX: -3.2,
        velocityY: 3.5,
        radius: 25,
        innerColor: "rgba(255, 255, 0, 1)",
        middleColor: "rgba(255, 255, 0, 0.7)",
        outerColor: "rgba(255, 255, 0, 0.5)",
        strokeStyle: "gray"
    },
    {
        x: 50,
        y: 150,
        lastX: 50,
        lastY: 150,
        velocityX: 2.2,
        velocityY: 2.5,
        radius: 25,
        innerColor: "rgba(100, 145, 230, 1)",
        middleColor: "rgba(100, 145, 230, 0.7)",
        outerColor: "rgba(100, 145, 230, 0.5)",
        strokeStyle: "blue"
    },
    {
        x: 150,
        y: 75,
        lastX: 150,
        lastY: 75,
        velocityX: 1.2,
        velocityY: 1.5,
        radius: 25,
        innerColor: "rgba(255, 0, 0, 1)",
        middleColor: "rgba(255, 0, 0, 0.7)",
        outerColor: "rgba(255, 0, 0, 0.5)",
        strokeStyle: "orange"
    }
];
const numDiscs = discs.length;
const animateButton = <HTMLInputElement> document.getElementById("animateButton");

let lastFpsUpdateTime = 0;
let lastFpsUpdate = 0;
let lastTime = 0;

function calculateFps() {
    const now = (+new Date);
    const fps = 1000 / (now - lastTime);

    lastTime = now;

    if (now - lastFpsUpdateTime > 250) {
        lastFpsUpdateTime = now;
        lastFpsUpdate = fps;
    }
    return lastFpsUpdate;
}

function update(time) {
    for (let i = 0; i < numDiscs; ++i) {
        const disc = discs[i];

        if (disc.x + disc.velocityX + disc.radius > animationFrameDrawingContext.canvas.width || disc.x + disc.velocityX - disc.radius < 0) {
            disc.velocityX = -disc.velocityX;
        }
        if (disc.y + disc.velocityY + disc.radius > animationFrameDrawingContext.canvas.height || disc.y + disc.velocityY - disc.radius < 0) {
            disc.velocityY = -disc.velocityY;
        }

        disc.x += disc.velocityX;
        disc.y += disc.velocityY;
    }
}

function draw() {
    for (let i = 0; i < numDiscs; ++i) {

        const disc = discs[i];

        const gradient = animationFrameDrawingContext.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius);
        gradient.addColorStop(0.3, disc.innerColor);
        gradient.addColorStop(0.5, disc.middleColor);
        gradient.addColorStop(1.0, disc.outerColor);

        animationFrameDrawingContext.save();
        animationFrameDrawingContext.beginPath();
        animationFrameDrawingContext.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2, false);
        animationFrameDrawingContext.fillStyle = gradient;
        animationFrameDrawingContext.fill();
        animationFrameDrawingContext.stroke();
        animationFrameDrawingContext.restore();
    }
}

function animate(time) {

    if (!animationFramePaused) {
        animationFrameDrawingContext.clearRect(0, 0, animationFrameCanvas.width, animationFrameCanvas.height);
        drawBackground(animationFrameDrawingContext);
        update(time);
        draw();

        const fps = calculateFps();

        animationFrameDrawingContext.fillStyle = "cornflowerblue";
        animationFrameDrawingContext.fillText(fps.toFixed() + " fps", 20, 60);

        window.requestNextAnimationFrame(animate);
    }
}

animateButton.onclick = () => {
    animationFramePaused = !animationFramePaused;
    if (animationFramePaused) {
        animateButton.value = "Animate";
    } else {
        window.requestNextAnimationFrame(animate);
        animateButton.value = "Pause";
    }
};

animationFrameDrawingContext.font = "48px Helvetica";