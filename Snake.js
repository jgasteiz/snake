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
        37 : 'left',  // left arrow
        39 : 'right',  // right arrow
        65 : 'left',  // A
        68 : 'right',  // D
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

    var className,
        bodyPart;
    for (var _i = 0; _i < this.body.length; _i++) {
        bodyPart = document.getElementById(this.body[_i].x + '_' + this.body[_i].y);
        if (_i === 0) {
            className = 'head';
        } else {
            className = 'body';
        }
        bodyPart.classList.add(className);
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
    var direction = this.options.directions[0],
        newX = this.body[0].x,
        newY = this.body[0].y;
    if (direction === 'left') {
        newX = this.body[0].x - 1;
        if (newX < 0) {
            newX = this.lastX;
        }
    } else if (direction === 'right') {
        newX = this.body[0].x + 1;
        if (newX > this.lastX) {
            newX = 0;
        }
    } else if (direction === 'up') {
        newY = this.body[0].y - 1;
        if (newY < 0) {
            newY = this.lastY;
        }
    } else if (direction === 'down') {
        newY = this.body[0].y + 1;
        if (newY > this.lastY) {
            newY = 0;
        }
    }

    this.updateBody({x: newX, y: newY});
};

/**
 * Update the coordinates of the snake body: add a new head and pop the last
 * part of the body unless the snake is eating.
 * 
 * @param  {[type]} newHead [description]
 * @return {[type]}         [description]
 */
app.Snake.prototype.updateBody = function(newHead) {    
    // Always add a new head to the body.
    this.body.unshift(newHead);

    var head = this.body[0],
        foodCoordinates = this.food.coordinates;

    // If the snake is not eating, pop the last part of the body.
    if (this.eating === false) {
        this.body.pop();
    } else {
        this.eating = false;
    }

    // Check if snake dies for crashing with itself.
    if (this.floor.containsCoordinates(head, this.body.slice(0).slice(1)) === true) {
        this.die();
    }
    // Check if snake eats for crashing with food.
    else if (foodCoordinates.x === head.x && foodCoordinates.y === head.y) {
        this.eat();
    }

    this.render();
};

/**
 * The snake eats food and render a letter if it's the 2nd time the snake has
 * eaten food from that letter.
 * 
 * @return {[type]} [description]
 */
app.Snake.prototype.eat = function() {
    this.eating = true;
    for (var _i = 0; _i < this.floor.remainingWords.length; _i++) {
        var word = this.floor.remainingWords[_i];

        if (word.letter === this.food.letter) {
            word.timesEated = word.timesEated + 1;
            document.getElementById(this.food.coordinates.x + '_' + this.food.coordinates.y).classList.remove('food');

            if (word.timesEated === 2) {
                this.floor.remainingWords.splice(_i, 1);
                this.floor.renderLetter(word.letter);
                break;
            }
        }
    }

    this.renderFood();
};

/**
 * Render a bug in a random place between the remaining letters of the text.
 * 
 * @return {[type]} [description]
 */
app.Snake.prototype.renderFood = function() {

    if (this.floor.remainingWords.length > 0) {
        var randomLetter = this.floor.getRandomItem(this.floor.remainingWords);
        var randomCoordinates = this.floor.getRandomItem(randomLetter.coordinates);

        this.food = {letter: randomLetter.letter, coordinates: randomCoordinates};

        document.getElementById(randomCoordinates.x + '_' + randomCoordinates.y).classList.add('food');
    } else {
        window.clearInterval(this.interval);
        document.body.classList.add('win');
    }
};

/**
 * The game stops, everything turns read, you are dead.
 * 
 * @return {[type]} [description]
 */
app.Snake.prototype.die = function() {
    window.clearInterval(this.interval);
    document.body.classList.add('death');
};
