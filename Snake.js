/**
 * Snake object.
 *
 * @param {[type]} floor   [description]
 * @param {[type]} options [description]
 */
app.Snake = function(floor, options) {
    this.body = [{
        x: 0,
        y: 0
    }];
    this.eating = false;

    this.options = options;
    this.options.codes = {
        37 : 'left',
        39 : 'right'
    };
    this.options.directions = ['up', 'right', 'down', 'left'];

    this.floor = floor;
    this.lastX = floor.sizeX;
    this.lastY = floor.sizeY;
};

/**
 * Initialize movement and key binding for controls.
 *
 * @return {[type]} [description]
 */
app.Snake.prototype.init = function() {
    this.render();
    this.renderFood();

    var _move = function() {
        this.move();
    };

    this.interval = window.setInterval(_move.bind(this), this.options.delay);
    window.onkeydown = this.handleKeyStroke.bind(this);
};

/**
 * Clear the floor and renders the head.
 *
 * @return {[type]} [description]
 */
app.Snake.prototype.render = function() {
    this.floor.clear();

    var _className,
        _bodyPart;
    for (var _i = 0; _i < this.body.length; _i++) {
        _bodypart = document.getElementById(this.body[_i].x + '_' + this.body[_i].y);
        if (_i === 0) {
            _className = 'head';
        } else {
            _className = 'body';
        }
        _bodypart.classList.add(_className);
    }
};

/**
 * Handle the user keystroke, turning the snake's direction to its left if
 * pressing `left` or `down`, or turning it to the right pressing `right` or
 * `up`.
 *
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
app.Snake.prototype.handleKeyStroke = function(e) {
	var key = e.keyCode || e.which,
        direction = this.options.codes[key];
    if (direction !== undefined) {
        if (direction === 'right') {
            this.options.directions.push(this.options.directions.shift());
        } else if (direction === 'left') {
            this.options.directions.unshift(this.options.directions.pop());
        }
    }
};

/**
 * Move the snake in its current direction.
 *
 * @return {[type]} [description]
 */
app.Snake.prototype.move = function() {
    var direction = this.options.directions[0];
    if (direction === 'left') {
        this.moveLeft();
    } else if (direction === 'right') {
        this.moveRight();
    } else if (direction === 'up') {
        this.moveUp();
    } else if (direction === 'down') {
        this.moveDown();
    }
};

app.Snake.prototype.moveUp = function() {
    var newY = this.body[0].y - 1;
    if (newY < 0) {
        newY = this.lastY;
    }
    this.updateBody({x: this.body[0].x, y: newY});
};

app.Snake.prototype.moveDown = function() {
    var newY = this.body[0].y + 1;
    if (newY > this.lastY) {
        newY = 0;
    }
    this.updateBody({x: this.body[0].x, y: newY});
};

app.Snake.prototype.moveLeft = function() {
    var newX = this.body[0].x - 1;
    if (newX < 0) {
        newX = this.lastX;
    }
    this.updateBody({x: newX, y: this.body[0].y})
};

app.Snake.prototype.moveRight = function() {
    var newX = this.body[0].x + 1;
    if (newX > this.lastX) {
        newX = 0;
    }
    this.updateBody({x: newX, y: this.body[0].y})
};

app.Snake.prototype.updateBody = function(newHead) {
    this.body.unshift(newHead);

    if (this.eating === false) {
        this.body.pop();
    } else {
        this.eating = false;
    }

    var head = document.getElementById(this.body[0].x + '_' + this.body[0].y);

    if (head.classList.contains('body')) {
        this.die();
    } else if (head.classList.contains('food')) {
        this.eat();
        this.renderFood();
    }

    this.render();

    this.floor.renderWord();
};

app.Snake.prototype.renderFood = function() {
    var randX = Math.floor(Math.random() * this.lastX),
        randY = Math.floor(Math.random() * this.lastY),
        foodCell = document.getElementsByClassName('food')[0];
    if (foodCell) {
        foodCell.classList.remove('food');
    }
    document.getElementById(randX + '_' + randY).classList.add('food');
};

app.Snake.prototype.eat = function() {
    this.eating = true;
};

app.Snake.prototype.die = function() {
    document.body.classList.add('death');
    window.clearInterval(this.interval);
};
