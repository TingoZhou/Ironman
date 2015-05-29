var Ironman = Character.extend({
	ctor: function(parent) {
		this._super(parent);

		this.name = SH.Character.Ironman;

		this.init();
		this.addListeners();
	},

	init: function() {
		this._super();
		this._viewObj = cc.Sprite.create("#ship01.png");
		this._parent.addChild(this._viewObj);
	},

	addListeners: function() {
		this._super();
	},

	update: function() {
		this._super();
	}
});