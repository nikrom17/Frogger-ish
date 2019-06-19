// Enemies our player must avoid
class Enemy {
    constructor() {
        this.position = [60, 145, 230];
        this.sprite = 'images/enemy-bug.png';
        this.size = 40;
        this.minSpeed = 100;
        this.maxSpeed = 150;
        this.minPosition = -150;
        this.maxPosition = -300;
        this.speed = Math.floor(Math.random() * this.maxSpeed) + this.minSpeed;
        this.x = Math.floor(Math.random() * this.maxPosition) + this.minPosition;
        this.y = this.position[Math.floor(Math.random()*this.position.length)];
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += (dt * this.speed);
        if (this.x > 550) {
            this.x = Math.floor(Math.random() * this.maxPosition) + this.minPosition; 
            this.speed = Math.floor(Math.random() * this.maxSpeed) + this.minSpeed;
            this.y = this.position[Math.floor(Math.random()*this.position.length)];
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
      this.sprite = 'images/char-princess-girl.png';
      this.size = 20
      this.x = 200;
      this.y = 375;
      this.lives = 3;
      this.score = 0;
      this.lastScore = 0;
      this.displayScore = false;
    }

    positionReset() {
      this.x = 200;
      this.y = 375;
    }

    gameOver() {
        this.lastScore = this.score;
        this.displayScore = true;
        this.score = 0;
        this.lives = 3;
    }

    reduceLives() {
        this.positionReset();
        this.lives -= 1;
        if (!this.lives) {
            this.gameOver();
        }
    }

    checkIfAtGoal() {
        if (this.y === -40) {
            this.positionReset();
            this.score += 1; 
        }
    }

    handleInput(input) {
        this.displayScore = false;
        switch(input) {
            case 'left':
                if (this.x !== -2) {
                    this.update('x', -101);
                }
                break;
            case 'up':
                this.update('y', -83);
                break;
            case 'down':
                if (this.y !== 375) {
                    this.update('y', 83);
                }
                break;
            case 'right':
                if (this.x !== 402) {
                    this.update('x', 101);
                }
                break;
            default:
        }
        this.checkIfAtGoal()
    }

    update(dir, value) {
        this[dir] += value;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.font = "30px Arial";
        ctx.fillText(`Score: ${this.score}`, 10, 40);
        ctx.fillText(`Lives: ${this.lives}`, 390, 40);
        if (this.displayScore) {
            ctx.fillText(`You lost, your score was ${this.lastScore}`, 80, 575);
        }
    }
  }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemy = new Enemy;
const enemy1 = new Enemy;
const enemy2 = new Enemy;
const enemy3 = new Enemy;
const enemy4 = new Enemy;
const enemy5 = new Enemy;
allEnemies.push(enemy);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);

const player = new Player;


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