/*
    
    This work was inspired by MATTHEW CRANFORD "Arcade Game Walkthrough" 
    https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/

    & 

    Udacity Webinar "FEND P3: Classic Arcade Game Clone walkthrough with Llon"
    https://www.youtube.com/watch?v=oz7pHJ65TEk&feature=youtu.be

*/

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.horizontal = 101;
    this.vertical = 83;
    this.x = x;
    this.y = y + 65;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.horizontal * 5) {
        this.x += this.speed * dt;
    } else {
        this.x = -this.horizontal;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const bug1 = new Enemy (-101, 0, 200);
const bug2 = new Enemy (-101, 83, 100);
const bug3 = new Enemy (-101, 166, 300);

var allEnemies = [];

allEnemies.push(bug1, bug2, bug3);


// Player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, sprite) {

    this.horizontal = 101;
    this.vertical = 83;
    this.startX = this.horizontal * 2;
    this.startY = (this.vertical * 4) + 65;
    this.x = this.startX;
    this.y = this.startY;

    this.sprite = "images/char-boy.png";
}

Player.prototype.update = function() {

    for (let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.horizontal/2 > this.x && enemy.x < this.x + this.horizontal/2)) {
            this.reset();
        }
    }

        if (this.y < 0) {
            this.won();
        }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    const horizontal = 101;
    const vertical = 83;

    if (input === "left" && this.x >= this.horizontal) {
        this.x -= horizontal;
    } else if (input === "right" && this.x + this.horizontal <= 404) {
        this.x += horizontal;
    } else if (input === "up" && this.y >= 0) {
        this.y -= vertical;
    } else if (input === "down" && this.y + vertical <= 400) {
        this.y += vertical;
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Initialize player object
// Place the player object in a variable called player

const player = new Player();

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
}

const winnerAlert = document.getElementById("winnerAlert");

Player.prototype.won = function() {
    this.reset();
    setTimeout(function(){
     winnerAlert.style.visibility = "visible";
        }, 200);
} 

const button = document.getElementById("button");
button.addEventListener("click", function() {
    winnerAlert.style.visibility = "hidden";

}); 

