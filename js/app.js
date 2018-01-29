// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(speed,row){
      this.sprite = 'images/enemy-bug.png';
      this.x = -101;
      this.y = this.getRow();
      this.speed = this.getSpeed();
      //row1: 60
      //row2: 143
      //row3: 226
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x < 492 ? this.x += (this.speed * dt) : this.x = -101;
    };

    width() {
        return Resources.get(this.sprite).width;
    }
    height() {
        return Resources.get(this.sprite).height;
    }

    //get speed of enemy
    getSpeed(){
      const speed = [100, 200, 300];
      return speed[Math.floor(Math.random() * 4)];
    }

    //get position of enemy
    getRow(){
      const position =[60, 143, 226];
      return position[Math.floor(Math.random() * 4)];
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Now write your own player class
class Player {
  // This class requires an update(), render() and
  // a handleInput() method.

  // The image/sprite for our player, this uses
  // a helper we've provided to easily load images
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 392;
    this.wins = 0;
    this.loses = 0;
  }

  update() {
  }

  width() {
      return Resources.get(this.sprite).width;
  }

  height() {
      return Resources.get(this.sprite).height;
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Update the location of the player based keyboard
  handleInput(currentKey) {
    switch (currentKey) {
      case 'left':
        if(this.x > 0) {this.x -= 101;}
        break;
      case 'up':
        if(this.y > 60) {
          this.y -= 83;
        } else {
          this.y = 392;
          this.x = 202;
          this.wins += 1;
          winsCount.textContent = this.wins;
        }
        break;
      case 'right':
        if(this.x < 392) {this.x += 101;}
        break;
      case 'down':
        if (this.y < 392) {this.y += 83;}
        break;
    }
  }
};

// Check for collision with enemies
function checkCollisions(){
    allEnemies.forEach( enemy => {
      if(player.y == enemy.y){
        if(player.x + player.width() + 40 >= enemy.x && player.x  + 40 <= enemy.x + enemy.width()) {
              player.x = 202;
              player.y = 392;
              player.loses += 1;
              losesCount.textContent = player.loses;
        }
      }
    });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

//set total enemies
const totalEnemies = 8;
//create list
let allEnemies = [];
//build list of enemies
for(let i=0; i < totalEnemies; i++){
  allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
let player = new Player();

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

// link the wins/loses sections
const winsCount = document.querySelector('.wins-count');
const losesCount = document.querySelector('.loses-count');
