window.onload = function() {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
    updateHighscore();
    //make_base();
}
Xsnake = Ysnake = 10;
gs = tc = 20;
Xapple = Yapple = 15;
xv = yv = 0;
trail = [];
tail = 5;
score = 0;

/*
function make_base() {
    base_image = new Image();
    base_image.src = 'settings.png';
    base_image.onload = function() {
        canvasContext.drawImage(base_image, 0, 0);
    }
}
*/
function updateHighscore() {
    //Check browser supports local storage
    if (typeof(Storage) !== "undefined") {

        //Check if their is a highscore made before  
        if (localStorage.getItem("highscore") === null) {
            localStorage.setItem("highscore", 0);
            highscore = 0;
        } else {
            highscore = localStorage.getItem("highscore");
            document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
        }
    } else {
        document.getElementById("highscore").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function game() {
    Xsnake += xv;
    Ysnake += yv;
    if (Xsnake < 0) {
        Xsnake = tc - 1;
    }
    if (Xsnake > tc - 1) {
        Xsnake = 0;
    }
    if (Ysnake < 0) {
        Ysnake = tc - 1;
    }
    if (Ysnake > tc - 1) {
        Ysnake = 0;
    }
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = "#01A2E8";
    for (var i = 0; i < trail.length; i++) {
        canvasContext.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == Xsnake && trail[i].y == Ysnake) {
            tail = 5;
            if (score > highscore) {
                localStorage.setItem("highscore", score);
            }
            score = 0;
            updateScore();
            updateHighscore()
        }
    }
    trail.push({
        x: Xsnake,
        y: Ysnake
    });
    while (trail.length > tail) {
        trail.shift();
    }

    if (Xapple == Xsnake && Yapple == Ysnake) {
        score++;
        updateScore();
        tail++;
        Xapple = Math.floor(Math.random() * tc);
        Yapple = Math.floor(Math.random() * tc);
    }
    canvasContext.fillStyle = "#FF7A00";
    canvasContext.fillRect(Xapple * gs, Yapple * gs, gs - 2, gs - 2);
}

function keyPush(evt) {
    switch (evt.keyCode) {
        case 37: //left arrow
            if (xv != 1) {
                xv = -1;
                yv = 0; //turn left
            }
            break;
        case 38: //up arrow
            if (yv != 1) {
                xv = 0;
                yv = -1; //turn up
            }
            break;
        case 39: //right arrow
            if (xv != -1) {
                xv = 1;
                yv = 0; //turn right
            }
            break;
        case 40: //down arrow
            if (yv != -1) {
                xv = 0;
                yv = 1; // turn down
            }
            break;
    }
}

//localStorage.setItem("lastname", "Smith");