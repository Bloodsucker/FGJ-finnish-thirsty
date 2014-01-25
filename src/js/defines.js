if(!fgj) var fgj = {};
if(!fgj.def) fgj.def = {};

fgj.def.window = {
	width: 600,
	height: 300
};

fgj.def.map = {
	tile: {
		width: 32,
		height: 32
	},
	width: 30,
	height: 30,
};

fgj.def.res = {
	default: 0,
	collisions: [0],

	image: {
		map: "./res/map.gif"
	}
};

fgj.def.preload = [
	fgj.def.res.image.map
];