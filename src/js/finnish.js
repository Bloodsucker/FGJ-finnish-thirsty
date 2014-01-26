if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.Finnish = enchant.Class.create(enchant.Sprite, {
	initialize : function(game) {
		enchant.Sprite.call(this, 32, 32);
		var me = this;
		this.image = game.assets[fgj.def.res.image.finnish];
		this.frame = 5;
		this.observer;

		setInterval(function(){
			me.decrWater(fgj.def.game.waterDecrTime);
		}, fgj.def.game.intervalWaterDecr);

		this.waterLevel = fgj.def.game.waterMaxLevel;

		this.game = game;
		this.moving = false;

		me.game.on(Event.DOWN_BUTTON_DOWN, function(e){
			me.downButtonDownCmd();
		});
		me.game.on(Event.LEFT_BUTTON_DOWN, function(e){
			me.leftButtonDownCmd();
		});
		me.game.on(Event.UP_BUTTON_DOWN, function(e){
			me.upButtonDownCmd();
		});
		me.game.on(Event.RIGHT_BUTTON_DOWN, function(e){
			me.rightButtonDownCmd();
		});

	},
	getWaterLevel : function(){
		return this.waterLevel;
	},
	decrWater : function(decr){
		this.waterLevel -= decr;

		this.waterLevel = Math.max(0, this.waterLevel);

		this.notifyObserver();
		this.game.getActualMap().randomizeMap(this.waterLevel);
	},
	incrWater : function(incr) {		
		this.waterLevel += incr;

		this.waterLevel = Math.min(fgj.def.game.waterMaxLevel, this.waterLevel);

		this.notifyObserver();
		this.game.getActualMap().recoverMap(this.waterLevel);
	},
	moveToCoordinate : function(coorx, coory){
		var map = this.game.getActualMap();

		var position = map.coor2px(coorx,coory);

		if(map.checkCoord(coorx, coory) && !map.hitTest(position.x, position.y)) {
			this.coorx = coorx;
			this.coory = coory;

			var me = this;
			this.moving = true;
			this.tl
				.moveTo(position.x, position.y, 10)
				.then(function(){
					me.moving = false;
				});
		}
	},
	setCoordinate : function(coorx, coory){
		var map = this.game.getActualMap();

		this.coorx = coorx;
		this.coory = coory;

		var position = map.coor2px(coorx,coory);

		this.x = position.x;
		this.y = position.y;
	},
	activateEffectTile : function(coorx, coory){

		// Water Effect
		var waterMap = this.game.getWaterMap();
		if(waterMap.isWater(coorx, coory)){
			this.incrWater(fgj.def.game.waterIncrDrink);

			waterMap.consumeWater(coorx, coory);
		}
	},
	downButtonDownCmd : function(){
		if(this.moving) return;

		this.decrWater(fgj.def.game.waterDecrStep);

		var coorx = this.coorx;
		var coory = this.coory+1;

		this.moveToCoordinate(coorx, coory);

		this.activateEffectTile(coorx, coory);
	},
	upButtonDownCmd : function(){
		if(this.moving) return;

		this.decrWater(fgj.def.game.waterDecrStep);

		var coorx = this.coorx;
		var coory = this.coory-1;

		this.moveToCoordinate(coorx, coory);
		this.activateEffectTile(coorx, coory);
	},
	leftButtonDownCmd : function(){
		if(this.moving) return;

		this.decrWater(fgj.def.game.waterDecrStep);

		var coorx = this.coorx-1;
		var coory = this.coory;

		this.moveToCoordinate(coorx, coory);
		this.activateEffectTile(coorx, coory);
	}
	,rightButtonDownCmd : function(){
		if(this.moving) return;

		this.decrWater(fgj.def.game.waterDecrStep);

		var coorx = this.coorx+1;
		var coory = this.coory;

		this.moveToCoordinate(coorx, coory);
		this.activateEffectTile(coorx, coory);
	},
	registerObserver : function(label){
		this.observer = label;
		this.notifyObserver();
	},
	notifyObserver : function(){
		this.observer.updateLabel(this);
	}
});