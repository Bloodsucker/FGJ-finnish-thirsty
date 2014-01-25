if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.gameMap = enchant.Class.create(enchant.Map, {
	initialize: function (game) {
		enchant.Map.call(this, fgj.def.map.tile.width, fgj.def.map.tile.height);
		this.image = game.assets[fgj.def.res.image.map];

		this.oMap = this.createRandomMap(fgj.def.map.width, fgj.def.map.height);
		this.vMap = [];
		for(var y=0; y<this.oMap.length; y++){
			this.vMap[y] = this.oMap[y].slice();
		}
		this.loadData(this.vMap);
		this.collisionData = this.createCollisionData(this.oMap);
	},
	createRandomMap: function (width, height) {
		var newMap = [];

		for(var y=0; y<height; y++){
			newMap[y] = [];
			for(var x=0; x<width; x++) {
				newMap[y][x] = -1;
			}
		}

		for(var x=5; x<height-5; x++) {
			newMap[5][x] = fgj.def.res.default;
		}

		return newMap;
	},

	createCollisionData: function (map) {
		var width = map[0].length;
		var height = map.length;
		var collisionMap = [];

		for(var y=0; y<height; y++){
			collisionMap[y] = [];
			for(var x=0; x<width; x++) {
				if(_.contains(fgj.def.map.collisions, map[y][x])) {
					collisionMap[y][x] = 1;
				} else {
					collisionMap[y][x] = 0;
				}
			}
		}
		
		return collisionMap;
	},

	checkCoord: function (coorx, coory) {
		var isCorrect = true;
		switch (true) {
			case coorx < 0:
			case coorx >= fgj.def.map.width:
			case coory < 0:
			case coory >= fgj.def.map.height:
				isCorrect = false;
				break;
			default:
				isCorrect = true;
		}

		return isCorrect;
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