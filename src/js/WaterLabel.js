if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.WaterLabel = function(){
	this.el = $('<span/>', {
		text : 'Water level : ',
		style : 'bottom: 0; position: fixed;'
	});

	this.el.appendTo('body');
};

fgj.entities.WaterLabel.prototype.updateLabel = function(usr){
	this.el.text("Water level : " + usr.getWaterLevel());
};