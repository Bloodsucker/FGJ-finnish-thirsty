if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.Finnish = enchant.Class.create(enchant.Sprite, {
	initialize : function(game) {
		enchant.Sprite.call(this, 32, 32);
		var me = this;
		this.image = game.assets[fgj.def.res.image.finnish];
		this.frame = 5;

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
	moveToPixel : function(x, y){

	},
	setCoordinate : function(coorx, coory){
		var map = this.game.getActualMap();

		this.coorx = coorx;
		this.coory = coory;

		var position = map.coor2px(coorx,coory);

		this.x = position.x;
		this.y = position.y;
	},
	downButtonDownCmd : function(){
		if(this.moving) return;

		var coorx = this.coorx;
		var coory = this.coory+1;

		this.moveToCoordinate(coorx, coory);
	},
	upButtonDownCmd : function(){
		if(this.moving) return;

		var coorx = this.coorx;
		var coory = this.coory-1;

		this.moveToCoordinate(coorx, coory);
	},
	leftButtonDownCmd : function(){
		if(this.moving) return;

		var coorx = this.coorx-1;
		var coory = this.coory;

		this.moveToCoordinate(coorx, coory);
	}
	,rightButtonDownCmd : function(){
		if(this.moving) return;

		var coorx = this.coorx+1;
		var coory = this.coory;

		this.moveToCoordinate(coorx, coory);
	}
});