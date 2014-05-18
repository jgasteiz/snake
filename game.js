(function() {
	var snake = new app.Snake(new app.Floor(), {
		delay: 100
	});
	snake.init();
	document.getElementById('restart').onclick = function() {
		window.location.reload();
	};
})();
