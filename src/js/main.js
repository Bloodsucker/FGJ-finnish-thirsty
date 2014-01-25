if(!fgj) var fgj = {};

fgj.load = function () {
	enchant();

	window.onload = function () {
		var game = new fgj.entities.MainGame();
		game.preload.apply(game, fgj.def.preload);
		game.onload = function () {
			var gameMap = new fgj.entities.gameMap(game);
			var gameChar = new fgj.entities.Finnish(game);

			game.addMainMap(gameMap);
			game.rootScene.addChild(gameChar);
			gameChar.setCoordinate(0,1);
		}
		game.start();
	}
}