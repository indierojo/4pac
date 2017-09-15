import { Button } from "./models/button";
import { Circle } from "./models/circle";
import { Glyph } from "./engine/Glyph";
import { Spaceship } from "./models/spaceship";
import { Ufo } from "./models/ufo";

type Direction = "up" | "down";

export default class Clouds /* implements IGameBootstrapper, IKeyboardControlled */ {
    private canvas: HTMLCanvasElement;
    private drawingContext: CanvasRenderingContext2D;

    private isGameOver: boolean;
    private player: Spaceship;
    private playerBullets: Array<Circle>;
    private ufoBullets: Array<Circle>;
    private ufos: Array<Ufo>;
    private restartButton: Button;

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
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = this.canvas.getContext("2d");

        this.restartButton = new Button(this.canvas, {x: 250, y: 250}, 300, 100, "Restart?", this.resetGame.bind(this));
        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";
        this.registerKeyHandlers();
        this.resetGame();
    }

    private resetGame() {
        this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.initGameModels();
        this.restartButton.setActive(false);
        this.initUI();
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
        this.updateLabels();
    }

    private initGameModels = () => {
        this.playerBullets = [];
        this.ufoBullets = [];
        this.player = new Spaceship({ x: 250, y: 450 }, 50, "#FFFF77");
        this.player.draw(this.drawingContext);

        this.ufos = [
            new Ufo({x: 400, y: 150}, 25, "#773355"),
            new Ufo({x: 200, y: 75}, 25, "#335577"),
            new Ufo({x: 125, y: 215}, 25, "#557733")
        ];
        this.ufos.forEach(u => u.draw(this.drawingContext));
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
            return;
        }

        this.updateLabels();
        this.updatePlayerLocation();
        this.updateUfoLocations();
        this.handleBullets();
        this.checkForBulletCollisions();
        this.checkForPlayerCollisions();

        window.requestNextAnimationFrame(this.animate);
    }

    private addNewBullet = (actor: Glyph, direction: Direction) => {
        const vector = direction === "up" ? 1 : -1;
        const bulletXLeft = actor.center.x - actor.dimension.width / 2;
        const bulletXRight = actor.center.x + actor.dimension.width / 2;
        const bulletY = actor.center.y + (actor.dimension.height / 2) + 6 * vector;

        const isInSamePosition = b => {
            return b.center.y >= bulletY + 60 * vector
                && (
                    b.center.x >= bulletXLeft
                    && b.center.x <= bulletXRight
                );
        };
        if (this.playerBullets.some(isInSamePosition)) {
            // Don't add a new bullet if one already exists at same x and similar y
            return;
        }
        if (this.ufoBullets.some(isInSamePosition)) {
            // Don't add a new bullet if one already exists at same x and similar y
            return;
        }

        const bullet = new Circle({ x: actor.center.x, y: bulletY }, 4, "#FFFF77");
        bullet.draw(this.drawingContext);
        return bullet;
    }

    private updatePlayerLocation = () => {
        let stepX = 0;
        let stepY = 0;
        if (this.leftPressed)  { stepX = -10; }
        if (this.upPressed)    { stepY = -10; }
        if (this.downPressed)  { stepY = 10; }
        if (this.rightPressed) { stepX = 10; }

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

        this.player.setCenter({x: newX, y: newY});
        this.player.draw(this.drawingContext);
    }

    private updateUfoLocations = () => {
        const step = 3;
        const maxDistance = 70;
        this.ufos
            .filter(u => !u.isDestroyed)
            .forEach(u => {
                u.erase(this.drawingContext);
                const axis = u.isLeftRight ? "x" : "y";
                const otherAxis = !u.isLeftRight ? "x" : "y";
                const currentDistance = u.center[axis] - u.origin[axis];
                const isAtMax = Math.abs(currentDistance) >= maxDistance / 2;
                if (isAtMax) {
                    u.isFlipped = !u.isFlipped;
                }
                const directionalStep = u.isFlipped ? -step : step;
                const newCenter = {x: 0, y: 0}; // Have to do this for the type system, probably a better way?
                newCenter[axis] = u.center[axis] + directionalStep;
                newCenter[otherAxis] = u.center[otherAxis];
                u.setCenter(newCenter);
                u.draw(this.drawingContext);
            });
    }

    private updateBulletPositions = () => {
        this.updatePlayerBullets();
        this.updateUfoBullets();
    }

    private updatePlayerBullets = () => {
        this.playerBullets.forEach((b) => {
            // erase all bullets
            b.erase(this.drawingContext);
        });
        const isInPlay = b => { return b.center.y > 10; };
        this.playerBullets = this.playerBullets.filter(isInPlay);
        // ^ remove all the bullets that are off screen
        this.playerBullets.forEach(bullet => {
            bullet.setCenter({x: bullet.center.x, y: bullet.center.y - 10});
            bullet.draw(this.drawingContext);
        });
    }

    private updateUfoBullets = () => {
        this.ufoBullets.forEach((b) => {
            // erase all bullets
            b.erase(this.drawingContext);
        });
        const isInPlay = b => { return b.center.y < this.canvas.height - 10; };
        this.ufoBullets = this.ufoBullets.filter(isInPlay);
        // ^ remove all the bullets that are off screen
        this.ufoBullets.forEach(bullet => {
            bullet.setCenter({x: bullet.center.x, y: bullet.center.y + 10});
            bullet.draw(this.drawingContext);
        });
    }

    private handleBullets = () => {
        this.updateBulletPositions();

        if (this.spacePressed) {
            const bullet = this.addNewBullet(this.player, "up");
            if (bullet) {
                // Can return no bullet if we can't shoot
                this.playerBullets.push(bullet);
            }
        }
        this.ufos
            .filter(u => !u.isDestroyed)
            .forEach(u => {
                const bullet = this.addNewBullet(u, "down");
                if (bullet) {
                    this.ufoBullets.push(bullet);
                }
            });
    }

    private checkForPlayerCollisions = () => {
        // can probably move this into ufo update
        this.ufos
            .filter(u => !u.isDestroyed)
            .forEach(u => {
                if (u.collidesWith(this.player)) {
                    u.erase(this.drawingContext);
                    u.color = "red";
                    u.draw(this.drawingContext);
                    this.handleGameOver(false);
                }
            });
    }

    private checkForBulletCollisions = () => {
        this.playerBullets.forEach(b => {
            this.ufos
                .filter(u => !u.isDestroyed)
                .forEach(u => {
                    if (b.collidesWith(u)) {
                        u.isDestroyed = true;
                        u.erase(this.drawingContext);
                    }
                });
        });
        if (this.ufos.every(u => u.isDestroyed)) {
            this.handleGameOver(true);
            return;
        }
        this.ufoBullets.forEach(b => {
            if (b.collidesWith(this.player)) {
                this.handleGameOver(false);
                b.erase(this.drawingContext);
                b.color = "red";
                b.draw(this.drawingContext);
                return;
            }
        });
    }

    private updateLabels = () => {
        this.upLabel.className = this.upPressed ? "green" : "red";
        this.downLabel.className = this.downPressed ? "green" : "red";
        this.leftLabel.className = this.leftPressed ? "green" : "red";
        this.rightLabel.className = this.rightPressed ? "green" : "red";
        this.spaceLabel.className = this.spacePressed ? "green" : "red";
    }

    private handleGameOver = (wasVictory: boolean) => {
        this.isGameOver = true;
        this.player.erase(this.drawingContext);
        this.player.color = wasVictory ? "green" : "red";
        this.player.draw(this.drawingContext);
        this.initUI();

        this.drawingContext.fillStyle = "cornflowerblue";
        const text = wasVictory ? "You Win!" : "Game Over!";
        this.drawingContext.fillText(text, 125, 150);

        this.restartButton.draw(this.drawingContext);
    }
}