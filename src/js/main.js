if(!fgj) var fgj = {};

fgj.load = function () {
	enchant();

	window.onload = function () {
		var game = new Game(fgj.def.window.width, fgj.def.window.height);
		game.preload.apply(game, fgj.def.preload);
		game.onload = function () {
			var gameMap = new fgj.entities.gameMap(game);
			game.rootScene.addChild(gameMap);
		}
		game.start();
	}
}