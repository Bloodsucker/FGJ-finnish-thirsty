if(!fgj) var fgj = {};
if(!fgj.def) fgj.def = {};

fgj.def.window = {
	width: 1000,
	height: 300
};

fgj.def.res = {
	sand : 0,
	wall: 1,
	cactus1 : 2,
	cactus2 : 3,
	water: 4,
	finnish : {
		stand2Right : 0,
		mov2Right: 1,
		stand2Left : 2,
		mov2Left : 3
	},
	image: {
		map: "./res/map.gif",
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

	collisions: [fgj.def.res.wall, fgj.def.res.cactus1, fgj.def.res.cactus2],
	crazyness: [fgj.def.res.wall, fgj.def.res.sand, fgj.def.res.water, fgj.def.res.cactus1, fgj.def.res.cactus2]
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