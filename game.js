(function() {
	var snake = new app.Snake(new app.Floor(), {
		delay: 100
	});
	snake.init();
	document.getElementById('start').onclick = function() {
		window.location.reload();
	};
})();
