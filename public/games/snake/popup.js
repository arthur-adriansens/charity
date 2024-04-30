/** @format */

//TODO:
// bug: horizontaal, dan eerst pijltje naar boven en direct pijltje naar omgekeerde richting van slang => gaat door zichzelf

class Game {
    constructor() {
        this.apple = {
            X: 15,
            Y: 15,
        };
        this.score = 0;
        this.gameSize = 20;
        this.xv = this.yv = 0; // size of next step
        this.speed = 1000 / 15;

        window.onload = () => this.setup();
    }

    setup() {
        this.canvas = document.querySelector("#game");
        this.canvasContext = this.canvas.getContext("2d");

        setInterval(() => this.refresh_game(), this.speed);
        this.updateHighscore();
        this.refresh_game();
        //make_base();
    }

    updateHighscore() {
        if (localStorage.getItem("highscore") === null) {
            localStorage.setItem("highscore", 0);
            this.highscore = 0;
        } else {
            this.highscore = localStorage.getItem("highscore");
            document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
        }
    }

    updateScore() {
        document.getElementById("score").innerHTML = "Score: " + this.score;
    }

    refresh_game() {
        snake.X += this.xv;
        snake.Y += this.yv;

        if (snake.X < 0) {
            snake.X = this.gameSize - 1;
        }
        if (snake.X > this.gameSize - 1) {
            snake.X = 0;
        }
        if (snake.Y < 0) {
            snake.Y = this.gameSize - 1;
        }
        if (snake.Y > this.gameSize - 1) {
            snake.Y = 0;
        }
        this.canvasContext.fillStyle = "#ffffff";
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.fillStyle = "#01A2E8";

        for (var i = 0; i < snake.trail.length; i++) {
            this.canvasContext.fillRect(snake.trail[i].x * this.gameSize, snake.trail[i].y * this.gameSize, this.gameSize - 2, this.gameSize - 2);
            if (snake.trail[i].x == snake.X && snake.trail[i].y == snake.Y) {
                snake.length = 5;
                if (this.score > this.highscore) {
                    localStorage.setItem("highscore", this.score);
                }
                this.score = 0;
                this.updateScore();
                this.updateHighscore();
                console.log("death");
            }
        }
        snake.trail.push({
            x: snake.X,
            y: snake.Y,
        });
        while (snake.trail.length > snake.length) {
            snake.trail.shift();
        }

        if (this.apple.X == snake.X && this.apple.Y == snake.Y) {
            this.score++;
            this.updateScore();
            snake.length++;
            this.apple.X = Math.floor(Math.random() * this.gameSize);
            this.apple.Y = Math.floor(Math.random() * this.gameSize);
        }
        this.canvasContext.fillStyle = "#FF7A00";
        this.canvasContext.fillRect(this.apple.X * this.gameSize, this.apple.Y * this.gameSize, this.gameSize - 2, this.gameSize - 2);
    }
}

class Snake {
    constructor() {
        this.X = this.Y = 10; //snake start
        this.trail = [];
        this.length = 5; // length tail
        document.addEventListener("keydown", (e) => this.move_snake(e));
    }

    move_left() {
        if (game.xv != 1) {
            game.xv = -1;
            game.yv = 0;
        }
    }

    move_right() {
        if (game.xv != -1) {
            game.xv = 1;
            game.yv = 0;
        }
    }

    move_down() {
        if (game.yv != -1) {
            game.xv = 0;
            game.yv = 1;
        }
    }

    move_up() {
        if (game.yv != 1) {
            game.xv = 0;
            game.yv = -1;
        }
    }

    move_snake(keypress) {
        switch (keypress.key) {
            case "ArrowLeft":
                this.move_left();
                break;
            case "ArrowUp":
                this.move_up();
                break;
            case "ArrowRight":
                this.move_right();
                break;
            case "ArrowDown":
                this.move_down();
                break;
        }
    }
}

/*
function make_base() {
    base_image = new Image();
    base_image.src = 'settings.png';
    base_image.onload = function() {
        canvasContext.drawImage(base_image, 0, 0);
    }
}
*/

const snake = new Snake();
const game = new Game();
