/** @format */

//TODO:
// bug: horizontaal, dan eerst pijltje naar boven en direct pijltje naar omgekeerde richting van slang => gaat door zichzelf

class Game {
    constructor(speed) {
        this.apple = {
            X: 15,
            Y: 15,
        };
        this.score = 0;
        this.gameSize = 20;
        this.Xdirection = this.Ydirection = 0; // direction
        this.speed = speed;
        this.paused = true;

        this.setup();
    }

    setup() {
        this.canvas = document.querySelector("#game");
        this.canvasContext = this.canvas.getContext("2d");

        setInterval(() => {
            this.refresh_game(false, true);
            this.moved_manually = false;
        }, this.speed);
        this.updateHighscore();
        this.refresh_game(true);
        //make_base();
    }

    updateHighscore() {
        let local = localStorage.getItem("highscore");
        this.highscore = local ? local : 0;
        localStorage.setItem("highscore", this.highscore);

        document.getElementById("highscore").innerHTML = "Highscore: " + this.highscore;
    }

    updateScore() {
        document.getElementById("score").innerHTML = "Score: " + this.score;
    }

    refresh_game(setup = false) {
        if (this.paused && !setup) return;

        // clear canvas
        this.canvasContext.fillStyle = "#ffffff";
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // place moves
        snake.X += this.Xdirection;
        snake.Y += this.Ydirection;

        // check if out of frame
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

        // redraw snake
        this.canvasContext.fillStyle = "#01A2E8";
        for (var i = 0; i < snake.trail.length; i++) {
            this.canvasContext.fillRect(snake.trail[i].x * this.gameSize, snake.trail[i].y * this.gameSize, this.gameSize - 2, this.gameSize - 2);
            this.death(i);
        }

        // add a new head
        snake.trail.push({
            x: snake.X,
            y: snake.Y,
        });

        // remove last tail
        while (snake.trail.length > snake.length) {
            snake.trail.shift();
        }

        this.refresh_apple();
    }

    refresh_apple() {
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

    death(i) {
        if (snake.trail[i].x == snake.X && snake.trail[i].y == snake.Y) {
            snake.length = 5;

            if (this.score > this.highscore) {
                localStorage.setItem("highscore", this.score);
            }

            this.score = 0;
            this.updateScore();
            this.updateHighscore();
        }
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
        if (game.Xdirection != 1) {
            game.Xdirection = -1;
            game.Ydirection = 0;
        }
        this.moved_manually = true;
    }

    move_right() {
        if (game.Xdirection != -1) {
            game.Xdirection = 1;
            game.Ydirection = 0;
        }
        this.moved_manually = true;
    }

    move_down() {
        if (game.Ydirection != -1) {
            game.Xdirection = 0;
            game.Ydirection = 1;
        }
        this.moved_manually = true;
    }

    move_up() {
        if (game.Ydirection != 1) {
            game.Xdirection = 0;
            game.Ydirection = -1;
        }
        this.moved_manually = true;
    }

    move_snake(keypress) {
        if (game.paused) return;

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

let snake, game;

window.onload = () => {
    const pause_btn = document.querySelector(".pause");

    document.querySelectorAll("button#start").forEach((x) => {
        x.onclick = () => {
            snake = new Snake();
            game = new Game(x.dataset.speed);

            game.paused = false;
            document.body.classList.toggle("start_page");
        };
    });

    pause_btn.onclick = () => {
        game.paused = !game.paused;
        let not_selected = pause_btn.querySelector("path:not(.selected)");

        pause_btn.querySelector("path.selected").classList.toggle("selected");
        not_selected.classList.toggle("selected");
    };
};
