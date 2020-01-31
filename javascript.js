let board = document.getElementById('board');
let h1 = document.getElementById('headline');
let scoreBoard = document.getElementById('myScore');
let highestScoreBoard = document.getElementById('highestScore');
let paint = board.getContext('2d');
let y = board.height - 25;
let x = board.width / 2;
let yMove = - 2;
let xMove = 2;
let radius = 10
let blockWidth = 100;
let blockHeight = 10;
let blockLoc = (board.width - blockWidth) / 2;
let left = false;
let right = false;
let start = false;
let score = 0
let highestScore = 0

document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);
// h1.innerHTML = `Please Choose Difficulty`;

function difficulty(x) {
    if (x == 'easy') {
        blockWidth = 100;
        blockLoc = (board.width - blockWidth) / 2;
    } else if (x == 'medium') {
        blockWidth = 75;
        blockLoc = (board.width - blockWidth) / 2;
    } else if (x == 'hard') {
        blockWidth = 50;
        blockLoc = (board.width - blockWidth) / 2;
    } else if (x == 'impossible') {
        blockWidth = 30;
        blockLoc = (board.width - blockWidth) / 2;
    }
}

function keyUp(x) {
    if (x.keyCode == 37) {
        left = false;
    } else if (x.keyCode == 39) {
        right = false;
    } else if (x.keyCode == 32) {
        if (start) {
            start = false;
        } else {
            start = true;
        }
    }
}
function keyDown(x) {
    if (x.keyCode == 37) {
        left = true;
    } else if (x.keyCode == 39) {
        right = true;
    }
}
function ball() {
    paint.beginPath();
    paint.arc(x, y, radius, 0, Math.PI * 2);
    paint.fillStyle = 'teal';
    paint.fill();
    paint.closePath(); 
}
function block() {
    paint.beginPath();
    paint.rect(blockLoc, board.height - blockHeight, blockWidth, blockHeight);
    paint.fillStyle = 'teal';
    paint.fill();
    paint.closePath();
}

function movement() {
    paint.clearRect(0, 0, board.width, board.height);
    ball();
    block();
    if (x > board.width - radius || x < radius) {
        xMove = -xMove;
    } else if (y < radius) {
        yMove = -yMove;
    } else if (y > board.height - blockHeight) {
        if (x > blockLoc && x < blockLoc + blockWidth) {
            yMove = - yMove;
            score++;
            if (highestScore < score) {
                highestScore = score;
            }
            scoreBoard.innerHTML = `${score}`;
            highestScoreBoard.innerHTML = `${highestScore}`
        } else if (y > board.height + radius) {
            alert(`GAME OVER!!! Your Score : ${score}`)
            score = 0;
            scoreBoard.innerHTML = `${score}`;
            highestScoreBoard.innerHTML = `${highestScore}`
            y = board.height - 25;
            x = board.width / 2;
            blockLoc = (board.width - blockWidth) / 2;
            yMove = -yMove
            start = false;
            right = false;
            left = false;
        }
    }
    if (right) {
        blockLoc += 7;
        if (blockLoc > board.width - blockWidth) {
            blockLoc = board.width - blockWidth;
        }
    } else if (left) {
        blockLoc -= 7;
        if (blockLoc < 0) {
            blockLoc = 0
        }
    }
    if (start) {
        y += yMove;
        x += xMove;
        h1.innerHTML = "Tekan Spacebar untuk Pause!"
    } else {
        h1.innerHTML = "Tekan Spacebar untuk Play!"
    }
}

setInterval(movement, 10);