if(!fgj) var fgj = {};
if(!fgj.def) fgj.def = {};

fgj.def.window = {
	width: 1000,
	height: 300
};

fgj.def.res = {
	wall: 0,
	water: 1,
	finnish : {
		stand2Right : 0,
		mov2Right: 1,
		stand2Left : 2,
		mov2Left : 3
	},
	image: {
		map: "./res/map.png",
		finnish : "./res/finnish.gif"
	}
};

fgj.def.map = {
	tile: {
		width: 32,
		height: 32
	},
	width: 29,
	height: 9,

	numberWaterTilesPerZone: 6,

	collisions: [fgj.def.res.wall],
	crazyness: [fgj.def.res.wall, -1, fgj.def.res.water]
};

fgj.def.game = {
	waterMaxLevel: 100,
	waterDecrTime : 5,
	waterDecrStep : 5,
	intervalWaterDecr : 1000,
	waterIncrDrink : 50,

	randomizerFactor: 0.5,
	recoverFactor: 0.5,

	directions : {
		left : 0,
		right : 1
	}
};


fgj.def.preload = [
	fgj.def.res.image.map,
	fgj.def.res.image.finnish
];