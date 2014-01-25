if(!fgj) var fgj = {};

fgj.load = function () {
	enchant();

	window.onload = function () {
		var game = new fgj.entities.MainGame();
		
		game.start();
	}
}