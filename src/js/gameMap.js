if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.gameMap = enchant.Class.create(enchant.Map, {
	initialize: function (game) {
		enchant.Map.call(this, fgj.def.map.tile.width, fgj.def.map.tile.height);
		this.image = game.assets[fgj.def.res.image.map];

		this.oMap = this.createRandomMap(fgj.def.map.width-1, fgj.def.map.height-1);
		this.vMap = [];
		for(var y=0; y<this.oMap.length; y++){
			this.vMap[y] = this.oMap[y].slice();
		}
		this.loadData(this.vMap);
		this.collisionData = this.createCollisionData(this.oMap);

		this.listOfTilesToChange = [];

		console.table(this.oMap);
		console.table(this.collisionData);
	},
	createRandomMap: function (width, height) {
		var maze = function(x,y) {
			var n=x*y-1;
			if (n<0) {alert("illegal maze dimensions");return;}
			var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
			    verti =[]; for (var j= 0; j<y+1; j++) verti[j]= [],
			    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
			    path = [here],
			    unvisited = [];
			for (var j = 0; j<x+2; j++) {
				unvisited[j] = [];
				for (var k= 0; k<y+1; k++)
					unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
			}
			while (0<n) {
				var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
				    [here[0]-1, here[1]], [here[0],here[1]-1]];
				var neighbors = [];
				for (var j = 0; j < 4; j++)
					if (unvisited[potential[j][0]+1][potential[j][1]+1])
						neighbors.push(potential[j]);
				if (neighbors.length) {
					n = n-1;
					next= neighbors[Math.floor(Math.random()*neighbors.length)];
					unvisited[next[0]+1][next[1]+1]= false;
					if (next[0] == here[0])
						horiz[next[0]][(next[1]+here[1]-1)/2]= true;
					else 
						verti[(next[0]+here[0]-1)/2][next[1]]= true;
					path.push(here = next);
				} else 
					here = path.pop();
			}
			return {x: x, y: y, horiz: horiz, verti: verti};
		}

		var m = maze(Math.floor(height/2), Math.floor(width/2));
		
		for(var i=0; i<m.x; i++) {
			for(var j=0; j<m.y; j++) {
				if(!m.horiz[i][j])
					m.horiz[i][j] = false;
			}
		}


		for(var i=0; i<m.x; i++) {
			for(var j=0; j<m.y; j++) {
				if(!m.verti[i][j])
					m.verti[i][j] = false;
			}
		}

		function display(m) {
			var text= [];
			for (var j= 0; j<m.x*2+1; j++) {
				var line = [];
				if (0 == j%2)
					for (var k=0; k<m.y*4+1; k++)
						if (0 == k%4) {
							line[k]= '+';
						} else
							if (j>0 && m.verti[j/2-1][Math.floor(k/4)]) {
								line[k] = ' '; //empty
							} else {
								line[k] = 'a'; //wall
							}
				else
					for (var k=0; k<m.y*4+1; k++)
						if (0 == k%4)
							if (k>0 && m.horiz[(j-1)/2][k/4-1]) {
								line[k]= ' '; //empty
							} else {
								line[k]= '|';
							}
						else {
							line[k]= ' ';
						}
				if (0 == j){
					line[1]= line[2]= line[3]= ' ';
				}
				if (m.x*2-1 == j) {
					line[4*m.y]= 'c';
				}
				text.push(line.join('')+'\r\n');
			}
			return text.join('');
		}

		console.log(display(m));

		var hwall = m.verti;
		var vwall = m.horiz;


		var newMap = [];
		newMap[0] = [];
		for(var y=0; y<height; y++){
			newMap[y] = [];
			for(var x=0; x<width; x++) {
				if(y%2==0 && x%2!=0) {
					if(!vwall[y/2][Math.floor(x/2)])
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					else
						newMap[y][x] = fgj.def.res.sand;
				} else if(y%2!=0 && x%2==0) {
					if(!hwall[Math.floor(y/2)][x/2])
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					else
						newMap[y][x] = fgj.def.res.sand;
				} else if(y%2!=0 && x%2!=0) {
					if(!hwall[Math.floor(y/2)][Math.floor(x/2)])
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					else if (!hwall[Math.floor(y/2)][Math.floor(x/2)+1]) {
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					} else if(vwall[Math.floor(y/2)][Math.floor(x/2)]) {
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					} else if(vwall[Math.floor(y/2)+1][Math.floor(x/2)]) {
						newMap[y][x] = fgj.def.map.collisions[Math.floor(Math.random()*fgj.def.map.collisions.length)];
					} else {
						newMap[y][x] = fgj.def.res.sand;
					}
				} else {
					newMap[y][x] = fgj.def.res.sand;
				}
			}
		}

		var first = [];
		for(var x=0; x<width; x++) {
			first[x] = fgj.def.res.wall;
		}
		newMap.splice(0,0, first);
		for(var y=0; y<height+1; y++) {
			newMap[y].splice(0,0,fgj.def.res.wall);
		}

		newMap[1][0] = fgj.def.res.sand;
		newMap[height-1][width] = fgj.def.res.sand;

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

	randomizeMap: function (level) {
		var maxTotalTyles = fgj.def.map.width*fgj.def.map.height*0.05;
		var totalTyles = maxTotalTyles*(1-level/100);
		var numberOfChanges = Math.floor(Math.random()*totalTyles);

		console.log(numberOfChanges);

		for(var i=0; i<numberOfChanges; i++) {
			var coor = {
				x: Math.floor(Math.random()*fgj.def.map.width),
				y: Math.floor(Math.random()*fgj.def.map.height)
			};
			this.listOfTilesToChange[fgj.def.map.width*coor.y + coor.x] = coor;
		}

		var self = this;
		_.each(this.listOfTilesToChange, function (coor) {
			self.randomizeTile(coor.x, coor.y);
		});

		this.loadData(this.vMap);
	},

	randomizeTile: function (x, y) {
		var nextTileType = fgj.def.map.crazyness[Math.floor(Math.random()*fgj.def.map.crazyness.length)];
		this.vMap[y][x] = nextTileType;
	},

	recoverMap: function (level) {
		var maxTotalTyles = fgj.def.map.width*fgj.def.map.height*0.5;
		var totalTyles = maxTotalTyles*(1-level/100);
		var numberOfChanges = Math.floor(Math.random()*totalTyles);

		var toMayRecover = [];
		_.each(this.listOfTilesToChange, function (coor) {
			toMayRecover.push(coor);
		});

		var toMayRecover = _.shuffle(toMayRecover);
		var toRecover = toMayRecover.splice(0, numberOfChanges);

		var self = this;
		_.each(toRecover, function (coor) {
			self.recoverTile(coor.x, coor.y);
			delete self.listOfTilesToChange[fgj.def.map.width*coor.y + coor.x];
		});

		this.loadData(this.vMap);
	},

	recoverTile: function (x, y) {
		this.vMap[y][x] = this.oMap[y][x];
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
	},

	isTheOasis: function (coorx, coory) {
		if(coorx == fgj.def.map.width-1 && coory == fgj.def.map.height-2) {
			return true;
		} else {
			return false;
		}
	}
});