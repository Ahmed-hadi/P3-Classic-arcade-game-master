// Enemy, Player, Gem and Key classes will use this class
var All_Entity = function (sprite, x, y, displayed){
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.displayed = displayed;
};

All_Entity.prototype.render = function(){
    if (this.displayed){
        ctx.drawImage(Resources.get(this.sprite), this.x*offsetX, this.y*offsetY-25);
    }
};
All_Entity.prototype.update = function(dt){
    // noop
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    /*
     * Enemy constructor will take the initial position (x,y) and add
     * Then, it will call All_Entity construtor with 'enemy-bug' image path.
     */
    All_Entity.call(this, 'images/enemy-bug.png', x, y, true);
};
// Enherit the render function from All_Entity
Enemy.prototype = Object.create(All_Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > numCols-1){
        this.x = getRandomInt(-3, 0);
    }
    else{
        this.x+= dt;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    All_Entity.call(this, 'images/char-boy.png', startX, startY, true);

    this.lives = 4;
    this.gems = 0;
    this.dead = false;
    this.deadSince = Date.now();
};
Player.prototype = Object.create(All_Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(input){
    if (input=='up' && this.y>0){
        this.y--;
    }
    else if (input=='down' && this.y<startY){
        this.y++;
    }
    else if (input=='left' && this.x>0){
        this.x--;
    }
    else if (input=='right' && this.x<numCols-1){
        this.x++;
    }
};

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
/*
* Now instantiate your objects.
* Place all enemy objects in an array called allEnemies
* Place the player object in a variable called player
*/


var allEnemies = [];

// Function to init 3 enemies
function create_enemies(){
    allEnemies = [];
    for (var i=0; i<3; i++){
        var enemy = new Enemy(getRandomInt(0,numCols-1), i+1);
        allEnemies.push(enemy);
    }
}

var allGems = [];
var gemSprites = [
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
];

// Function to init 3 gems
function create_gems(){
    allGems = [];
    for (var i=0; i<3; i++){
        var gem = new All_Entity(gemSprites[getRandomInt(0,3)], getRandomInt(0, numCols-1), i+1, true);
        allGems.push(gem);
    }
}

var player;
function create_player(){
    player = new Player();
}
/*
var key;
function create_key(){
    key = new All_Entity('images/Key.png', startX, 0, false);
}
*/
var star;
function create_star(){
    star = new All_Entity('images/Star.png', startX, 0, false);
}
// Init all entities
function create_all(){
    create_enemies();
    create_gems();
    create_player();
    //create_key();
	create_star();
    document.addEventListener('keyup', playerKeyupListener);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
var playerKeyupListener = function (e){
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

