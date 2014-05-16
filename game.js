(function() {
	var snake = new app.Snake(new app.Floor(), {
		delay: 100
	});
	document.getElementById('start').onclick = function() {
		snake.init();
	}
	document.getElementById('eat').onclick = function() {
		snake.eat();
	}
})();
