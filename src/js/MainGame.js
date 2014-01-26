if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.MainGame = enchant.Class.create(enchant.Game, {
	initialize : function(){
		enchant.Game.call(this, fgj.def.window.width, fgj.def.window.height);



		this.mainMapChildNodeIndex = -1;
		this.waterMapChildNodeIndex = -1;

		this.preload.apply(this, fgj.def.preload);
		this.onload = function () {
			var gameMap = new fgj.entities.gameMap(this);
			var gameChar = new fgj.entities.Finnish(this);
			var gameWaterLabel = new fgj.entities.WaterLabel();
			var gameWaterMap = new fgj.entities.waterMap(this, gameMap);

			this.mainMapChildNodeIndex = this.rootScene.childNodes.length;

			this.rootScene.addChild(gameMap);

			this.waterMapChildNodeIndex =  this.rootScene.childNodes.length;
			this.rootScene.addChild(gameWaterMap);

			this.rootScene.addChild(gameChar);

			gameChar.setCoordinate(0,1);
			gameChar.registerObserver(gameWaterLabel);

			//this.wellcome = this.assets[fgj.def.res.audio.surprise];
			// this.bgm = this.assets[fgj.def.res.audio.gust];

			// this.addEventListener(Event.ENTER_FRAME, function() {
			// 	if (this.bgm.currentTime >= this.bgm.duration ){
			// 		this.bgm.play();
			// 	}
			// });
			// //this.wellcome.play();
			// this.bgm.play();
		}
	},
	getActualMap : function() {
		return this.rootScene.childNodes[this.mainMapChildNodeIndex];
	},
	getWaterMap : function(){
		return this.rootScene.childNodes[this.waterMapChildNodeIndex];
	},

	win: function () {
		$('body').addClass('win');
	},
	lose: function () {
		$('body').addClass('lose');
	}
});