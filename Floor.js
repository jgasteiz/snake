/**
 * [Floor description]
 */
app.Floor = function() {
	this.el = document.getElementById('table');
	var tr = this.el.getElementsByTagName('tr')[0];
	this.sizeX = tr.children.length - 1;
	this.sizeY = this.el.getElementsByTagName('tr').length - 1;
};

/**
 * Clear the snake from the floor.
 * 
 * @return {[type]} [description]
 */
app.Floor.prototype.clear = function() {
	for (var i = 0; i <= this.sizeX; i++) {
		for (var j = 0; j <= this.sizeY; j++) {
			document.getElementById(i + '_' + j).classList.remove('head');
			document.getElementById(i + '_' + j).classList.remove('body');
		}
	}
};