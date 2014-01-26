if(!fgj) var fgj = {};
if(!fgj.def) fgj.def = {};

fgj.def.window = {
	width: 600,
	height: 300
};

fgj.def.res = {
	wall: 0,
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
	width: 15,
	height: 9,

	collisions: [fgj.def.res.wall],
	crazyness: [fgj.def.res.wall, -1, fgj.def.res.water]
};

fgj.def.game = {
	waterMaxLevel: 100,
	waterDecrTime : 5,
	waterDecrStep : 10,
	intervalWaterDecr : 1000,
	waterIncrDrink : 50,

	randomizerFactor: 0.05,
	recoverFactor: 0.5

};


fgj.def.preload = [
	fgj.def.res.image.map,
	fgj.def.res.image.finnish
];