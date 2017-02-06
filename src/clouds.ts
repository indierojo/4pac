import { Spaceship } from "./models/spaceship";
import { Ufo } from "./models/ufo";
import { Circle } from "./models/circle";

export default class Clouds /* implements IGameBootstrapper, IKeyboardControlled */ {
    private isGameOver: boolean;

    private player: Spaceship;
    private bullets: Array<Circle>;
    private ufos: Array<Ufo>;
    private drawingContext: CanvasRenderingContext2D;

    private upPressed: boolean;
    private downPressed: boolean;
    private leftPressed: boolean;
    private rightPressed: boolean;
    private spacePressed: boolean;

    private upLabel: HTMLElement;
    private downLabel: HTMLElement;
    private leftLabel: HTMLElement;
    private rightLabel: HTMLElement;
    private spaceLabel: HTMLElement;

    constructor() {
        const canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = canvas.getContext("2d");

        this.initGameModels();
        this.initUI();
        this.registerKeyHandlers();
        this.isGameOver = false;

        window.requestNextAnimationFrame(this.animate);
    }

    private initUI = () => {
        this.upLabel = document.getElementById("upLabel");
        this.downLabel = document.getElementById("downLabel");
        this.leftLabel = document.getElementById("leftLabel");
        this.rightLabel = document.getElementById("rightLabel");
        this.spaceLabel = document.getElementById("spaceLabel");

        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.spacePressed = false;
    }

    private initGameModels = () => {
        this.bullets = [];
        this.player = new Spaceship({ x: 250, y: 450 }, 50, "#FFFF77");
        this.player.draw(this.drawingContext);

        this.ufos = [
            new Ufo({x: 400, y: 150}, 25, "#773355"),
            new Ufo({x: 200, y: 75}, 25, "#335577"),
            new Ufo({x: 125, y: 215}, 25, "#557733")
        ];
        this.ufos.forEach(u => u.draw(this.drawingContext));

        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";
    }

    private registerKeyHandlers = () => {
        const upArrowKeycode = 38;
        const downArrowKeycode = 40;
        const leftArrowKeycode = 37;
        const rightArrowKeycode = 39;
        const spacebarKeycode = 32;

        window.onkeydown = e => {
            const keyCode = e.keyCode;

            if (keyCode === upArrowKeycode) {
                this.upPressed = true;
                this.downPressed = false;
            }
            if (keyCode === downArrowKeycode) {
                this.upPressed = false;
                this.downPressed = true;
            }
            if (keyCode === leftArrowKeycode) {
                this.leftPressed = true;
                this.rightPressed = false;
            }
            if (keyCode === rightArrowKeycode) {
                this.leftPressed = false;
                this.rightPressed = true;
            }
            if (keyCode === spacebarKeycode) {
                this.spacePressed = true;
            }
        };

        window.onkeyup = e => {
            const keyCode = e.keyCode;
            if (keyCode === upArrowKeycode) {
                this.upPressed = false;
            }
            if (keyCode === downArrowKeycode) {
                this.downPressed = false;
            }
            if (keyCode === leftArrowKeycode) {
                this.leftPressed = false;
            }
            if (keyCode === rightArrowKeycode) {
                this.rightPressed = false;
            }
            if (keyCode === spacebarKeycode) {
                this.spacePressed = false;
            }
        };
    }

    private animate = (time) => {
        if (this.isGameOver) {
            console.log(`GAME OVER!`);
            return;
        }
        // drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);

        this.updateLabels();
        this.updatePlayerLocation();
        this.updateUfoLocations();
        this.handleBullets();
        this.checkForBulletCollisions();
        this.checkForPlayerCollisions();

        this.player.draw(this.drawingContext);
        window.requestNextAnimationFrame(this.animate);
    }

