if(!fgj) var fgj = {};
if(!fgj.entities) fgj.entities = {};

fgj.entities.WaterLabel = enchant.Class.create(enchant.Label, {
	initialize : function(){
		enchant.Label.call(this);

		this.text = "Water level : ";
        this.width = 128;
        this.height = 64;
        this.font = "12px 'Arial'";
		
	},
	updateLabel : function(usr){
		this.text = "Water level : " + usr.getWaterLevel();
	}
});