if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.MainGame = enchant.Class.create(enchant.Game, {
	initialize : function(){
		enchant.Game.call(this, fgj.def.window.width, fgj.def.window.height);

		this.mainMapChildNodeIndex = -1;
	},
	getActualMap : function() {
		return this.rootScene.childNodes[this.mainMapChildNodeIndex];
	},
	addMainMap : function(map){
		this.mainMapChildNodeIndex = this.rootScene.childNodes.length;
		this.rootScene.addChild(map);
	}

});