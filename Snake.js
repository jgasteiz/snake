/**
 * Snake object.
 * 
 * @param {[type]} floor   [description]
 * @param {[type]} options [description]
 */
app.Snake = function(floor, options) {
	this.size = 1;
	this.x = 0;
	this.y = 0;

	this.options = options;
	this.options.codes = {
		37 : 'left',
		38 : 'up',
		39 : 'right',
		40 : 'down'
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

	var _move = function() {
		this.move();
	};

	window.setInterval(_move.bind(this), this.options.delay);
	window.onkeydown = this.handleKeyStroke.bind(this);
};

/**
 * Clear the floor and renders the head.
 * 
 * @return {[type]} [description]
 */
app.Snake.prototype.render = function() {
	this.floor.clear();
	this.head = document.getElementById(this.x + '_' + this.y);
	this.head.classList.add('head');
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
		if (direction === 'up' || direction === 'right') {
			this.options.directions.push(this.options.directions.shift());
		} else {
			this.options.directions.unshift(this.options.directions.pop());
		}
	}
}

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
}

app.Snake.prototype.moveUp = function() {
	this.y = this.y - 1;
	if (this.y < 0) {
		this.y = this.lastY;
	}
	this.render();
};

app.Snake.prototype.moveDown = function() {
	this.y = this.y + 1;
	if (this.y > this.lastY) {
		this.y = 0;
	}
	this.render();
};

app.Snake.prototype.moveLeft = function() {
	this.x = this.x - 1;
	if (this.x < 0) {
		this.x = this.lastX;
	}
	this.render();
};

app.Snake.prototype.moveRight = function() {
	this.x = this.x + 1;
	if (this.x > this.lastX) {
		this.x = 0;
	}
	this.render();
};
