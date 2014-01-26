if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.waterMap = enchant.Class.create(enchant.Map, {
	initialize : function(game, gameMap){
		enchant.Map.call(this, fgj.def.map.tile.width, fgj.def.map.tile.height);
		this.image = game.assets[fgj.def.res.image.map];

		this.gameMap = gameMap;

		this.wM = this.createRandomWaterMap(fgj.def.map.width, fgj.def.map.height);

		this.loadData(this.wM);

	},
	createRandomWaterMap: function (width, height) {
		var newMap = [];

		for(var y=0; y<height; y++){
			newMap[y] = [];
			for(var x=0; x<width; x++) {
				newMap[y][x] = -1;
			}
		}

		var candidates = [];
		for(var y=0; y<height; y++ ) {
			for(var x=0; x<width/2; x++ ) {
				var px = this.gameMap.coor2px(x, y);
				if(!this.gameMap.hitTest(px.x, px.y))
					candidates.push({coorx: x, coory: y});
			}
		}
		var toAddWater = _.shuffle(candidates).splice(0,fgj.def.map.numberWaterTilesPerZone);
		for(var i=0; i<toAddWater.length; i++) {
			newMap[toAddWater[i].coory][toAddWater[i].coorx] = fgj.def.res.water;
		}

		var candidates = [];
		for(var y=0; y<height; y++ ) {
			for(var x=Math.floor(width/2); x<width; x++ ) {
				var px = this.gameMap.coor2px(x, y);
				if(!this.gameMap.hitTest(px.x, px.y))
					candidates.push({coorx: x, coory: y});
			}
		}
		var toAddWater = _.shuffle(candidates).splice(0,fgj.def.map.numberWaterTilesPerZone);
		for(var i=0; i<toAddWater.length; i++) {
			newMap[toAddWater[i].coory][toAddWater[i].coorx] = fgj.def.res.water;
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