    private addNewBullet = () => {
        const bulletXLeft = this.player.center.x - 30;
        const bulletXRight = this.player.center.x + 30;
        const bulletY = this.player.top - 6;

        const isInSamePosition = b => { return b.center.y >= bulletY - 60 && (b.center.x >= bulletXLeft && b.center.x <= bulletXRight); };
        if (this.bullets.some(isInSamePosition)) {
            // Don't add a new bullet if one already exists at same x and similar y
            return;
        }

        const bullet = new Circle({ x: this.player.center.x, y: bulletY }, 4, "#FFFF77");
        bullet.draw(this.drawingContext);
        this.bullets.push(bullet);
    }

    private updatePlayerLocation = () => {
        let stepX = 0;
        let stepY = 0;
        if (this.leftPressed) {
            stepX = -10;
        }
        if (this.upPressed) {
            stepY = -10;
        }
        if (this.downPressed) {
            stepY = 10;
        }
        if (this.rightPressed) {
            stepX = 10;
        }

        if (stepX === 0 && stepY === 0) {
            return;
        }

        this.player.erase(this.drawingContext);

        let newX = this.player.center.x + stepX;
        let newY = this.player.center.y + stepY;
        if (newX > this.drawingContext.canvas.width) {
            newX = this.player.size;
        } else if (newX < 0) {
            newX = this.drawingContext.canvas.width - this.player.size;
        }
        if (newY > this.drawingContext.canvas.height) {
            newY = this.player.size;
        } else if (newY < 0) {
            newY = this.drawingContext.canvas.height - this.player.size;
        }

        // var potentialLocation = new Glyph({ x: newX, y: newY }, player.dimension, newX - player.size, newX + player.size, newY - player.size, newY + player.size);
        // if (wallAt(potentialLocation)) {
        //    console.log("Wall!");
        // } else {
        this.player.center.x = newX;
        this.player.center.y = newY;
        this.player.top = this.player.center.y - ( this.player.size / 2 );
        // }
    }

    private updateUfoLocations = () => {
        this.ufos.forEach(u => {
            u.erase(this.drawingContext);
            u.draw(this.drawingContext);
        });
    }

    private updateBulletPositions = () => {
        if (this.bullets.length === 0) {
            return;
        }

        this.bullets.forEach(bullet => {
            // erase all bullets
            bullet.erase(this.drawingContext);

            if (bullet.center.y > 10) {
                // redraw any that haven't reached the top of the screen
                bullet.center.y = bullet.center.y - 10;
                bullet.draw(this.drawingContext);
            }
        });
    }

    private handleBullets = () => {
        this.updateBulletPositions();

        if (this.spacePressed) {
            this.addNewBullet();
        }
    }

    private checkForPlayerCollisions = () => {
        // can probably move this into ufo update
        this.ufos
            .filter(u => !u.isDestroyed)
            .forEach(u => {
                if (u.collidesWith(this.player)) {
                    console.log(`ufo hit player! p(${this.player.center.x},${this.player.center.y}), u(${u.center.x}, ${u.center.y})`);
                    this.isGameOver = true;
                    this.player.erase(this.drawingContext);
                    this.player.color = "red";
                    this.player.draw(this.drawingContext);
                    u.erase(this.drawingContext);
                    u.color = "red";
                    u.draw(this.drawingContext);
                }
            });
    }

    private checkForBulletCollisions = () => {
        this.bullets.forEach(b => {
            this.ufos
                .filter(u => !u.isDestroyed)
                .forEach(u => {
                    if (b.collidesWith(u)) {
                        console.log(`bullet hit ufo!`);
                        u.isDestroyed = true;
                        u.erase(this.drawingContext);
                    }
                });
        });
    }

    private updateLabels = () => {
        this.upLabel.className = this.upPressed ? "green" : "red";
        this.downLabel.className = this.downPressed ? "green" : "red";
        this.leftLabel.className = this.leftPressed ? "green" : "red";
        this.rightLabel.className = this.rightPressed ? "green" : "red";
        this.spaceLabel.className = this.spacePressed ? "green" : "red";
    }
}