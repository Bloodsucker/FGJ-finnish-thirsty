if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.waterMap = enchant.Class.create(enchant.Map, {
	initialize : function(game, gameMap){
		enchant.Map.call(this, fgj.def.map.tile.width, fgj.def.map.tile.height);
		this.image = game.assets[fgj.def.res.image.map];

		this.gameMap = gameMap;

		this.wM = this.createRandomWaterMap(fgj.def.map.tile.width, fgj.def.map.tile.height);

		this.loadData(this.wM);
		console.table(this.wM);

	},
	createRandomWaterMap: function (width, height) {
		var newMap = [];

		for(var y=0; y<height; y++){
			newMap[y] = [];
			for(var x=0; x<width; x++) {
				newMap[y][x] = -1;
			}
		}

		for(var x=5; x<width-5; x++) {
			var px = this.gameMap.coor2px(x, 3);
			if(!this.gameMap.hitTest(px.x, px.y)) newMap[3][x] = fgj.def.res.water;
		}

		return newMap;
	},
	isWater : function(coorx, coory){
		var px = this.coor2px(coorx, coory);
		var a = this.checkTile(px.x,px.y);

		if(this.checkTile(px.x,px.y) == fgj.def.res.water) return 1;
		else return 0;
	},
	consumeWater : function(coorx, coory){
		var px = this.coor2px(coorx, coory);
		if(this.isWater(coorx, coory)) {
			this.wM[coory][coorx] = -1;
			this.loadData(this.wM);
		}
	},
	px2coor: function (x,y) {
		var coor = {
			coorx: x/fgj.def.map.tile.width,
			coory: y/fgj.def.map.tile.height
		}

		return coor;
	},

	coor2px: function (coorx, coory) {
		var pos = {
			x: coorx*fgj.def.map.tile.width,
			y: coory*fgj.def.map.tile.height
		}

		return pos;
	}
});