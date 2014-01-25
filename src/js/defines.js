if(!fgj) var fgj = {};
if(!fgj.def) fgj.def = {};

fgj.def.window = {
	width: 600,
	height: 300
};

fgj.def.res = {
	default: 0,
	water: 1,

	image: {
		map: "./res/map.png",
		finnish : "./res/chara1.png"
	}
};

fgj.def.map = {
	tile: {
		width: 32,
		height: 32
	},
	width: 14,
	height: 8,

	collisions: [fgj.def.res.default]
};

fgj.def.game = {
	waterMaxLevel: 100,
	waterDecrTime : 5,
	waterDecrStep : 10,
	intervalWaterDecr : 1000,
	waterIncrDrink : 50

};


fgj.def.preload = [
	fgj.def.res.image.map,
	fgj.def.res.image.finnish
];