if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.WaterLabel = function(){
	this.el = $('#toolbar .level');
};

fgj.entities.WaterLabel.prototype.updateLabel = function(usr){
	this.el.text(usr.getWaterLevel());
};